import os
import numpy as np
from PIL import Image, ImageEnhance, ImageFilter

def process_photoroom_image(src_path, dst_path, threshold=15):
    print(f"Processing Photoroom image: {src_path}")
    if not os.path.exists(src_path):
        print("Source file not found!")
        return
        
    img = Image.open(src_path).convert("RGBA")
    
    # 1. Upscale 2.5x to make it very high resolution for a "heavily enlarged" look
    W, H = img.size
    new_size = (int(W * 2.5), int(H * 2.5))
    img_large = img.resize(new_size, Image.Resampling.LANCZOS)
    
    # 2. Enhance color (saturation) and contrast slightly
    color_enhancer = ImageEnhance.Color(img_large)
    img_colored = color_enhancer.enhance(1.25)
    
    contrast_enhancer = ImageEnhance.Contrast(img_colored)
    img_contrasted = contrast_enhancer.enhance(1.15)
    
    # 3. Sharpen details
    img_sharpened = img_contrasted.filter(ImageFilter.SHARPEN)
    
    # 4. Crop transparent margins based on alpha threshold
    data = np.array(img_sharpened)
    alpha = data[:, :, 3]
    
    non_empty_rows = np.where(np.max(alpha > threshold, axis=1))[0]
    non_empty_cols = np.where(np.max(alpha > threshold, axis=0))[0]
    
    if len(non_empty_rows) > 0 and len(non_empty_cols) > 0:
        ymin, ymax = non_empty_rows[0], non_empty_rows[-1]
        xmin, xmax = non_empty_cols[0], non_empty_cols[-1]
        
        # Add 5px padding
        ymin = max(0, ymin - 5)
        ymax = min(img_sharpened.height, ymax + 5)
        xmin = max(0, xmin - 5)
        xmax = min(img_sharpened.width, xmax + 5)
        
        final_img = img_sharpened.crop((xmin, ymin, xmax, ymax))
        final_img.save(dst_path, "PNG")
        print(f"Successfully processed, cropped, and saved to {dst_path} (size: {final_img.size})")
    else:
        # Fallback if no pixels match threshold
        img_sharpened.save(dst_path, "PNG")
        print(f"Saved without cropping to {dst_path}")

if __name__ == "__main__":
    src = r"h:\RageMedia\RageMedia\public\images\hero_megaphone_photoroom.png"
    dst = r"h:\RageMedia\RageMedia\public\images\hero_artwork_enhanced_clean.png"
    process_photoroom_image(src, dst)
