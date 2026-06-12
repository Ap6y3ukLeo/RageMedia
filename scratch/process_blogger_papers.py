import os
import shutil
from PIL import Image

# Absolute source path in the brain directory
SOURCE_DIR = r"C:\Users\A6Leo\.gemini\antigravity-ide\brain\2befbe8f-a854-478e-85f3-b4fcaabc7b17"
DEST_DIR = r"h:\RageMedia\RageMedia\public\images"

def find_latest_file(prefix):
    files = [f for f in os.listdir(SOURCE_DIR) if f.startswith(prefix) and f.endswith(".png")]
    if not files:
        raise FileNotFoundError(f"No files starting with {prefix} found in {SOURCE_DIR}")
    # Sort by name/timestamp (since timestamp is part of the name, this works perfectly)
    files.sort()
    return os.path.join(SOURCE_DIR, files[-1])

def process_image(src_path, dest_name, threshold=120):
    dest_path = os.path.join(DEST_DIR, dest_name)
    print(f"\nProcessing {src_path} -> {dest_path}")
    
    # Open and convert to RGBA
    img = Image.open(src_path).convert("RGBA")
    pixels = img.load()
    width, height = img.size
    
    # 1. Make any dark/black pixels transparent
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
                    
    # 2. Crop transparent borders
    bbox = img.getbbox()
    if bbox:
        cropped_img = img.crop(bbox)
        # Add a tiny 2px padding
        w, h = cropped_img.size
        padded_img = Image.new("RGBA", (w + 4, h + 4), (0, 0, 0, 0))
        padded_img.paste(cropped_img, (2, 2))
        padded_img.save(dest_path, "PNG")
        print(f"Successfully processed. Size: {padded_img.size}")
    else:
        print(f"Error: No non-transparent pixels found in {src_path}!")

if __name__ == "__main__":
    try:
        # Find latest files in brain directory
        lime_src = find_latest_file("blogger_paper_lime")
        pink_src = find_latest_file("blogger_paper_pink")
        white_src = find_latest_file("blogger_paper_white")
        
        # Process and save
        process_image(lime_src, "blogger_paper_lime.png", threshold=130)
        process_image(pink_src, "blogger_paper_pink.png", threshold=130)
        process_image(white_src, "blogger_paper_white.png", threshold=130)
        
    except Exception as e:
        print(f"Error processing files: {e}")
