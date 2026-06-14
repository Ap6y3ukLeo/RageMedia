from PIL import Image
import numpy as np

img_path = r"h:\RageMedia\RageMedia\public\images\hero_megaphone_no_rage.png"
img = Image.open(img_path).convert("RGBA")
data = np.array(img)
width, height = img.size

# Let's inspect the bounding box of x in [2100, 2450], y in [1300, 1450]
# We want to check if the pixels just to the left (e.g. x in [2000, 2100]) or above (y in [1200, 1300]) are transparent (alpha == 0).
# If they are mostly transparent, it means this bottom-right cluster is isolated!
left_border_alpha = data[1300:1450, 2050:2100, 3]
top_border_alpha = data[1250:1300, 2100:2450, 3]

left_opaque = np.sum(left_border_alpha > 0)
top_opaque = np.sum(top_border_alpha > 0)

print(f"Opaque pixels on the left border (x in 2050-2100): {left_opaque} out of {left_border_alpha.size}")
print(f"Opaque pixels on the top border (y in 1250-1300): {top_opaque} out of {top_border_alpha.size}")

# Let's also save the cropped region of interest as a separate image so we can inspect it or verify it.
crop_area = img.crop((2050, 1250, 2500, 1500))
crop_area.save(r"C:\Users\A6Leo\.gemini\antigravity-ide\brain\2befbe8f-a854-478e-85f3-b4fcaabc7b17\crop_watermark_area.png")
print("Saved cropped watermark area to artifacts.")
