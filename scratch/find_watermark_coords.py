from PIL import Image
import numpy as np

original_path = r"C:\Users\A6Leo\Downloads\Gemini_Generated_Image_etwphketwphketwp.png"
img = Image.open(original_path).convert("RGBA")
data = np.array(img)
width, height = img.size

# Let's count how many non-black pixels are in different x ranges
print("Non-black pixels count:")
for x_start in range(2000, width, 50):
    count = 0
    for y in range(1200, height):
        for x in range(x_start, min(x_start + 50, width)):
            r, g, b, a = data[y, x]
            if r > 30 or g > 30 or b > 30:
                count += 1
    if count > 0:
        print(f"x in [{x_start}, {min(x_start+50, width)}]: {count} pixels")

print("\nDetail of non-black pixels at x > 2300, y > 1300:")
for y in range(1300, height):
    row_pixels = []
    for x in range(2300, width):
        r, g, b, a = data[y, x]
        if r > 30 or g > 30 or b > 30:
            row_pixels.append((x, r, g, b))
    if row_pixels:
        print(f"y={y}: found {len(row_pixels)} pixels. x range: {row_pixels[0][0]} to {row_pixels[-1][0]}")
