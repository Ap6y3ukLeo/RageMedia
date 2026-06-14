from PIL import Image
import numpy as np

img_path = r"h:\RageMedia\RageMedia\public\images\hero_megaphone_no_rage.png"
img = Image.open(img_path).convert("RGBA")
data = np.array(img)
width, height = img.size

# Check right margin: x >= width - 100
right_opaque = []
for y in range(height):
    for x in range(width - 100, width):
        r, g, b, a = data[y, x]
        if a > 0:
            right_opaque.append((x, y, (r, g, b, a)))

# Check bottom margin: y >= height - 100
bottom_opaque = []
for y in range(height - 100, height):
    for x in range(width):
        r, g, b, a = data[y, x]
        if a > 0:
            bottom_opaque.append((x, y, (r, g, b, a)))

print(f"Opaque pixels in right margin (width-100 to width): {len(right_opaque)}")
if len(right_opaque) > 0:
    xs = [p[0] for p in right_opaque]
    ys = [p[1] for p in right_opaque]
    print(f"  Bounding box: x=[{min(xs)}, {max(xs)}], y=[{min(ys)}, {max(ys)}]")

print(f"Opaque pixels in bottom margin (height-100 to height): {len(bottom_opaque)}")
if len(bottom_opaque) > 0:
    xs = [p[0] for p in bottom_opaque]
    ys = [p[1] for p in bottom_opaque]
    print(f"  Bounding box: x=[{min(xs)}, {max(xs)}], y=[{min(ys)}, {max(ys)}]")
