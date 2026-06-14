from PIL import Image
import numpy as np

img_path = r"C:\Users\A6Leo\Downloads\Gemini_Generated_Image_etwphketwphketwp.png"
img = Image.open(img_path)
print(f"Format: {img.format}, Size: {img.size}, Mode: {img.mode}")

# Convert to numpy array to inspect corners/edges
data = np.array(img)
corners = [
    data[0, 0],          # top-left
    data[0, -1],         # top-right
    data[-1, 0],         # bottom-left
    data[-1, -1]         # bottom-right
]
print("Corners (RGB/RGBA):")
for i, c in enumerate(corners):
    print(f"Corner {i}: {c}")

# Let's inspect some of the edge pixels
print("Top edge center pixel:", data[0, img.size[0]//2])
print("Left edge center pixel:", data[img.size[1]//2, 0])
