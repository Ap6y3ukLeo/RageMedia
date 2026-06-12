import os
from PIL import Image

DEST_DIR = r"h:\RageMedia\RageMedia\public\images"
TARGET_PINK = (239, 48, 140)  # RGB of normal pink paper

def gradient_map(v, target_color):
    tr, tg, tb = target_color
    scale = v / 255.0
    r = int(tr * scale)
    g = int(tg * scale)
    b = int(tb * scale)
    return r, g, b

def fix_pink_hover():
    src_path = os.path.join(DEST_DIR, "service_paper_lime_hover.png")
    dest_path = os.path.join(DEST_DIR, "service_paper_pink_hover.png")
    
    if not os.path.exists(src_path):
        print(f"Error: {src_path} not found!")
        return
        
    img = Image.open(src_path).convert("RGBA")
    # Get grayscale channel
    gray_img = img.convert("L")
    
    width, height = img.size
    result_img = Image.new("RGBA", (width, height))
    
    img_pixels = img.load()
    gray_pixels = gray_img.load()
    res_pixels = result_img.load()
    
    for x in range(width):
        for y in range(height):
            r, g, b, a = img_pixels[x, y]
            if a == 0:
                res_pixels[x, y] = (0, 0, 0, 0)
            else:
                v = gray_pixels[x, y]
                # Apply gradient map
                nr, ng, nb = gradient_map(v, TARGET_PINK)
                # Keep alpha channel
                res_pixels[x, y] = (nr, ng, nb, a)
                
    result_img.save(dest_path, "PNG")
    print(f"Successfully generated {dest_path} using gradient mapping.")

if __name__ == "__main__":
    fix_pink_hover()
