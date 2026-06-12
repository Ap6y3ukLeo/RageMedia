import os
from PIL import Image, ImageFilter

DEST_DIR = r"h:\RageMedia\RageMedia\public\images"

def apply_texture_transfer(base_img, texture_img):
    # Resize texture to match base image dimensions
    tex_resized = texture_img.resize(base_img.size, Image.Resampling.LANCZOS)
    
    # Convert texture to grayscale L channel
    tex_gray = tex_resized.convert("L")
    
    # Blur the texture to get the flat lighting background
    tex_blur = tex_gray.filter(ImageFilter.GaussianBlur(radius=15))
    
    # Load pixels
    base_pixels = base_img.load()
    tg_pixels = tex_gray.load()
    tb_pixels = tex_blur.load()
    
    w, h = base_img.size
    result = Image.new("RGBA", (w, h))
    res_pixels = result.load()
    
    for x in range(w):
        for y in range(h):
            r, g, b, a = base_pixels[x, y]
            if a == 0:
                res_pixels[x, y] = (0, 0, 0, 0)
            else:
                # Crease factor: G_src / G_blur
                g_val = tg_pixels[x, y]
                b_val = tb_pixels[x, y]
                
                # Avoid division by zero
                if b_val == 0:
                    b_val = 1
                factor = g_val / b_val
                
                # Apply factor to base color
                nr = min(255, max(0, int(r * factor)))
                ng = min(255, max(0, int(g * factor)))
                nb = min(255, max(0, int(b * factor)))
                
                res_pixels[x, y] = (nr, ng, nb, a)
                
    return result

def fold_top_right_corner(img, S=75, shadow_width=20):
    w, h = img.size
    pixels = img.load()
    
    for x in range(w):
        for y in range(h):
            # Zone of the top-right corner
            if x >= w - S - shadow_width and y <= S + shadow_width:
                # Cut off triangle: x >= w - S, y <= S, and y < x - w + S
                if x >= w - S and y <= S and y < (x - w + S):
                    pixels[x, y] = (0, 0, 0, 0)
                # Folded-back triangle: x >= w - S, y <= S, and y >= x - w + S
                elif x >= w - S and y <= S and y >= (x - w + S):
                    # Mirror coordinates
                    x_src = y + w - S
                    y_src = x - w + S
                    
                    x_src = min(w - 1, max(0, x_src))
                    y_src = min(h - 1, max(0, y_src))
                    
                    r, g, b, a = pixels[x_src, y_src]
                    if a > 0:
                        # Shadowed backside of the paper (0.75x brightness)
                        pixels[x, y] = (int(r * 0.75), int(g * 0.75), int(b * 0.75), a)
                # Drop shadow on the paper side
                else:
                    d = (x - y - w + S)
                    # We check if pixel is in shadow zone
                    if d < 0 and abs(d) <= shadow_width:
                        # Gradient multiplier from 0.55 to 1.0
                        mult = 0.55 + 0.45 * (abs(d) / shadow_width)
                        r, g, b, a = pixels[x, y]
                        if a > 0:
                            pixels[x, y] = (int(r * mult), int(g * mult), int(b * mult), a)
            
            # Crease line along diagonal
            if x >= w - S and y <= S:
                diff = abs(y - (x - w + S))
                if diff <= 1.5:
                    r, g, b, a = pixels[x, y]
                    if a > 0:
                        pixels[x, y] = (int(r * 0.45), int(g * 0.45), int(b * 0.45), a)
                        
    return img

def create_perfect_hover(base_name, texture_name, dest_name):
    base_path = os.path.join(DEST_DIR, base_name)
    tex_path = os.path.join(DEST_DIR, texture_name)
    dest_path = os.path.join(DEST_DIR, dest_name)
    
    if not os.path.exists(base_path) or not os.path.exists(tex_path):
        print(f"Error: Missing {base_path} or {tex_path}")
        return
        
    base_img = Image.open(base_path).convert("RGBA")
    tex_img = Image.open(tex_path).convert("RGBA")
    
    # 1. Transfer crumpled wrinkles from texture image to base image
    textured_img = apply_texture_transfer(base_img, tex_img)
    
    # 2. Apply a clean folded corner on the top-right
    folded_img = fold_top_right_corner(textured_img, S=65, shadow_width=20)
    
    folded_img.save(dest_path, "PNG")
    print(f"Saved perfect hover card to: {dest_path}. Size: {folded_img.size}")

def main():
    configs = [
        ("blogger_paper_lime.png", "service_paper_lime_hover.png", "blogger_paper_lime_hover.png"),
        ("blogger_paper_pink.png", "service_paper_pink_hover.png", "blogger_paper_pink_hover.png"),
        ("blogger_paper_white.png", "service_paper_white_hover.png", "blogger_paper_white_hover.png")
    ]
    for base, tex, dest in configs:
        create_perfect_hover(base, tex, dest)

if __name__ == "__main__":
    main()
