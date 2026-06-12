import os
import numpy as np
from PIL import Image, ImageChops

def remove_white_background_floodfill(img_path, output_path, tolerance=30):
    print(f"Removing white background from {img_path} using floodfill...")
    if not os.path.exists(img_path):
        print("File not found!")
        return
        
    img = Image.open(img_path).convert("RGBA")
    W, H = img.size
    
    # We want to find the background. We can use a floodfill mask from the corners.
    # We will convert to numpy for operations
    data = np.array(img)
    R, G, B, A = data[:,:,0], data[:,:,1], data[:,:,2], data[:,:,3]
    
    # Create a mask of white-ish pixels
    # white-ish is defined by R, G, B all being close to 255
    white_mask = (R > (255 - tolerance)) & (G > (255 - tolerance)) & (B > (255 - tolerance))
    
    # We use flood fill from the corners to identify which white-ish pixels are background
    # We'll use PIL's ImageDraw floodfill or a simple queue-based flood fill in Python
    flood_mask = Image.new("L", (W, H), 0)
    pixels = flood_mask.load()
    
    # Helper to check if a pixel is white-ish
    # We load the RGB image to check colors
    rgb_pixels = img.load()
    
    # Queue for BFS flood fill
    queue = []
    visited = set()
    
    # Start flood fill from the 4 corners and along the borders
    borders = []
    for x in range(W):
        borders.append((x, 0))
        borders.append((x, H - 1))
    for y in range(H):
        borders.append((0, y))
        borders.append((W - 1, y))
        
    for pt in borders:
        r, g, b, a = rgb_pixels[pt[0], pt[1]]
        # If border pixel is white-ish, it's background
        if r > (255 - tolerance) and g > (255 - tolerance) and b > (255 - tolerance):
            queue.append(pt)
            visited.add(pt)
            pixels[pt[0], pt[1]] = 255
            
    print(f"Starting floodfill with {len(queue)} seed points...")
    
    # BFS
    while queue:
        cx, cy = queue.pop(0)
        
        # Check 4 neighbors
        for dx, dy in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
            nx, ny = cx + dx, cy + dy
            if 0 <= nx < W and 0 <= ny < H:
                if (nx, ny) not in visited:
                    r, g, b, a = rgb_pixels[nx, ny]
                    # If neighbor is white-ish, add to background
                    if r > (255 - tolerance) and g > (255 - tolerance) and b > (255 - tolerance):
                        visited.add((nx, ny))
                        pixels[nx, ny] = 255
                        queue.append((nx, ny))
                        
    # Now we have a flood_mask where 255 represents background white pixels
    # Let's apply this mask to set background pixels to fully transparent (A=0)
    bg_mask_np = np.array(flood_mask) == 255
    data[bg_mask_np, 3] = 0
    
    # Optional: Anti-alias/smooth the transition edges a bit
    # We can blur the alpha channel near the borders, but let's keep it simple and clean
    
    out_img = Image.fromarray(data)
    out_img.save(output_path, "PNG")
    print(f"Successfully saved transparent image to: {output_path}")

if __name__ == "__main__":
    src = r"h:\RageMedia\RageMedia\public\images\hero_artwork_enhanced.png"
    dst = r"h:\RageMedia\RageMedia\public\images\hero_artwork_enhanced.png"
    remove_white_background_floodfill(src, dst, tolerance=40)
