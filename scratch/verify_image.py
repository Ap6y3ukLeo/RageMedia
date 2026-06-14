from PIL import Image
import numpy as np

img = Image.open(r"h:\RageMedia\RageMedia\public\images\hero_megaphone_no_rage.png")
data = np.array(img)

# Print alpha values at various locations
width, height = img.size
print(f"Size: {img.size}")
print(f"Top-left alpha: {data[0, 0, 3]}")
print(f"Top-right alpha: {data[0, -1, 3]}")
print(f"Bottom-left alpha: {data[-1, 0, 3]}")
print(f"Bottom-right alpha: {data[-1, -1, 3]}")

# Count transparent vs opaque pixels
alphas = data[:, :, 3]
transparent_count = np.sum(alphas == 0)
opaque_count = np.sum(alphas == 255)
semi_count = np.sum((alphas > 0) & (alphas < 255))
total = width * height

print(f"Transparent pixels: {transparent_count} ({transparent_count/total:.1%})")
print(f"Opaque pixels: {opaque_count} ({opaque_count/total:.1%})")
print(f"Semi-transparent pixels: {semi_count} ({semi_count/total:.1%})")

# Check center pixel (which should be the megaphone, thus opaque)
print(f"Center pixel: {data[height//2, width//2]}")
