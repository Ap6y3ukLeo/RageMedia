import os
from PIL import Image, ImageEnhance, ImageFilter

def enhance_image(img_path, output_path):
    print(f"Enhancing image: {img_path}")
    if not os.path.exists(img_path):
        print("Source file not found!")
        return
        
    img = Image.open(img_path).convert("RGBA")
    
    # 1. Upscale 2x using Lanczos interpolation for high quality resize
    W, H = img.size
    new_size = (W * 2, H * 2)
    img_large = img.resize(new_size, Image.Resampling.LANCZOS)
    
    # 2. Enhance color (saturation) to make the neon pink and lime pops stand out
    color_enhancer = ImageEnhance.Color(img_large)
    img_colored = color_enhancer.enhance(1.2)  # +20% saturation
    
    # 3. Enhance contrast to make the dark elements pop
    contrast_enhancer = ImageEnhance.Contrast(img_colored)
    img_contrasted = contrast_enhancer.enhance(1.1)  # +10% contrast
    
    # 4. Sharpen the image for crisp details on high-DPI screens
    img_sharpened = img_contrasted.filter(ImageFilter.SHARPEN)
    
    # Save the output image
    img_sharpened.save(output_path, "PNG")
    print(f"Enhanced image successfully saved to {output_path} (size: {new_size})")

if __name__ == "__main__":
    src = r"h:\RageMedia\RageMedia\public\images\hero_megaphone_slogan_uploaded.png"
    dst = r"h:\RageMedia\RageMedia\public\images\hero_artwork_enhanced_clean.png"
    enhance_image(src, dst)
