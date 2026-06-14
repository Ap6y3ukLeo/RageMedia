from PIL import Image
import numpy as np

# Load original image
img_path = r"C:\Users\A6Leo\Downloads\Gemini_Generated_Image_etwphketwphketwp.png"
img = Image.open(img_path).convert("RGBA")
data = np.array(img)
width, height = img.size

# Let's inspect the entire bottom-right quad (bottom-right 500x500 area)
# and find which pixels are NOT near black (i.e. RGB > 30)
for y in range(height - 300, height):
    for x in range(width - 500, width):
        r, g, b, a = data[y, x]
        # If it is not black (r > 30 or g > 30 or b > 30)
        if r > 30 or g > 30 or b > 30:
            # Check how far from the bottom-right corner it is
            dist_x = width - x
            dist_y = height - y
            print(f"Opaque/non-black pixel at x={x} (dist={dist_x}), y={y} (dist={dist_y}): color=[{r},{g},{b}]")
            # Just print a few of them and exit
            break
    else:
        continue
    break
