from PIL import Image
import os

DEST_DIR = r"h:\RageMedia\RageMedia\public\images"

def convert_green_to_pink():
    src_path = os.path.join(DEST_DIR, "service_paper_lime_hover.png")
    dest_path = os.path.join(DEST_DIR, "service_paper_pink_hover.png")
    
    print(f"Converting {src_path} to pink -> {dest_path}")
    
    if not os.path.exists(src_path):
        print(f"Error: {src_path} does not exist!")
        return
        
    img = Image.open(src_path).convert("RGBA")
    pixels = img.load()
    width, height = img.size
    
    for x in range(width):
        for y in range(height):
            r, g, b, a = pixels[x, y]
            if a > 0:
                # Map green to neon pink
                # Lime green has high green and low red/blue.
                # Neon pink has high red and blue, and very low green.
                # So we map the bright green channel (g) to Red and Blue.
                new_r = g
                new_g = int(r * 0.15) # keep green very low
                new_b = int(g * 0.95) # blue slightly lower than red for warm neon pink
                
                # Make sure values are between 0 and 255
                new_r = min(255, max(0, new_r))
                new_g = min(255, max(0, new_g))
                new_b = min(255, max(0, new_b))
                
                pixels[x, y] = (new_r, new_g, new_b, a)
                
    img.save(dest_path, "PNG")
    print(f"Successfully converted and saved to {dest_path}. Size: {img.size}")

if __name__ == "__main__":
    convert_green_to_pink()
