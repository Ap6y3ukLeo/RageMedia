from PIL import Image
import numpy as np
import os

public_dir = r"h:\RageMedia\RageMedia\public\images"
img_path = os.path.join(public_dir, "white_torn_paper.png")

if os.path.exists(img_path):
    img = Image.open(img_path).convert("RGBA")
    data = np.array(img)
    r, g, b, a = data[:, :, 0], data[:, :, 1], data[:, :, 2], data[:, :, 3]
    h, w = r.shape
    
    # Mild threshold
    mask = (r < 200) & (g < 200) & (b < 200) & (a > 200)
    mask[:, :250] = False
    mask[:, 750:] = False
    
    for y in range(500, 685):
        density = np.sum(mask[y, :])
        if density > 5:
            print(f"Row {y}: density={density}")
else:
    print("Image not found")
