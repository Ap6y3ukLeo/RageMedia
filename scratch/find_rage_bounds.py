import os
from PIL import Image

def find_rage_text_bounds():
    img_path = 'public/images/hero_artwork_enhanced_clean.png'
    if not os.path.exists(img_path):
        print("Source image not found!")
        return

    img = Image.open(img_path).convert("RGBA")
    width, height = img.size
    pixels = img.load()

    min_x, min_y = width, height
    max_x, max_y = 0, 0
    pink_count = 0

    for y in range(height):
        for x in range(width):
            r, g, b, a = pixels[x, y]
            if a == 0:
                continue

            # Detect pink RAGE text (High R, High B, Low G, x >= 850)
            if r > 120 and b > 100 and g < 145 and x >= 850:
                pink_count += 1
                if x < min_x: min_x = x
                if x > max_x: max_x = x
                if y < min_y: min_y = y
                if y > max_y: max_y = y

    print(f"Pink pixels count: {pink_count}")
    if pink_count > 0:
        print(f"Rage text bounding box: ({min_x}, {min_y}, {max_x}, {max_y})")
    else:
        print("No pink pixels found for Rage text!")

if __name__ == "__main__":
    find_rage_text_bounds()
