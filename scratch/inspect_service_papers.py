from PIL import Image
import os

base_dir = r"h:\RageMedia\RageMedia\public\images"
files = [
    "service_paper_lime.png",
    "service_paper_pink.png",
    "service_paper_white.png"
]

for filename in files:
    path = os.path.join(base_dir, filename)
    if os.path.exists(path):
        img = Image.open(path)
        print(f"{filename}: size={img.size}, aspect={img.size[0]/img.size[1]:.2f}")
    else:
        print(f"{filename} does not exist")
