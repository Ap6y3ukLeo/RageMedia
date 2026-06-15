import os
import sys
import subprocess
from PIL import Image
import numpy as np

artifacts_dir = r"C:\Users\A6Leo\.gemini\antigravity-ide\brain\2befbe8f-a854-478e-85f3-b4fcaabc7b17"
public_dir = r"h:\RageMedia\RageMedia\public\images"
src_filename = "white_card_large_text_gemini_1781536190061.png"
dest_filename = "white_torn_paper.png"

src_path = os.path.join(artifacts_dir, src_filename)
dest_path = os.path.join(public_dir, dest_filename)

if not os.path.exists(src_path):
    print(f"Error: {src_path} does not exist!")
    sys.exit(1)

print("Starting background extraction for the new white card...")
img = Image.open(src_path).convert("RGBA")
width, height = img.size

data = np.array(img, dtype=np.float32)
r, g, b, a = data[:, :, 0], data[:, :, 1], data[:, :, 2], data[:, :, 3]

# The wall background is dark and saturated (graffiti).
# The paper is light/off-white.
# Let's write a formula to detect the paper.
# Paper pixels generally have R > 130, G > 130, B > 130.
# We also detect the tape on the corners which can be a bit darker/translucent.
# Let's define the paper mask:
paper_mask = (r > 130) & (g > 130) & (b > 130)

# We want to preserve the tape. The tape on the corners (top-left, bottom-right)
# is at x < 250 & y < 250, and x > 750 & y > 750.
# Let's keep those regions if brightness is above 75.
tape_mask = ((r > 75) & (g > 75) & (b > 75)) & (
    ((data[:, :, 0] > 0) & (np.arange(width)[np.newaxis, :] < 280) & (np.arange(height)[:, np.newaxis] < 280)) |
    ((data[:, :, 0] > 0) & (np.arange(width)[np.newaxis, :] > 740) & (np.arange(height)[:, np.newaxis] > 740))
)

keep_mask = paper_mask | tape_mask

# Set non-keep pixels to transparent
for c in range(4):
    data[~keep_mask, c] = 0

# For the kept pixels, ensure alpha is 255 (or preserve original alpha)
data[keep_mask, 3] = 255

cleaned_img = Image.fromarray(data.astype(np.uint8))

# Find the bounding box of the kept pixels to crop tightly
y_indices, x_indices = np.where(keep_mask)
if len(x_indices) == 0:
    print("Error: No paper pixels detected!")
    sys.exit(1)

min_x, max_x = x_indices.min(), x_indices.max()
min_y, max_y = y_indices.min(), y_indices.max()
print(f"Crop bounding box: x=[{min_x}, {max_x}], y=[{min_y}, {max_y}]")

cropped = cleaned_img.crop((min_x, min_y, max_x + 1, max_y + 1))

# Add a small 4px padding
cw, ch = cropped.size
padded = Image.new("RGBA", (cw + 8, ch + 8), (0, 0, 0, 0))
padded.paste(cropped, (4, 4))

padded.save(dest_path, "PNG")
print(f"Cleaned card saved to: {dest_path} (size={padded.size})")

# Run hover state generation
print("Generating hover state...")
subprocess.run(["python", "scratch/crumple_local.py"])
print("Done!")
