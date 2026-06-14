from PIL import Image
import numpy as np
import os

img_path = r"h:\RageMedia\RageMedia\public\images\hero_megaphone_no_rage.png"
img = Image.open(img_path).convert("RGBA")
data = np.array(img)
width, height = img.size

# We want to clean up any leftover dark background pixels in the outer regions.
# Let's define the outer regions:
# - Left: x < 500
# - Right: x > 2000
# - Top: y < 300
# - Bottom: y > 1200
# If a pixel in these regions has R < 35 and G < 35 and B < 35, we make it transparent.
count = 0
for y in range(height):
    for x in range(width):
        # Check if in outer region
        is_outer = (x < 500) or (x > 2000) or (y < 300) or (y > 1200)
        if is_outer:
            r, g, b, a = data[y, x]
            if a > 0:
                # If it's very dark (RGB < 35)
                if r < 35 and g < 35 and b < 35:
                    data[y, x] = [0, 0, 0, 0]
                    count += 1

print(f"Cleaned up {count} dark background pixels in the outer regions.")

# Let's save the cleaned image
final_img = Image.fromarray(data)
final_img.save(img_path, "PNG")

# Also save to the artifacts folder
artifacts_dir = r"C:\Users\A6Leo\.gemini\antigravity-ide\brain\2befbe8f-a854-478e-85f3-b4fcaabc7b17"
artifacts_output_path = os.path.join(artifacts_dir, "hero_megaphone_no_rage_processed.png")
final_img.save(artifacts_output_path, "PNG")

print("Image updated successfully.")
