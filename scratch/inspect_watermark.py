from PIL import Image
import numpy as np

img_path = r"h:\RageMedia\RageMedia\public\images\hero_megaphone_no_rage.png"
img = Image.open(img_path).convert("RGBA")
data = np.array(img)
width, height = img.size

# Let's check the sub-rectangle x in [2200, 2400], y in [1300, 1450]
# and print the coordinate of the opaque pixels
opaque_pixels = []
for y in range(1300, 1450):
    for x in range(2200, 2400):
        r, g, b, a = data[y, x]
        if a > 0:
            opaque_pixels.append((x, y, (r, g, b)))

print(f"Number of opaque pixels in x[2200,2400], y[1300,1450]: {len(opaque_pixels)}")
if len(opaque_pixels) > 0:
    print("Sample pixels:")
    for p in opaque_pixels[:10]:
        print(p)
