from PIL import Image
import numpy as np

img_path = r"C:\Users\A6Leo\Downloads\Gemini_Generated_Image_etwphketwphketwp.png"
img = Image.open(img_path).convert("RGBA")
data = np.array(img)
width, height = img.size

# Let's count non-black pixels (r > 30 or g > 30 or b > 30) in the extreme bottom-right corner
# say x > 2400, y > 1450
print("Extreme corner search (x > 2400, y > 1450):")
count = 0
for y in range(1450, height):
    for x in range(2400, width):
        r, g, b, a = data[y, x]
        if r > 30 or g > 30 or b > 30:
            count += 1

print(f"Total non-black pixels in extreme corner: {count}")

# Let's save a crop of the bottom-right 400x300 area of the original image
original_crop = img.crop((width - 400, height - 300, width, height))
original_crop.save(r"C:\Users\A6Leo\.gemini\antigravity-ide\brain\2befbe8f-a854-478e-85f3-b4fcaabc7b17\original_bottom_right.png")
print("Saved original bottom-right crop to artifacts.")
