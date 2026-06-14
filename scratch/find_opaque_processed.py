from PIL import Image
import numpy as np

img_path = r"h:\RageMedia\RageMedia\public\images\hero_megaphone_no_rage.png"
img = Image.open(img_path).convert("RGBA")
data = np.array(img)
width, height = img.size

# Let's find all opaque pixels (alpha > 0) in the region x > 2100, y > 1300
print("Searching for opaque pixels in the bottom-right corner (x > 2100, y > 1300):")
count = 0
min_x, max_x = width, 0
min_y, max_y = height, 0

for y in range(1300, height):
    for x in range(2100, width):
        r, g, b, a = data[y, x]
        if a > 0:
            count += 1
            min_x = min(min_x, x)
            max_x = max(max_x, x)
            min_y = min(min_y, y)
            max_y = max(max_y, y)

print(f"Total opaque pixels found: {count}")
if count > 0:
    print(f"Bounding box of these pixels: x in [{min_x}, {max_x}] (dist from right: [{width - max_x}, {width - min_x}]), y in [{min_y}, {max_y}] (dist from bottom: [{height - max_y}, {height - min_y}])")
