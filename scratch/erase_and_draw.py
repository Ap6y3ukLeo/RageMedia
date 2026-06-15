from PIL import Image, ImageDraw, ImageFont
import os

public_dir = r"h:\RageMedia\RageMedia\public\images"
font_path = r"C:\Windows\Fonts\arial.ttf" # Standard Arial regular

def process_image(filename):
    filepath = os.path.join(public_dir, filename)
    if not os.path.exists(filepath):
        print(f"Error: {filepath} not found!")
        return
        
    img = Image.open(filepath).convert("RGBA")
    w, h = img.size
    
    # 1. Clone clean paper texture from the top-middle part of the card (where it is empty)
    # Let's crop from y=90 to y=135, x=200 to 800 (width 600, height 45)
    clean_patch = img.crop((200, 90, 800, 135))
    
    # Paste it over the old small description text at y=585 to 630
    img.paste(clean_patch, (200, 585))
    
    # 2. Draw new larger description text (+5pt larger than original, size 17 is perfect)
    draw = ImageDraw.Draw(img)
    text = "Подберём лучших под ваш проект и ЦА"
    
    # Load Arial Regular (not Bold, to keep it clean and match style)
    try:
        font = ImageFont.truetype(font_path, 17) # Size 17
    except IOError:
        font = ImageFont.load_default()
            
    # Calculate text bounding box to center it
    text_bbox = draw.textbbox((0, 0), text, font=font)
    text_width = text_bbox[2] - text_bbox[0]
    
    # Center text horizontally on the card and position at y=592
    x_pos = (w - text_width) // 2
    y_pos = 592
    
    # Draw text in medium-dark grey (to match original style but be more readable)
    draw.text((x_pos, y_pos), text, font=font, fill=(60, 60, 60, 255))
    
    # Save the updated image
    img.save(filepath, "PNG")
    print(f"Successfully processed and drew text on {filename}")

# First restore original images to clean any previous drawings
import subprocess
print("Restoring original card files first...")
subprocess.run(["python", "scratch/process_uploaded_cards.py"])

# Process both regular and hover states
process_image("white_torn_paper.png")
process_image("white_torn_paper_hover.png")
