import os
import sys
import subprocess
from PIL import Image
import numpy as np

public_dir = r"h:\RageMedia\RageMedia\public\images"
src_path = os.path.join(public_dir, "New white card.png")
dest_path = os.path.join(public_dir, "white_torn_paper.png")

if not os.path.exists(src_path):
    print(f"Error: {src_path} does not exist!")
    sys.exit(1)

print(f"Processing uploaded New white card.png...")
img = Image.open(src_path).convert("RGBA")
width, height = img.size

data = np.array(img, dtype=np.float32)
r, g, b, a = data[:, :, 0], data[:, :, 1], data[:, :, 2], data[:, :, 3]

# Calculate brightness
brightness = np.maximum(np.maximum(r, g), b)

# Background threshold
threshold = 30.0

# Identify non-black pixels
y_indices, x_indices = np.where(brightness > threshold)
if len(x_indices) == 0:
    print("Error: No non-black pixels found!")
    sys.exit(1)

min_x, max_x = x_indices.min(), x_indices.max()
min_y, max_y = y_indices.min(), y_indices.max()
print(f"Detected card bounding box: x=[{min_x}, {max_x}], y=[{min_y}, {max_y}]")

# Clean the background: set all pixels below threshold to transparent
is_bg = brightness <= threshold
data[is_bg] = [0, 0, 0, 0]

# Soft anti-aliasing transition at boundaries
is_edge = (brightness > threshold) & (brightness < threshold + 15)
for y in range(height):
    for x in range(width):
        if is_edge[y, x]:
            val = brightness[y, x]
            alpha_scale = (val - threshold) / 15.0
            data[y, x, 3] = int(data[y, x, 3] * np.clip(alpha_scale, 0, 1))

cleaned_img = Image.fromarray(data.astype(np.uint8))

# Crop to the detected bounding box
cropped = cleaned_img.crop((min_x, min_y, max_x + 1, max_y + 1))

# Add a tiny 3px padding
cw, ch = cropped.size
padded = Image.new("RGBA", (cw + 6, ch + 6), (0, 0, 0, 0))
padded.paste(cropped, (3, 3))

padded.save(dest_path, "PNG")
print(f"Saved cleaned and cropped card to: {dest_path} (size={padded.size})")

# Run hover state generation
print("Running hover state generation script...")
subprocess.run(["python", "scratch/crumple_local.py"])
print("Hover state updated successfully!")
