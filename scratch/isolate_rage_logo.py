import os
from PIL import Image

def isolate_rage_logo():
    img_path = 'public/images/hero_artwork_enhanced_clean.png'
    if not os.path.exists(img_path):
        print("Source image not found!")
        return

    img = Image.open(img_path).convert("RGBA")
    width, height = img.size
    pixels = img.load()

    # Create new images for output
    img_no_rage = img.copy()
    pixels_no_rage = img_no_rage.load()
    
    img_rage_only = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    pixels_rage_only = img_rage_only.load()

    # Let's define the search box for the RAGE logo.
    # From coordinates: megaphone horn is on the right/middle.
    # Let's examine where the pink "RAGE" text is.
    # Let's save a crop of this area to verify, and also extract the text.
    # Let's do a bounding box of: x from 1100 to 1750, y from 200 to 650.
    min_x, max_x = 1100, 1750
    min_y, max_y = 200, 650

    for y in range(height):
        for x in range(width):
            # If inside the RAGE text bounding box
            if min_x <= x <= max_x and min_y <= y <= max_y:
                r, g, b, a = pixels[x, y]
                # Detect the vibrant pink graffiti color:
                # Typically R > 150, B > 100, G < 130
                if r > 130 and b > 100 and g < 135:
                    # Save to RAGE-only layer
                    pixels_rage_only[x, y] = (r, g, b, a)
                    # Erase from base image (replace with the horn's dark color or transparent)
                    # The horn background is dark gray/black. Let's use black or very dark gray (15, 15, 15, 255)
                    pixels_no_rage[x, y] = (15, 15, 15, 255)

    # Save the files
    img_no_rage.save('public/images/hero_megaphone_no_rage.png', 'PNG')
    img_rage_only.save('public/images/hero_rage_text_only.png', 'PNG')
    
    # Also save a crop of the logo itself so we can check if it succeeded
    logo_bbox = img_rage_only.getbbox()
    print(f"Rage logo isolated. Bounding box in full image: {logo_bbox}")
    
    if logo_bbox:
        cropped_logo = img_rage_only.crop(logo_bbox)
        cropped_logo.save('public/images/debug_rage_logo_crop.png', 'PNG')
        print("Debug crop saved!")

if __name__ == "__main__":
    isolate_rage_logo()
