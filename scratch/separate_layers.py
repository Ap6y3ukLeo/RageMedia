import os
from PIL import Image

def separate_layers():
    img_path = 'public/images/hero_artwork_enhanced_clean.png'
    if not os.path.exists(img_path):
        print("Source image not found!")
        return

    img = Image.open(img_path).convert("RGBA")
    width, height = img.size

    # Create empty images with same size and transparent background
    img_megaphone = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    img_pink_lightning = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    img_green_lightning = Image.new("RGBA", (width, height), (0, 0, 0, 0))

    pixels = img.load()
    pix_mega = img_megaphone.load()
    pix_pink = img_pink_lightning.load()
    pix_green = img_green_lightning.load()

    for y in range(height):
        for x in range(width):
            r, g, b, a = pixels[x, y]
            if a == 0:
                continue

            # Detect Pink lightning: High R, High B, Low G
            # The hand-drawn pink strokes are very vibrant magenta/pink: e.g., r > 150, b > 100, g < 120
            # Wait, there's also the "RAGE" logo on the megaphone which is pink/magenta!
            # The RAGE logo is located in the center of the megaphone horn.
            # Let's check coordinates. The RAGE logo is approximately in the middle: x between 900 and 1300, y between 250 and 500.
            # Pink lightnings are on the left side of the image (x < 850).
            # So if x < 850 and it matches the pink color, it's definitely a pink lightning!
            is_pink_lightning = (r > 120 and b > 100 and g < 140 and x < 850)

            # Detect Green lightning: High G, Low R, Low B
            # The green lightnings are on the top-right/right side of the image: x > 1150
            is_green_lightning = (g > 150 and r < 160 and b < 130 and x > 1150 and y < 600)

            if is_pink_lightning:
                pix_pink[x, y] = (r, g, b, a)
            elif is_green_lightning:
                pix_green[x, y] = (r, g, b, a)
            else:
                # Keep megaphone, hand, and RAGE logo here
                pix_mega[x, y] = (r, g, b, a)

    # Save the separated layers
    img_megaphone.save('public/images/hero_megaphone_only.png', 'PNG')
    img_pink_lightning.save('public/images/hero_lightning_pink.png', 'PNG')
    img_green_lightning.save('public/images/hero_lightning_green.png', 'PNG')
    print("Separated layers saved successfully!")

if __name__ == "__main__":
    separate_layers()
