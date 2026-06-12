import os
import numpy as np
from PIL import Image

def crop_with_alpha_threshold(img_path, output_path, threshold=15):
    print(f"Cropping with alpha threshold: {img_path}")
    if not os.path.exists(img_path):
        print("Source file not found!")
        return
        
    img = Image.open(img_path)
    data = np.array(img)
    alpha = data[:, :, 3]
    
    # Find rows and cols where alpha is above the threshold
    non_empty_rows = np.where(np.max(alpha > threshold, axis=1))[0]
    non_empty_cols = np.where(np.max(alpha > threshold, axis=0))[0]
    
    if len(non_empty_rows) > 0 and len(non_empty_cols) > 0:
        ymin, ymax = non_empty_rows[0], non_empty_rows[-1]
        xmin, xmax = non_empty_cols[0], non_empty_cols[-1]
        
        # Add a small padding of 5 pixels to avoid clipping edges
        ymin = max(0, ymin - 5)
        ymax = min(img.height, ymax + 5)
        xmin = max(0, xmin - 5)
        xmax = min(img.width, xmax + 5)
        
        cropped_img = img.crop((xmin, ymin, xmax, ymax))
        cropped_img.save(output_path, "PNG")
        print(f"Successfully cropped from {img.size} to {cropped_img.size} and saved to {output_path}")
    else:
        print("No pixels match threshold.")

if __name__ == "__main__":
    src = r"h:\RageMedia\RageMedia\public\images\hero_artwork_enhanced_clean.png"
    dst = r"h:\RageMedia\RageMedia\public\images\hero_artwork_enhanced_clean.png"
    crop_with_alpha_threshold(src, dst)
