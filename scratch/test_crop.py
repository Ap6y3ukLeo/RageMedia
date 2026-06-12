from PIL import Image
import os

SOURCE_DIR = r"C:\Users\A6Leo\.gemini\antigravity-ide\brain\2befbe8f-a854-478e-85f3-b4fcaabc7b17"

def find_latest_file(prefix):
    files = [f for f in os.listdir(SOURCE_DIR) if f.startswith(prefix) and f.endswith(".png")]
    files.sort()
    return os.path.join(SOURCE_DIR, files[-1])

def test_crop(prefix, threshold=130):
    src_path = find_latest_file(prefix)
    img = Image.open(src_path).convert("RGBA")
    pixels = img.load()
    width, height = img.size
    
    for x in range(width):
        for y in range(height):
            r, g, b, a = pixels[x, y]
            if max(r, g, b) < threshold:
                pixels[x, y] = (0, 0, 0, 0)
                
    bbox = img.getbbox()
    if bbox:
        cropped_img = img.crop(bbox)
        w, h = cropped_img.size
        print(f"File: {os.path.basename(src_path)}")
        print(f"Cropped size: {w}x{h} (aspect ratio = {w/h:.2f})")
    else:
        print("Failed to crop")

if __name__ == "__main__":
    test_crop("service_strip_lime")
