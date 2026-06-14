from PIL import Image
import os

original_path = r"C:\Users\A6Leo\Downloads\Gemini_Generated_Image_etwphketwphketwp.png"
processed_path = r"h:\RageMedia\RageMedia\public\images\hero_megaphone_no_rage.png"
artifacts_dir = r"C:\Users\A6Leo\.gemini\antigravity-ide\brain\2befbe8f-a854-478e-85f3-b4fcaabc7b17"

# Crop region: x=[2200, 2500], y=[1300, 1500]
crop_box = (2200, 1300, 2500, 1500)

if os.path.exists(original_path):
    img_orig = Image.open(original_path)
    crop_orig = img_orig.crop(crop_box)
    crop_orig.save(os.path.join(artifacts_dir, "watermark_crop_original.png"))
    print("Saved watermark_crop_original.png")
else:
    print("Original image not found at path")

if os.path.exists(processed_path):
    img_proc = Image.open(processed_path)
    crop_proc = img_proc.crop(crop_box)
    crop_proc.save(os.path.join(artifacts_dir, "watermark_crop_processed.png"))
    print("Saved watermark_crop_processed.png")
else:
    print("Processed image not found at path")
