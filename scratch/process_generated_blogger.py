import os
from PIL import Image

SOURCE_DIR = r"C:\Users\A6Leo\.gemini\antigravity-ide\brain\2befbe8f-a854-478e-85f3-b4fcaabc7b17"
DEST_DIR = r"h:\RageMedia\RageMedia\public\images"

def find_latest_file(prefix):
    files = [f for f in os.listdir(SOURCE_DIR) if f.startswith(prefix) and f.endswith(".png")]
    if not files:
        raise FileNotFoundError(f"No files starting with {prefix} found in {SOURCE_DIR}")
    files.sort()
    return os.path.join(SOURCE_DIR, files[-1])

def crop_to_aspect_ratio(img, target_ratio):
    w, h = img.size
    current_ratio = w / h
    
    if current_ratio < target_ratio:
        # Image is too tall, crop height from the center
        new_h = int(w / target_ratio)
        y_offset = (h - new_h) // 2
        return img.crop((0, y_offset, w, y_offset + new_h))
    elif current_ratio > target_ratio:
        # Image is too wide, crop width from the center
        new_w = int(h * target_ratio)
        x_offset = (w - new_w) // 2
        return img.crop((x_offset, 0, x_offset + new_w, h))
    return img

def process_and_recolor():
    # 1. Find latest generated lime hover file in brain directory
    src_path = find_latest_file("blogger_paper_lime_hover")
    print(f"Loading generated hover paper from: {src_path}")
    
    img = Image.open(src_path).convert("RGBA")
    pixels = img.load()
    width, height = img.size
    
    # 2. Make background transparent (threshold=130)
    threshold = 130
    for x in range(width):
        for y in range(height):
            r, g, b, a = pixels[x, y]
            if max(r, g, b) < threshold:
                pixels[x, y] = (0, 0, 0, 0)
            else:
                brightness = max(r, g, b)
                if brightness < threshold + 20:
                    alpha = int(((brightness - threshold) / 20.0) * a)
                    pixels[x, y] = (r, g, b, alpha)
                    
    # 3. Crop transparent borders
    bbox = img.getbbox()
    if not bbox:
        print("Error: No non-transparent pixels found!")
        return
        
    base_cropped = img.crop(bbox)
    
    # 4. Get normal cards to match ratios
    # Normal lime size: 890x297
    ratio_lime = 890 / 297
    # Normal pink size: 862x286
    ratio_pink = 862 / 286
    # Normal white size: 909x278
    ratio_white = 909 / 278
    
    # 5. Crop and save Lime
    lime_cropped = crop_to_aspect_ratio(base_cropped, ratio_lime)
    lw, lh = lime_cropped.size
    # Add tiny padding
    lime_padded = Image.new("RGBA", (lw + 4, lh + 4), (0, 0, 0, 0))
    lime_padded.paste(lime_cropped, (2, 2))
    
    lime_dest = os.path.join(DEST_DIR, "blogger_paper_lime_hover.png")
    lime_padded.save(lime_dest, "PNG")
    print(f"Saved lime green hover (aspect ratio matched) to: {lime_dest}. Size: {lime_padded.size}")
    
    # 6. Generate and save Pink
    pink_cropped = crop_to_aspect_ratio(base_cropped, ratio_pink)
    pw, ph = pink_cropped.size
    pink_padded = Image.new("RGBA", (pw + 4, ph + 4), (0, 0, 0, 0))
    pink_padded.paste(pink_cropped, (2, 2))
    
    pink_gray = pink_padded.convert("L")
    pink_gray_pixels = pink_gray.load()
    pink_result = Image.new("RGBA", (pw + 4, ph + 4))
    pink_pixels = pink_result.load()
    
    target_pink = (245, 76, 140)
    for x in range(pw + 4):
        for y in range(ph + 4):
            _, _, _, a = pink_padded.getpixel((x, y))
            if a == 0:
                pink_pixels[x, y] = (0, 0, 0, 0)
            else:
                v = pink_gray_pixels[x, y]
                scale = v / 255.0
                pr = int(target_pink[0] * scale)
                pg = int(target_pink[1] * scale)
                pb = int(target_pink[2] * scale)
                pink_pixels[x, y] = (pr, pg, pb, a)
                
    pink_dest = os.path.join(DEST_DIR, "blogger_paper_pink_hover.png")
    pink_result.save(pink_dest, "PNG")
    print(f"Saved pink hover (aspect ratio matched) to: {pink_dest}. Size: {pink_result.size}")
    
    # 7. Generate and save White
    white_cropped = crop_to_aspect_ratio(base_cropped, ratio_white)
    ww, wh = white_cropped.size
    white_padded = Image.new("RGBA", (ww + 4, wh + 4), (0, 0, 0, 0))
    white_padded.paste(white_cropped, (2, 2))
    
    white_gray = white_padded.convert("L")
    white_gray_pixels = white_gray.load()
    white_result = Image.new("RGBA", (ww + 4, wh + 4))
    white_pixels = white_result.load()
    
    target_white = (210, 210, 210)
    for x in range(ww + 4):
        for y in range(wh + 4):
            _, _, _, a = white_padded.getpixel((x, y))
            if a == 0:
                white_pixels[x, y] = (0, 0, 0, 0)
            else:
                v = white_gray_pixels[x, y]
                scale = v / 255.0
                wv = int(target_white[0] * scale)
                white_pixels[x, y] = (wv, wv, wv, a)
                
    white_dest = os.path.join(DEST_DIR, "blogger_paper_white_hover.png")
    white_result.save(white_dest, "PNG")
    print(f"Saved white hover (aspect ratio matched) to: {white_dest}. Size: {white_result.size}")

if __name__ == "__main__":
    process_and_recolor()
