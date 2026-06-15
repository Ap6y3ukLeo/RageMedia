from PIL import Image
import os

public_dir = r"h:\RageMedia\RageMedia\public\images"
white_card_path = os.path.join(public_dir, "white_torn_paper.png")

if os.path.exists(white_card_path):
    img = Image.open(white_card_path)
    print(f"White card size: {img.size}")
    # Crop the bottom 25% of the card
    w, h = img.size
    bottom_crop = img.crop((0, int(h * 0.7), w, h))
    bottom_crop.save(os.path.join(public_dir, "white_card_bottom_debug.png"))
    print("Saved white_card_bottom_debug.png")
else:
    print("white_torn_paper.png not found!")
