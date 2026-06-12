import os
from PIL import Image

def crop_transparent_borders(img_path, output_path):
    print(f"Cropping transparent borders from: {img_path}")
    if not os.path.exists(img_path):
        print("Source file not found!")
        return
        
    img = Image.open(img_path)
    
    # Get the bounding box of the non-zero (non-transparent) regions
    bbox = img.getbbox()
    if bbox:
        # Crop the image to the bounding box
        cropped_img = img.crop(bbox)
        cropped_img.save(output_path, "PNG")
        print(f"Successfully cropped from {img.size} to {cropped_img.size} and saved to {output_path}")
    else:
        print("Image is entirely transparent, nothing to crop.")

if __name__ == "__main__":
    src = r"h:\RageMedia\RageMedia\public\images\hero_artwork_enhanced_clean.png"
    dst = r"h:\RageMedia\RageMedia\public\images\hero_artwork_enhanced_clean.png"
    crop_transparent_borders(src, dst)
