import os
from PIL import Image

def crop_transparent_borders(image_path):
    print(f"Cropping transparent borders for {image_path}...")
    if not os.path.exists(image_path):
        print(f"File {image_path} does not exist!")
        return

    img = Image.open(image_path).convert("RGBA")
    
    # Get bounding box of non-transparent pixels
    bbox = img.getbbox()
    if bbox:
        # Crop the image to the bounding box
        cropped_img = img.crop(bbox)
        # Add a tiny 2px padding so the anti-aliased edge isn't hard cut
        width, height = cropped_img.size
        padded_img = Image.new("RGBA", (width + 4, height + 4), (0, 0, 0, 0))
        padded_img.paste(cropped_img, (2, 2))
        
        padded_img.save(image_path, "PNG")
        print(f"Successfully cropped {image_path} to size {padded_img.size}")
    else:
        print(f"No non-transparent pixels found in {image_path}!")

if __name__ == "__main__":
    crop_transparent_borders("public/images/lime_torn_paper.png")
    crop_transparent_borders("public/images/pink_torn_paper.png")
    crop_transparent_borders("public/images/white_torn_paper.png")
