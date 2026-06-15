from PIL import Image
import numpy as np
import os
import sys

artifacts_dir = r"C:\Users\A6Leo\.gemini\antigravity-ide\brain\2befbe8f-a854-478e-85f3-b4fcaabc7b17"
public_dir = r"h:\RageMedia\RageMedia\public\images"

# Image mappings
# White Card (media__1781527298478.png) -> white_torn_paper.png
# Pink Card (media__1781527302289.png) -> pink_torn_paper.png
# Lime Card (media__1781527305792.png) -> lime_torn_paper.png
mappings = {
    "media__1781527298478.png": "white_torn_paper.png",
    "media__1781527302289.png": "pink_torn_paper.png",
    "media__1781527305792.png": "lime_torn_paper.png"
}

def process_card(src_filename, dest_filename):
    src_path = os.path.join(artifacts_dir, src_filename)
    dest_path = os.path.join(public_dir, dest_filename)
    
    if not os.path.exists(src_path):
        print(f"Error: {src_path} does not exist!")
        return False
        
    print(f"\nProcessing {src_filename} -> {dest_filename}...")
    img = Image.open(src_path).convert("RGBA")
    width, height = img.size
    
    data = np.array(img, dtype=np.float32)
    r, g, b, a = data[:, :, 0], data[:, :, 1], data[:, :, 2], data[:, :, 3]
    
    # Calculate brightness (max value among R, G, B)
    brightness = np.maximum(np.maximum(r, g), b)
    
    # Background threshold
    threshold = 30.0
    
    # Identify non-black pixels (brightness > threshold)
    y_indices, x_indices = np.where(brightness > threshold)
    if len(x_indices) == 0:
        print(f"Error: No non-black pixels found in {src_filename}!")
        return False
        
    min_x, max_x = x_indices.min(), x_indices.max()
    min_y, max_y = y_indices.min(), y_indices.max()
    print(f"  Detected card bounding box: x=[{min_x}, {max_x}], y=[{min_y}, {max_y}]")
    
    # Clean the background: set all pixels below threshold to transparent
    is_bg = brightness <= threshold
    data[is_bg] = [0, 0, 0, 0]
    
    # Soft anti-aliasing transition at boundaries
    is_edge = (brightness > threshold) & (brightness < threshold + 15)
    for y in range(height):
        for x in range(width):
            if is_edge[y, x]:
                val = brightness[y, x]
                alpha_scale = (val - threshold) / 15.0
                data[y, x, 3] = int(data[y, x, 3] * np.clip(alpha_scale, 0, 1))
                
    # Convert back to PIL image
    cleaned_img = Image.fromarray(data.astype(np.uint8))
    
    # Crop to the detected bounding box
    cropped = cleaned_img.crop((min_x, min_y, max_x + 1, max_y + 1))
    
    # Add a tiny 3px padding
    cw, ch = cropped.size
    padded = Image.new("RGBA", (cw + 6, ch + 6), (0, 0, 0, 0))
    padded.paste(cropped, (3, 3))
    
    padded.save(dest_path, "PNG")
    print(f"  Saved cleaned and cropped card to: {dest_path} (size={padded.size})")
    
    # Also save a copy to the artifacts folder for reference
    artifacts_output = os.path.join(artifacts_dir, dest_filename.replace(".png", "_processed.png"))
    padded.save(artifacts_output, "PNG")
    print(f"  Saved copy to artifacts: {artifacts_output}")
    return True

# Process all three cards
success = True
for src, dest in mappings.items():
    if not process_card(src, dest):
        success = False

if success:
    print("\nAll cards processed successfully!")
else:
    print("\nSome cards failed to process!")
