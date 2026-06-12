import os
from PIL import Image

def clean_and_crop(image_path, threshold=130):
    print(f"\n--- Cleaning & Cropping {image_path} with threshold {threshold} ---")
    if not os.path.exists(image_path):
        print(f"File {image_path} does not exist!")
        return

    img = Image.open(image_path).convert("RGBA")
    pixels = img.load()
    width, height = img.size

    # 1. Make any pixel with max(r,g,b) < threshold fully transparent
    for x in range(width):
        for y in range(height):
            r, g, b, a = pixels[x, y]
            if a > 0:
                if max(r, g, b) < threshold:
                    pixels[x, y] = (0, 0, 0, 0)
                else:
                    # Fade out pixels near threshold
                    brightness = max(r, g, b)
                    if brightness < threshold + 20:
                        alpha = int(((brightness - threshold) / 20.0) * a)
                        pixels[x, y] = (r, g, b, alpha)

    # 2. Crop the transparent borders using density or getbbox
    bbox = img.getbbox()
    if bbox:
        cropped_img = img.crop(bbox)
        # Add a tiny 2px padding
        w, h = cropped_img.size
        padded_img = Image.new("RGBA", (w + 4, h + 4), (0, 0, 0, 0))
        padded_img.paste(cropped_img, (2, 2))
        padded_img.save(image_path, "PNG")
        print(f"Successfully cleaned and cropped to {padded_img.size} (original was {width}x{height})")
    else:
        print(f"Error: No non-transparent pixels left in {image_path}!")

if __name__ == "__main__":
    # Clean the images in public/images
    clean_and_crop("public/images/lime_torn_paper.png", threshold=130)
    clean_and_crop("public/images/pink_torn_paper.png", threshold=130)
    clean_and_crop("public/images/white_torn_paper.png", threshold=130)
