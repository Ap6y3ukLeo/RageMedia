from PIL import Image
import numpy as np
import os

filepath = r"C:\Users\A6Leo\.gemini\antigravity-ide\brain\2befbe8f-a854-478e-85f3-b4fcaabc7b17\white_card_large_text_gemini_1781536190061.png"

if os.path.exists(filepath):
    img = Image.open(filepath).convert("RGBA")
    data = np.array(img, dtype=np.float32)
    r, g, b, a = data[:, :, 0], data[:, :, 1], data[:, :, 2], data[:, :, 3]
    brightness = np.maximum(np.maximum(r, g), b)
    
    # The paper is light, while the dark background/graffiti is dark.
    # Let's find the paper bounding box.
    # Let's check for pixels where max(R,G,B) > 130 (which belongs to the paper)
    y_indices, x_indices = np.where(brightness > 130)
    
    min_x, max_x = x_indices.min(), x_indices.max()
    min_y, max_y = y_indices.min(), y_indices.max()
    print(f"Paper bounding box: x=[{min_x}, {max_x}], y=[{min_y}, {max_y}]")
    
    # Save a test crop to see if it isolated the paper correctly
    crop = img.crop((min_x, min_y, max_x + 1, max_y + 1))
    crop.save(r"h:\RageMedia\RageMedia\public\images\white_card_crop_test.png")
    print(f"Saved test crop to: h:\\RageMedia\\RageMedia\\public\\images\\white_card_crop_test.png (size={crop.size})")
    print(f"Aspect ratio: {crop.size[0] / crop.size[1]:.4f}")
else:
    print("File not found")
