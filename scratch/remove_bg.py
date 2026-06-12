import os
from PIL import Image

def remove_background(image_path, threshold=50):
    print(f"Processing {image_path}...")
    if not os.path.exists(image_path):
        print(f"File {image_path} does not exist!")
        return

    # Open image and ensure it has an alpha channel
    img = Image.open(image_path).convert("RGBA")
    pixels = img.load()
    width, height = img.size

    for x in range(width):
        for y in range(height):
            r, g, b, a = pixels[x, y]
            
            # If the pixel is dark, make it fully transparent
            # We check the brightness of the pixel
            if max(r, g, b) < threshold:
                pixels[x, y] = (0, 0, 0, 0)
            else:
                # Optional: Smooth the edges slightly
                # If a pixel is near the threshold, give it partial transparency
                brightness = max(r, g, b)
                if brightness < threshold + 15:
                    alpha = int(((brightness - threshold) / 15.0) * 255)
                    pixels[x, y] = (r, g, b, alpha)

    # Save the processed image back
    img.save(image_path, "PNG")
    print(f"Saved transparent PNG to {image_path}")

if __name__ == "__main__":
    remove_background("public/images/lime_torn_paper.png", threshold=48)
    remove_background("public/images/pink_torn_paper.png", threshold=48)
    remove_background("public/images/white_torn_paper.png", threshold=48)
