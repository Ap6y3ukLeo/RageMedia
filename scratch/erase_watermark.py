from PIL import Image
import numpy as np
import os

img_path = r"h:\RageMedia\RageMedia\public\images\hero_megaphone_no_rage.png"
img = Image.open(img_path).convert("RGBA")
data = np.array(img)
width, height = img.size

# Count opaque pixels before clearing
before_count = np.sum(data[1300:height, 2300:width, 3] > 0)
print(f"Opaque pixels in x >= 2300, y >= 1300 before clearing: {before_count}")

# Clear the area (make it fully transparent)
data[1300:height, 2300:width] = [0, 0, 0, 0]

# Count opaque pixels after clearing
after_count = np.sum(data[1300:height, 2300:width, 3] > 0)
print(f"Opaque pixels in x >= 2300, y >= 1300 after clearing: {after_count}")

# Save the updated image
final_img = Image.fromarray(data)
final_img.save(img_path, "PNG")
print("Saved updated image to public/images/hero_megaphone_no_rage.png")

# Also save to the artifacts folder
artifacts_dir = r"C:\Users\A6Leo\.gemini\antigravity-ide\brain\2befbe8f-a854-478e-85f3-b4fcaabc7b17"
artifacts_output_path = os.path.join(artifacts_dir, "hero_megaphone_no_rage_processed.png")
final_img.save(artifacts_output_path, "PNG")
print(f"Saved updated image to artifacts at {artifacts_output_path}")
