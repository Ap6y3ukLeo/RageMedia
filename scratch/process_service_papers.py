import os
from PIL import Image

SOURCE_DIR = r"C:\Users\A6Leo\.gemini\antigravity-ide\brain\2befbe8f-a854-478e-85f3-b4fcaabc7b17"
DEST_DIR = r"h:\RageMedia\RageMedia\public\images"

def find_latest_file(prefix):
    files = [f for f in os.listdir(SOURCE_DIR) if f.startswith(prefix) and f.endswith(".png")]
    if not files:
        raise FileNotFoundError(f"No files starting with {prefix} found in {SOURCE_DIR}")
    files.sort()
    return os.path.join(SOURCE_DIR, files[-1])

def process_image(src_path, dest_name, threshold=130):
    dest_path = os.path.join(DEST_DIR, dest_name)
    print(f"\nProcessing {src_path} -> {dest_path}")
    
    img = Image.open(src_path).convert("RGBA")
    pixels = img.load()
    width, height = img.size
    
    # 1. Make any dark/black background pixels transparent
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
                    
    # 2. Crop transparent borders using getbbox
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
    prefixes = [
        ("service_paper_lime_hover", "service_paper_lime_hover.png"),
        # Need to match lime hover first to avoid prefix overlap with "service_paper_lime"
        ("service_paper_lime", "service_paper_lime.png"),
        ("service_paper_pink_hover", "service_paper_pink_hover.png"),
        ("service_paper_pink", "service_paper_pink.png"),
        ("service_paper_white_hover", "service_paper_white_hover.png"),
        ("service_paper_white", "service_paper_white.png"),
    ]
    
    for prefix, dest_name in prefixes:
        # Resolve files correctly ensuring we don't mix up prefix matching
        # "service_paper_lime_hover" vs "service_paper_lime"
        files = [f for f in os.listdir(SOURCE_DIR) if f.startswith(prefix) and f.endswith(".png")]
        if prefix.endswith("_hover"):
            # exact match for hover
            files = [f for f in files if "hover" in f]
        else:
            # exact match for normal, exclude hover
            files = [f for f in files if "hover" not in f]
            
        if not files:
            print(f"Error: No files for {prefix}")
            continue
            
        files.sort()
        src_path = os.path.join(SOURCE_DIR, files[-1])
        process_image(src_path, dest_name, threshold=130)
