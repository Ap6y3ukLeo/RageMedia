from PIL import Image
import os

img_path = r"h:\RageMedia\RageMedia\public\images\pink_torn_paper.png"
if os.path.exists(img_path):
    img = Image.open(img_path)
    print(f"pink_torn_paper.png: size={img.size}, mode={img.mode}, format={img.format}")
else:
    print("pink_torn_paper.png does not exist")
