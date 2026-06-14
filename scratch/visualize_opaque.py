from PIL import Image
import numpy as np
import os

img_path = r"h:\RageMedia\RageMedia\public\images\hero_megaphone_no_rage.png"
img = Image.open(img_path).convert("RGBA")
data = np.array(img)
width, height = img.size

# Let's crop x in [1800, width], y in [1000, height]
crop_x1, crop_y1 = 1800, 1000
crop_x2, crop_y2 = width, height

# Create a mask image
mask_data = np.zeros((crop_y2 - crop_y1, crop_x2 - crop_x1, 3), dtype=np.uint8)

for y in range(crop_y1, crop_y2):
    for x in range(crop_x1, crop_x2):
        r, g, b, a = data[y, x]
        if a > 0:
            # We can draw the actual colors instead of just white, so we see what it is!
            mask_data[y - crop_y1, x - crop_x1] = [r, g, b]
        else:
            # Black background for transparent pixels
            mask_data[y - crop_y1, x - crop_x1] = [0, 0, 0]

mask_img = Image.fromarray(mask_data)
artifacts_dir = r"C:\Users\A6Leo\.gemini\antigravity-ide\brain\2befbe8f-a854-478e-85f3-b4fcaabc7b17"
mask_img.save(os.path.join(artifacts_dir, "bottom_right_colors.png"))
print("Saved bottom_right_colors.png")
