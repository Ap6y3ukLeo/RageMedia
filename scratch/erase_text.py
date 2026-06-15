from PIL import Image
import os

public_dir = r"h:\RageMedia\RageMedia\public\images"
files = ["white_torn_paper.png", "white_torn_paper_hover.png"]

for filename in files:
    filepath = os.path.join(public_dir, filename)
    if os.path.exists(filepath):
        img = Image.open(filepath).convert("RGBA")
        
        # Clone clean paper texture: width = 600px (from 200 to 800), height = 50px (from 435 to 485)
        clean_patch = img.crop((200, 435, 800, 485))
        
        # Paste over the text at the bottom (y=578 to 628, x=200 to 800)
        img.paste(clean_patch, (200, 578))
        
        # Save overwrite
        img.save(filepath, "PNG")
        print(f"Successfully erased bottom text in {filename}")
    else:
        print(f"Error: {filename} not found!")
