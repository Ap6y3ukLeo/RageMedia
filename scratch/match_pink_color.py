from PIL import Image
import numpy as np
import os

def recolor_image(img_path):
    if not os.path.exists(img_path):
        print(f"File {img_path} does not exist!")
        return

    img = Image.open(img_path).convert("RGBA")
    data = np.array(img, dtype=np.float32)
    
    r, g, b, a = data[:, :, 0], data[:, :, 1], data[:, :, 2], data[:, :, 3]
    
    # Identify pink pixels: R is significantly greater than G (e.g. R - G > 40)
    # White folded corner pixels will have R - G <= 40 (since R, G, B are similar in white/gray)
    is_pink = (r - g > 45) & (a > 50)
    
    # Scale factors to match case paper pink average (210, 54.8, 115) from stats paper average (237.4, 94.9, 164.4)
    r_factor = 210.0 / 237.4
    g_factor = 54.8 / 94.9
    b_factor = 115.0 / 164.4
    
    # Apply scaling to pink pixels
    data[is_pink, 0] *= r_factor
    data[is_pink, 1] *= g_factor
    data[is_pink, 2] *= b_factor
    
    # Clip values to [0, 255]
    data = np.clip(data, 0, 255).astype(np.uint8)
    
    # Save back
    new_img = Image.fromarray(data)
    new_img.save(img_path, "PNG")
    print(f"Successfully recolored: {img_path}")

# Process both stats card pink papers
recolor_image(r"h:\RageMedia\RageMedia\public\images\pink_torn_paper.png")
recolor_image(r"h:\RageMedia\RageMedia\public\images\pink_torn_paper_hover.png")

# Also update the copy in the artifacts directory
artifacts_output = r"C:\Users\A6Leo\.gemini\antigravity-ide\brain\2befbe8f-a854-478e-85f3-b4fcaabc7b17\pink_torn_paper_processed.png"
if os.path.exists(r"h:\RageMedia\RageMedia\public\images\pink_torn_paper.png"):
    img = Image.open(r"h:\RageMedia\RageMedia\public\images\pink_torn_paper.png")
    img.save(artifacts_output, "PNG")
    print(f"Updated copy in artifacts: {artifacts_output}")
