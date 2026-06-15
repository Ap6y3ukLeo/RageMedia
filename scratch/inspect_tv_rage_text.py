import os
from PIL import Image

path = r"h:\RageMedia\RageMedia\public\images\tv_rage_text.png"
if os.path.exists(path):
    with Image.open(path) as img:
        print(f"tv_rage_text.png: {img.size[0]}x{img.size[1]} ({img.size[0]/img.size[1]:.3f})")
else:
    print("NOT FOUND")
