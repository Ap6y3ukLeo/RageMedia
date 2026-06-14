from PIL import Image
import numpy as np

img_path = r"h:\RageMedia\RageMedia\public\images\hero_megaphone_no_rage.png"
img = Image.open(img_path).convert("RGBA")
data = np.array(img)

# Component 2 box: x=[2336, 2431], y=[1344, 1439]
# Let's count pixels and print unique colors
colors = {}
for y in range(1344, 1440):
    for x in range(2336, 2432):
        r, g, b, a = data[y, x]
        if a > 0:
            c = (r, g, b)
            colors[c] = colors.get(c, 0) + 1

print(f"Total non-transparent pixels in Component 2 box: {sum(colors.values())}")
print("Top 10 most common colors:")
sorted_colors = sorted(colors.items(), key=lambda x: x[1], reverse=True)
for c, count in sorted_colors[:10]:
    print(f"Color {c}: count {count}")
