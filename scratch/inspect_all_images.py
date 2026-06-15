import os
from PIL import Image

public_dir = r"h:\RageMedia\RageMedia\public\images"
images_to_check = [
    "hero_megaphone_no_rage.png",
    "hero_rage_text_only.png",
    "white_torn_paper.png",
    "pink_torn_paper.png",
    "lime_torn_paper.png",
    "case_paper_lime.png",
    "case_paper_pink.png",
    "case_paper_white.png",
    "service_paper_lime.png",
    "service_paper_pink.png",
    "service_paper_white.png",
    "site_background.png",
    "tv_casing_only.png",
    "rage_logo_uploaded.png"
]

print("Image dimensions:")
for img_name in images_to_check:
    path = os.path.join(public_dir, img_name)
    if os.path.exists(path):
        with Image.open(path) as img:
            print(f"{img_name}: {img.size[0]}x{img.size[1]} ({img.size[0]/img.size[1]:.3f})")
    else:
        print(f"{img_name}: NOT FOUND")
