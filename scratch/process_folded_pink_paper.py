from PIL import Image
import numpy as np
import os
import sys

# Locate the generated image in the brain artifacts folder
brain_dir = r"C:\Users\A6Leo\.gemini\antigravity-ide\brain\2befbe8f-a854-478e-85f3-b4fcaabc7b17"
files = [f for f in os.listdir(brain_dir) if f.startswith("pink_torn_paper_folded") and f.endswith(".png")]
if not files:
    print("Error: Generated pink paper image not found in brain directory!")
    sys.exit(1)

# Sort to get the latest file
files.sort()
src_path = os.path.join(brain_dir, files[-1])
print(f"Loading generated image from: {src_path}")

img = Image.open(src_path).convert("RGBA")
width, height = img.size
print(f"Original image size: {width}x{height}")

data = np.array(img)
r, g, b, a = data[:, :, 0], data[:, :, 1], data[:, :, 2], data[:, :, 3]

# Calculate brightness map (max of R, G, B)
brightness = np.maximum(np.maximum(r, g), b)

# The paper itself (including pink surface and white folded corner) is bright (brightness > 80)
# Find coordinates of all bright pixels
bright_y, bright_x = np.where(brightness > 80)

if len(bright_x) == 0:
    print("Error: No bright paper pixels detected in the image!")
    sys.exit(1)

min_x, max_x = bright_x.min(), bright_x.max()
min_y, max_y = bright_y.min(), bright_y.max()
print(f"Detected paper bounding box: x=[{min_x}, {max_x}], y=[{min_y}, {max_y}] (size={(max_x - min_x + 1)}x{(max_y - min_y + 1)})")

# Create a clean canvas with transparent background
clean_data = np.zeros((height, width, 4), dtype=np.uint8)

# Process only pixels inside the bounding box, others remain (0,0,0,0)
for y in range(min_y, max_y + 1):
    for x in range(min_x, max_x + 1):
        pixel_brightness = brightness[y, x]
        if pixel_brightness < 45:
            # Black background inside bbox
            clean_data[y, x] = [0, 0, 0, 0]
        elif pixel_brightness < 75:
            # Soft fade for edge anti-aliasing
            alpha = int(((pixel_brightness - 45) / 30.0) * 255)
            # Retain original colors but set adjusted alpha
            clean_data[y, x] = [data[y, x, 0], data[y, x, 1], data[y, x, 2], alpha]
        else:
            # Fully opaque paper
            clean_data[y, x] = [data[y, x, 0], data[y, x, 1], data[y, x, 2], 255]

# Convert to PIL Image and crop precisely to the detected bounding box
clean_img = Image.fromarray(clean_data)
cropped_img = clean_img.crop((min_x, min_y, max_x + 1, max_y + 1))

# Add a tiny 2px padding for clean rendering
w, h = cropped_img.size
final_img = Image.new("RGBA", (w + 4, h + 4), (0, 0, 0, 0))
final_img.paste(cropped_img, (2, 2))

# Save the final base image
dest_path = r"h:\RageMedia\RageMedia\public\images\pink_torn_paper.png"
final_img.save(dest_path, "PNG")
print(f"Saved processed base paper to: {dest_path} (size={final_img.size})")

# Also save to artifacts for reference
artifacts_output = os.path.join(brain_dir, "pink_torn_paper_processed.png")
final_img.save(artifacts_output, "PNG")
print(f"Saved copy to artifacts: {artifacts_output}")
