from PIL import Image
import os

DEST_DIR = r"h:\RageMedia\RageMedia\public\images"

def match_pink_color():
    normal_path = os.path.join(DEST_DIR, "service_paper_pink.png")
    hover_src_path = os.path.join(DEST_DIR, "service_paper_lime_hover.png")
    dest_path = os.path.join(DEST_DIR, "service_paper_pink_hover.png")
    
    if not os.path.exists(normal_path) or not os.path.exists(hover_src_path):
        print("Error: Missing normal or hover source path!")
        return
        
    # 1. Analyze the average color of the normal pink paper
    normal_img = Image.open(normal_path).convert("RGBA")
    normal_pixels = normal_img.load()
    
    # We sample pixels that are clearly pink (high r, low g)
    sum_r = 0
    sum_g = 0
    sum_b = 0
    count = 0
    
    for x in range(0, normal_img.width, 2):
        for y in range(0, normal_img.height, 2):
            r, g, b, a = normal_pixels[x, y]
            if a > 100 and r > 100:
                sum_r += r
                sum_g += g
                sum_b += b
                count += 1
                
    if count == 0:
        print("Failed to sample pink pixels from normal paper.")
        return
        
    avg_r = sum_r / count
    avg_g = sum_g / count
    avg_b = sum_b / count
    print(f"Normal pink paper average RGB: ({avg_r:.1f}, {avg_g:.1f}, {avg_b:.1f})")
    
    # We want to match this ratio.
    # In neon pink (RAGE MEDIA pink is around RGB: 236, 32, 133 or similar)
    # Let's calculate the ratio of B/R and G/R
    ratio_b = avg_b / avg_r
    ratio_g = avg_g / avg_r
    print(f"Ratios relative to Red: G/R = {ratio_g:.3f}, B/R = {ratio_b:.3f}")
    
    # 2. Convert green hover card to match this normal pink color
    hover_src_img = Image.open(hover_src_path).convert("RGBA")
    hover_pixels = hover_src_img.load()
    width, height = hover_src_img.size
    
    for x in range(width):
        for y in range(height):
            r, g, b, a = hover_pixels[x, y]
            if a > 0:
                # Use the green channel (g) as the base brightness for the paper
                # Set Red to be proportional to g
                new_r = g
                # Set Green and Blue according to the ratios we found
                new_g = int(new_r * ratio_g)
                new_b = int(new_r * ratio_b)
                
                # Boost saturation slightly or clamp
                new_r = min(255, max(0, new_r))
                new_g = min(255, max(0, new_g))
                new_b = min(255, max(0, new_b))
                
                hover_pixels[x, y] = (new_r, new_g, new_b, a)
                
    hover_src_img.save(dest_path, "PNG")
    print(f"Successfully converted green hover card to matched pink and saved to {dest_path}")

if __name__ == "__main__":
    match_pink_color()
