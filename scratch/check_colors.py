from PIL import Image
import numpy as np

img_path = r"h:\RageMedia\RageMedia\public\images\hero_megaphone_no_rage.png"
img = Image.open(img_path).convert("RGBA")
data = np.array(img)
width, height = img.size

opaque_pixels = []
for y in range(1300, height):
    for x in range(2100, width):
        r, g, b, a = data[y, x]
        if a > 0:
            opaque_pixels.append((x, y, (int(r), int(g), int(b))))

print(f"Total opaque pixels in this area: {len(opaque_pixels)}")
if len(opaque_pixels) > 0:
    # Print some info about the RGB values
    rgbs = np.array([p[2] for p in opaque_pixels])
    min_rgb = rgbs.min(axis=0)
    max_rgb = rgbs.max(axis=0)
    mean_rgb = rgbs.mean(axis=0)
    print(f"Min RGB: {min_rgb}")
    print(f"Max RGB: {max_rgb}")
    print(f"Mean RGB: {mean_rgb}")
    
    # Check if there are pixels with high brightness (e.g. R > 100 or G > 100 or B > 100)
    bright_pixels = [p for p in opaque_pixels if p[2][0] > 100 or p[2][1] > 100 or p[2][2] > 100]
    print(f"Bright pixels (R or G or B > 100): {len(bright_pixels)}")
    if len(bright_pixels) > 0:
        print("Sample bright pixels:")
        for p in bright_pixels[:10]:
            print(p)
