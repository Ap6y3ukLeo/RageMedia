import os
from PIL import Image

def map_pink_pixels():
    img_path = 'public/images/hero_artwork_enhanced_clean.png'
    if not os.path.exists(img_path):
        print("Source image not found!")
        return

    img = Image.open(img_path).convert("RGBA")
    width, height = img.size
    pixels = img.load()

    img_map = Image.new("RGBA", (width, height), (0, 0, 0, 255))
    pixels_map = img_map.load()

    for y in range(height):
        for x in range(width):
            r, g, b, a = pixels[x, y]
            if a == 0:
                continue

            # Detect pink/magenta
            if r > 130 and b > 100 and g < 135:
                # Keep pink color
                pixels_map[x, y] = (r, g, b, a)

    img_map.save('public/images/pink_pixels_map.png', 'PNG')
    print("Pink pixels map saved!")

if __name__ == "__main__":
    map_pink_pixels()
