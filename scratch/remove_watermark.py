from PIL import Image
import numpy as np
import os

img_path = r"h:\RageMedia\RageMedia\public\images\hero_megaphone_no_rage.png"
img = Image.open(img_path).convert("RGBA")
width, height = img.size

# Let's inspect the bottom right area (say, last 300 pixels horizontally and 150 pixels vertically)
# and set it to transparent.
# Let's check how many opaque pixels are in that area first.
data = np.array(img)
sub_area = data[height-150:height, width-300:width, 3]
opaque_pixels = np.sum(sub_area > 0)
print(f"Opaque pixels in the bottom-right 300x150 area: {opaque_pixels}")

# Clear the area (make it fully transparent)
data[height-150:height, width-300:width] = [0, 0, 0, 0]

# Save the updated image
final_img = Image.fromarray(data)
final_img.save(img_path, "PNG")

# Also save to the artifacts folder
artifacts_dir = r"C:\Users\A6Leo\.gemini\antigravity-ide\brain\2befbe8f-a854-478e-85f3-b4fcaabc7b17"
artifacts_output_path = os.path.join(artifacts_dir, "hero_megaphone_no_rage_processed.png")
final_img.save(artifacts_output_path, "PNG")

print("Watermark removed and image updated.")
