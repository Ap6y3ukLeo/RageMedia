from PIL import Image
import numpy as np
import os
import sys

# Locate the generated image in the brain artifacts folder
brain_dir = r"C:\Users\A6Leo\.gemini\antigravity-ide\brain\2befbe8f-a854-478e-85f3-b4fcaabc7b17"
files = [f for f in os.listdir(brain_dir) if f.startswith("pink_torn_paper_wide") and f.endswith(".png")]
if not files:
    print("Error: Generated pink paper image not found in brain directory!")
    sys.exit(1)

# Sort to get the latest file
files.sort()
src_path = os.path.join(brain_dir, files[-1])
print(f"Loading generated image from: {src_path}")

img = Image.open(src_path).convert("RGBA")
width, height = img.size
print(f"Generated image dimensions: {width}x{height}")

# Convert to numpy array for fast manipulation
data = np.array(img)

# We will remove the black background.
# A pixel is considered background if R, G, B are all very low (e.g., < 40).
# Let's count background pixels
r, g, b, a = data[:, :, 0], data[:, :, 1], data[:, :, 2], data[:, :, 3]
is_bg = (r < 40) & (g < 40) & (b < 40)

# Set background pixels to transparent
data[is_bg] = [0, 0, 0, 0]

# Let's also do a soft transition/anti-aliasing for pixels slightly brighter than background
# but not fully part of the bright paper
is_border = (r < 60) & (g < 60) & (b < 60) & (~is_bg)
for y in range(height):
    for x in range(width):
        if is_border[y, x]:
            # Scale down alpha based on brightness
            max_val = max(data[y, x, 0], data[y, x, 1], data[y, x, 2])
            alpha_scale = (max_val - 40) / 20.0
            data[y, x, 3] = int(data[y, x, 3] * np.clip(alpha_scale, 0, 1))

# Convert back to PIL image
cleaned_img = Image.fromarray(data)

# Crop the transparent margins
bbox = cleaned_img.getbbox()
if bbox:
    cropped_img = cleaned_img.crop(bbox)
    # Add a tiny padding
    cw, ch = cropped_img.size
    padded_img = Image.new("RGBA", (cw + 6, ch + 6), (0, 0, 0, 0))
    padded_img.paste(cropped_img, (3, 3))
    
    # Save the processed base image to the project public folder
    dest_path = r"h:\RageMedia\RageMedia\public\images\pink_torn_paper.png"
    padded_img.save(dest_path, "PNG")
    print(f"Saved cleaned and cropped base paper to: {dest_path} (size={padded_img.size})")
    
    # Also save to artifacts for reference
    artifacts_output = os.path.join(brain_dir, "pink_torn_paper_processed.png")
    padded_img.save(artifacts_output, "PNG")
    print(f"Saved copy to artifacts: {artifacts_output}")
else:
    print("Error: No non-transparent pixels found after cleaning!")
