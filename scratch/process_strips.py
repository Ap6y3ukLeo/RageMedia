import os
from PIL import Image

SOURCE_DIR = r"C:\Users\A6Leo\.gemini\antigravity-ide\brain\2befbe8f-a854-478e-85f3-b4fcaabc7b17"
DEST_DIR = r"h:\RageMedia\RageMedia\public\images"

def find_latest_file(prefix):
    files = [f for f in os.listdir(SOURCE_DIR) if f.startswith(prefix) and f.endswith(".png")]
    # filter out "hover" if we are matching normal
    if prefix.endswith("_hover"):
        files = [f for f in files if "hover" in f]
    else:
        files = [f for f in files if "hover" not in f]
    if not files:
        raise FileNotFoundError(f"No files starting with {prefix} found in {SOURCE_DIR}")
    files.sort()
    return os.path.join(SOURCE_DIR, files[-1])

def process_and_crop(src_path, dest_name, threshold=130):
    dest_path = os.path.join(DEST_DIR, dest_name)
    print(f"\nProcessing {src_path} -> {dest_path}")
    
    img = Image.open(src_path).convert("RGBA")
    pixels = img.load()
    width, height = img.size
    
    # 1. Background removal
    for x in range(width):
        for y in range(height):
            r, g, b, a = pixels[x, y]
            if max(r, g, b) < threshold:
                pixels[x, y] = (0, 0, 0, 0)
            else:
                brightness = max(r, g, b)
                if brightness < threshold + 20:
                    alpha = int(((brightness - threshold) / 20.0) * a)
                    pixels[x, y] = (r, g, b, alpha)
                    
    # 2. Crop transparent margins
    bbox = img.getbbox()
    if bbox:
        cropped_img = img.crop(bbox)
        w, h = cropped_img.size
        padded_img = Image.new("RGBA", (w + 4, h + 4), (0, 0, 0, 0))
        padded_img.paste(cropped_img, (2, 2))
        padded_img.save(dest_path, "PNG")
        print(f"Successfully processed. Size: {padded_img.size}")
        return dest_path
    else:
        print(f"Error: No non-transparent pixels found in {src_path}!")
        return None

def generate_white_hover_from_lime_hover(lime_hover_path, dest_name):
    dest_path = os.path.join(DEST_DIR, dest_name)
    print(f"\nGenerating white hover from {lime_hover_path} -> {dest_path}")
    
    img = Image.open(lime_hover_path).convert("RGBA")
    pixels = img.load()
    width, height = img.size
    
    for x in range(width):
        for y in range(height):
            r, g, b, a = pixels[x, y]
            if a > 0:
                # Convert to grayscale
                gray = int(0.299 * r + 0.587 * g + 0.114 * b)
                # Boost brightness to match white paper (since green channels are high but red/blue are low,
                # the gray average is around 170. We scale it up by 1.3 to get to ~220-230 range)
                gray = int(gray * 1.32)
                if gray > 255:
                    gray = 255
                # Make it look slightly textured warm-white (R slightly higher than B)
                pixels[x, y] = (gray, gray, gray, a)
                
    img.save(dest_path, "PNG")
    print(f"Successfully generated white hover image. Size: {img.size}")

if __name__ == "__main__":
    try:
        # 1. Find the generated files
        lime_normal_src = find_latest_file("service_strip_lime")
        lime_hover_src = find_latest_file("service_strip_lime_hover")
        pink_normal_src = find_latest_file("service_strip_pink")
        pink_hover_src = find_latest_file("service_strip_pink_hover")
        white_normal_src = find_latest_file("service_strip_white")
        
        # 2. Process them
        lime_normal_dest = process_and_crop(lime_normal_src, "service_paper_lime.png", threshold=130)
        lime_hover_dest = process_and_crop(lime_hover_src, "service_paper_lime_hover.png", threshold=130)
        pink_normal_dest = process_and_crop(pink_normal_src, "service_paper_pink.png", threshold=130)
        pink_hover_dest = process_and_crop(pink_hover_src, "service_paper_pink_hover.png", threshold=130)
        white_normal_dest = process_and_crop(white_normal_src, "service_paper_white.png", threshold=130)
        
        # 3. Create white hover from the cropped lime hover
        if lime_hover_dest:
            generate_white_hover_from_lime_hover(lime_hover_dest, "service_paper_white_hover.png")
            
    except Exception as e:
        print(f"Error: {e}")
