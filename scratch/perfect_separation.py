import os
from PIL import Image

def perfect_separation():
    img_path = 'public/images/hero_artwork_enhanced_clean.png'
    if not os.path.exists(img_path):
        print("Source image not found!")
        return

    img = Image.open(img_path).convert("RGBA")
    width, height = img.size
    pixels = img.load()

    # Create new image copies
    img_no_rage = img.copy()
    pixels_no_rage = img_no_rage.load()

    img_rage_only = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    pixels_rage_only = img_rage_only.load()

    # Box around the RAGE graffiti text
    min_x, max_x = 1100, 1800
    min_y, max_y = 150, 650

    for y in range(height):
        for x in range(width):
            # Check if within the RAGE graffiti bounding box
            if min_x <= x <= max_x and min_y <= y <= max_y:
                r, g, b, a = pixels[x, y]
                # Detect the vibrant pink graffiti color
                if r > 130 and b > 90 and g < 140:
                    # Save to RAGE-only layer
                    pixels_rage_only[x, y] = (r, g, b, a)
                    # Erase from base image by painting it dark gray/black (megaphone horn body color)
                    pixels_no_rage[x, y] = (20, 19, 22, 255)

    # Save outputs
    img_no_rage.save('public/images/hero_megaphone_no_rage.png', 'PNG')
    img_rage_only.save('public/images/hero_rage_text_only.png', 'PNG')
    print("Perfect separation complete!")

if __name__ == "__main__":
    perfect_separation()
