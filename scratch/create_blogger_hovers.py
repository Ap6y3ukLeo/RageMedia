import os
from PIL import Image

DEST_DIR = r"h:\RageMedia\RageMedia\public\images"

def draw_crease(pixels, w, h, p1, p2, width=3.0, strength=0.15):
    # Line equation: ax + by + c = 0
    x1, y1 = p1
    x2, y2 = p2
    
    a = y2 - y1
    b = x1 - x2
    c = x2*y1 - x1*y2
    
    norm = (a*a + b*b) ** 0.5
    if norm == 0:
        return
    a /= norm
    b /= norm
    c /= norm
    
    for x in range(w):
        for y in range(h):
            r, g, b_val, alpha = pixels[x, y]
            if alpha == 0:
                continue
                
            dist = a*x + b*y + c
            if abs(dist) <= width:
                # Emboss factor: positive dist gets lighter, negative gets darker
                factor = 1.0 + strength * (dist / width)
                
                nr = min(255, max(0, int(r * factor)))
                ng = min(255, max(0, int(g * factor)))
                nb = min(255, max(0, int(b_val * factor)))
                
                pixels[x, y] = (nr, ng, nb, alpha)

def create_hover_card(src_name, dest_name):
    src_path = os.path.join(DEST_DIR, src_name)
    dest_path = os.path.join(DEST_DIR, dest_name)
    
    if not os.path.exists(src_path):
        print(f"Error: {src_path} not found!")
        return
        
    img = Image.open(src_path).convert("RGBA")
    pixels = img.load()
    w, h = img.size
    
    # 1. Draw some creases to make it look crumpled/creased
    # Crease 1: left-to-middle diagonal
    draw_crease(pixels, w, h, (int(w * 0.3), 0), (0, int(h * 0.7)), width=8.0, strength=0.18)
    # Crease 2: right-to-middle diagonal
    draw_crease(pixels, w, h, (int(w * 0.7), h), (w, int(h * 0.3)), width=8.0, strength=0.18)
    # Crease 3: subtle horizontal crease
    draw_crease(pixels, w, h, (0, int(h * 0.5)), (w, int(h * 0.6)), width=10.0, strength=0.12)

    # 2. Fold the bottom-right corner
    # Fold size (increased to be highly visible on screen)
    S = 100
    shadow_width = 30
    
    for x in range(w):
        for y in range(h):
            # Coordinates relative to bottom-right corner
            # We check if pixel is in the bottom-right zone
            if x >= w - S - shadow_width and y >= h - S - shadow_width:
                # Is it in the cut-off corner area? (x + y > w + h - S)
                if x >= w - S and y >= h - S and (x + y) > (w + h - S):
                    # Cut off: make transparent
                    pixels[x, y] = (0, 0, 0, 0)
                # Is it in the folded-back triangle area?
                elif x >= w - S and y >= h - S and (x + y) <= (w + h - S):
                    # Mirror source coordinates
                    x_src = w + h - S - y
                    y_src = w + h - S - x
                    # Clamp coordinates safely
                    x_src = min(w - 1, max(0, x_src))
                    y_src = min(h - 1, max(0, y_src))
                    
                    r, g, b_val, a = pixels[x_src, y_src]
                    if a > 0:
                        # Make the folded back side look darker/shadowed (0.72x brightness)
                        nr = int(r * 0.72)
                        ng = int(g * 0.72)
                        nb = int(b_val * 0.72)
                        pixels[x, y] = (nr, ng, nb, a)
                # Drop shadow on the paper side
                else:
                    d = (w + h - S) - (x + y)
                    if 0 < d <= shadow_width:
                        # Multiply pixel color by gradient shadow multiplier
                        mult = 0.55 + 0.45 * (d / shadow_width)
                        r, g, b_val, a = pixels[x, y]
                        if a > 0:
                            nr = int(r * mult)
                            ng = int(g * mult)
                            nb = int(b_val * mult)
                            pixels[x, y] = (nr, ng, nb, a)
                            
            # Add a crease line along the fold diagonal
            if x >= w - S and y >= h - S:
                diff = abs((x + y) - (w + h - S))
                if diff <= 1.5:
                    r, g, b_val, a = pixels[x, y]
                    if a > 0:
                        # Crease line is dark
                        pixels[x, y] = (int(r * 0.5), int(g * 0.5), int(b_val * 0.5), a)

    img.save(dest_path, "PNG")
    print(f"Generated hover card: {dest_path}")

def main():
    cards = [
        ("blogger_paper_lime.png", "blogger_paper_lime_hover.png"),
        ("blogger_paper_pink.png", "blogger_paper_pink_hover.png"),
        ("blogger_paper_white.png", "blogger_paper_white_hover.png")
    ]
    for src, dest in cards:
        create_hover_card(src, dest)

if __name__ == "__main__":
    main()
