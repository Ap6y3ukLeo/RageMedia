import os
import numpy as np
from PIL import Image

def process_tv_image():
    src_path = r"h:\RageMedia\RageMedia\public\images\tv_photoroom_new.png"
    if not os.path.exists(src_path):
        print(f"File not found: {src_path}")
        return
        
    img = Image.open(src_path).convert("RGBA")
    W, H = img.size
    data = np.array(img)
    
    # Extract channels
    R, G, B, A = data[:,:,0], data[:,:,1], data[:,:,2], data[:,:,3]
    
    # Identify the green graffiti pixels
    # The green is neon lime, meaning G is high, R is moderate, B is low.
    # Let's test a color mask:
    # G > 80 and G > R * 1.15 and B < 120
    green_mask = (G > 70) & (G > R * 1.1) & (B < 110) & (A > 50)
    
    # Let's clean up the mask (remove single noise pixels using a simple morphology or check)
    # Create the RAGE text image (only the green pixels, transparent elsewhere)
    rage_text_data = np.zeros_like(data)
    rage_text_data[green_mask] = data[green_mask]
    
    # Smooth the edges of the extracted text a bit by setting a soft alpha transition
    # For now, let's keep it simple.
    
    # Create the casing image (replace green pixels with screen background color)
    # The screen background color is dark gray. Let's find the average color of pixels near the screen
    # that are not green. Let's assume a default screen dark gray: (18, 20, 18, 255)
    casing_data = data.copy()
    screen_bg = [20, 22, 20, 255]
    casing_data[green_mask] = screen_bg
    
    # Save the files
    public_dir = r"h:\RageMedia\RageMedia\public\images"
    text_path = os.path.join(public_dir, "tv_rage_text.png")
    casing_path = os.path.join(public_dir, "tv_casing_only.png")
    
    Image.fromarray(rage_text_data).save(text_path, "PNG")
    Image.fromarray(casing_data).save(casing_path, "PNG")
    
    print(f"Successfully split TV image!")
    print(f"Extracted green text: {text_path}")
    print(f"Casing without text: {casing_path}")
    
    # Print count of matching pixels to verify the mask was effective
    print(f"Number of green pixels extracted: {np.sum(green_mask)}")

if __name__ == "__main__":
    process_tv_image()
