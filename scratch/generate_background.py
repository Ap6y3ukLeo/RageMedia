import os
import random
import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont

def generate_noise_map(width, height, scale=0.5):
    # Generates standard Gaussian noise for paper fiber texture
    np.random.seed(42)
    noise = np.random.randn(height, width)
    noise = (noise - noise.min()) / (noise.max() - noise.min() + 1e-6)
    return noise

def get_noisy_rect(x, y, w, h, noise_amp=5.0, num_points=100):
    # Generates a polygon resembling a torn piece of paper with ragged edges
    points = []
    # Top edge
    for px in np.linspace(x, x + w, num_points // 4):
        points.append((px + random.uniform(-noise_amp, noise_amp), y + random.uniform(-noise_amp, noise_amp)))
    # Right edge
    for py in np.linspace(y, y + h, num_points // 4):
        points.append((x + w + random.uniform(-noise_amp, noise_amp), py + random.uniform(-noise_amp, noise_amp)))
    # Bottom edge
    for px in np.linspace(x + w, x, num_points // 4):
        points.append((px + random.uniform(-noise_amp, noise_amp), y + h + random.uniform(-noise_amp, noise_amp)))
    # Left edge
    for py in np.linspace(y + h, y, num_points // 4):
        points.append((x + random.uniform(-noise_amp, noise_amp), py + random.uniform(-noise_amp, noise_amp)))
    return points

def draw_graffiti_letter(draw, char, x, y, size, color, width=4):
    # Renders letters using stylized strokes to mimic graffiti marker tags
    s = size
    h = size
    w = size * 0.8
    
    lines = []
    if char == 'R':
        lines = [
            [(x, y + h), (x, y)], # Vertical stem
            [(x, y), (x + w, y), (x + w, y + h*0.5), (x, y + h*0.5)], # Loop
            [(x + w*0.3, y + h*0.5), (x + w, y + h)] # Leg
        ]
    elif char == 'A':
        lines = [
            [(x, y + h), (x + w*0.5, y), (x + w, y + h)], # Main frame
            [(x + w*0.25, y + h*0.6), (x + w*0.75, y + h*0.6)] # Bar
        ]
    elif char == 'G':
        lines = [
            [(x + w, y + h*0.2), (x + w*0.5, y), (x, y + h*0.5), (x + w*0.5, y + h), (x + w, y + h*0.8), (x + w, y + h*0.5), (x + w*0.5, y + h*0.5)]
        ]
    elif char == 'E':
        lines = [
            [(x + w, y), (x, y), (x, y + h), (x + w, y + h)], # Frame
            [(x, y + h*0.5), (x + w*0.7, y + h*0.5)] # Middle bar
        ]
    elif char == 'M':
        lines = [
            [(x, y + h), (x, y), (x + w*0.5, y + h*0.6), (x + w, y), (x + w, y + h)]
        ]
    elif char == 'E':
        lines = [
            [(x + w, y), (x, y), (x, y + h), (x + w, y + h)],
            [(x, y + h*0.5), (x + w*0.7, y + h*0.5)]
        ]
    elif char == 'D':
        lines = [
            [(x, y + h), (x, y), (x + w*0.7, y), (x + w, y + h*0.3), (x + w, y + h*0.7), (x + w*0.7, y + h), (x, y + h)]
        ]
    elif char == 'I':
        lines = [
            [(x + w*0.2, y), (x + w*0.8, y)],
            [(x + w*0.5, y), (x + w*0.5, y + h)],
            [(x + w*0.2, y + h), (x + w*0.8, y + h)]
        ]
    elif char == 'O':
        lines = [
            [(x + w*0.5, y), (x + w, y + h*0.5), (x + w*0.5, y + h), (x, y + h*0.5), (x + w*0.5, y)]
        ]
    elif char == 'L':
        lines = [
            [(x, y), (x, y + h), (x + w, y + h)]
        ]
    elif char == 'U':
        lines = [
            [(x, y), (x, y + h*0.8), (x + w*0.5, y + h), (x + w, y + h*0.8), (x + w, y)]
        ]
    elif char == 'P':
        lines = [
            [(x, y + h), (x, y), (x + w, y), (x + w, y + h*0.5), (x, y + h*0.5)]
        ]
    elif char == 'S':
        lines = [
            [(x + w, y + h*0.2), (x + w*0.5, y), (x, y + h*0.3), (x + w, y + h*0.7), (x + w*0.5, y + h), (x, y + h*0.8)]
        ]
    elif char == 'C':
        lines = [
            [(x + w, y + h*0.2), (x + w*0.5, y), (x, y + h*0.5), (x + w*0.5, y + h), (x + w, y + h*0.8)]
        ]
    elif char == 'Y':
        lines = [
            [(x, y), (x + w*0.5, y + h*0.5), (x + w, y)],
            [(x + w*0.5, y + h*0.5), (x + w*0.5, y + h)]
        ]
    elif char == 'T':
        lines = [
            [(x, y), (x + w, y)],
            [(x + w*0.5, y), (x + w*0.5, y + h)]
        ]
        
    for stroke in lines:
        draw.line(stroke, fill=color, width=width, joint='round')

def draw_graffiti_text(draw, text, start_x, start_y, size, color, width=4):
    cur_x = start_x
    for char in text:
        if char == ' ':
            cur_x += size * 0.5
        else:
            draw_graffiti_letter(draw, char, cur_x, start_y, size, color, width)
            cur_x += size * 0.9

def draw_crown(draw, x, y, size, color, width=3):
    w = size
    h = size * 0.8
    pts = [
        (x, y + h),
        (x + w * 0.1, y + h * 0.2),
        (x + w * 0.3, y + h * 0.5),
        (x + w * 0.5, y + h * 0.1),
        (x + w * 0.7, y + h * 0.5),
        (x + w * 0.9, y + h * 0.2),
        (x + w, y + h),
        (x, y + h)
    ]
    draw.polygon(pts, outline=color, fill=None, width=width)
    # Highlight dots on points
    draw.ellipse((x + w * 0.1 - 2, y + h * 0.2 - 2, x + w * 0.1 + 2, y + h * 0.2 + 2), fill=color)
    draw.ellipse((x + w * 0.5 - 2, y + h * 0.1 - 2, x + w * 0.5 + 2, y + h * 0.1 + 2), fill=color)
    draw.ellipse((x + w * 0.9 - 2, y + h * 0.2 - 2, x + w * 0.9 + 2, y + h * 0.2 + 2), fill=color)

def draw_lightning(draw, x, y, size, color, width=3):
    w = size * 0.6
    h = size
    pts = [
        (x + w * 0.5, y),
        (x + w, y + h * 0.4),
        (x + w * 0.6, y + h * 0.4),
        (x + w * 0.8, y + h),
        (x, y + h * 0.5),
        (x + w * 0.4, y + h * 0.5),
        (x + w * 0.5, y)
    ]
    draw.polygon(pts, outline=color, fill=None, width=width)

def draw_blot(draw, x, y, size, color):
    # Draws a main circular blot with small surrounding droplets
    r = size // 2
    draw.ellipse((x - r, y - r, x + r, y + r), fill=color)
    # Droplets
    for _ in range(random.randint(4, 9)):
        angle = random.uniform(0, 2 * np.pi)
        dist = random.uniform(r * 1.2, r * 2.2)
        drop_r = random.randint(2, 6)
        dx = int(dist * np.cos(angle))
        dy = int(dist * np.sin(angle))
        draw.ellipse((x + dx - drop_r, y + dy - drop_r, x + dx + drop_r, y + dy + drop_r), fill=color)
        # Dripping tail
        if random.random() > 0.4:
            tail_y = random.randint(5, 20)
            draw.line([(x + dx, y + dy), (x + dx, y + dy + tail_y)], fill=color, width=2)

def generate_background():
    print("Initializing background generation (2048x2048)...")
    W, H = 2048, 2048
    # Start with extremely deep, dark charcoal color matching cyberpunk grid base
    base_color = (8, 8, 8, 255)
    img = Image.new("RGBA", (W, H), base_color)
    draw = ImageDraw.Draw(img)
    
    # Draw faint cyber grid as a underlying technical layer
    grid_size = 64
    grid_color = (255, 255, 255, 6) # Very subtle white grid
    for x in range(0, W, grid_size):
        draw.line([(x, 0), (x, H)], fill=grid_color, width=1)
    for y in range(0, H, grid_size):
        draw.line([(0, y), (W, y)], fill=grid_color, width=1)
        
    # Draw scattered paper sheet outlines/decorations in the background
    random.seed(137)
    for _ in range(8):
        cx = random.randint(100, W - 400)
        cy = random.randint(100, H - 400)
        pw = random.randint(200, 450)
        ph = random.randint(150, 350)
        # Ragged paper coordinates
        pts = get_noisy_rect(cx, cy, pw, ph, noise_amp=6.0, num_points=60)
        # Draw transparent paper background
        paper_fill = random.choice([
            (172, 255, 42, 3),  # Extremely faint neon lime
            (255, 0, 255, 3),  # Extremely faint neon pink
            (255, 255, 255, 4)  # Extremely faint white
        ])
        paper_outline = (255, 255, 255, 8)
        
        # Rotate paper sheet manually (using a temporary image buffer to rotate cleanly)
        paper_buf = Image.new("RGBA", (W, H), (0, 0, 0, 0))
        p_draw = ImageDraw.Draw(paper_buf)
        p_draw.polygon(pts, fill=paper_fill, outline=paper_outline, width=1)
        
        angle = random.uniform(-15, 15)
        # Rotate around its center
        rotated = paper_buf.rotate(angle, center=(cx + pw//2, cy + ph//2), resample=Image.Resampling.BICUBIC)
        img = Image.alpha_composite(img, rotated)
        draw = ImageDraw.Draw(img)

    # Drawing graffiti doodles, tags and marks
    # We use RAGE green (#ACFF2A) and pink (#FF00FF) with low opacity (12-25) to be subtle backdrops
    accent_green = (172, 255, 42, 22)
    accent_pink = (255, 0, 255, 20)
    accent_white = (255, 255, 255, 16)
    
    # 1. Big tag words
    draw_graffiti_text(draw, "RAGE", 180, 150, 90, accent_green, width=6)
    draw_graffiti_text(draw, "MEDIA", 450, 210, 70, accent_white, width=4)
    
    draw_graffiti_text(draw, "LOUD", 1450, 450, 80, accent_pink, width=5)
    draw_graffiti_text(draw, "CREATIVE", 1250, 530, 60, accent_white, width=4)
    
    draw_graffiti_text(draw, "INFLUENCE", 250, 1150, 75, accent_pink, width=5)
    draw_graffiti_text(draw, "RAGE", 700, 1220, 85, accent_green, width=6)
    
    draw_graffiti_text(draw, "CAMPAIGN", 1300, 1500, 70, accent_green, width=5)
    draw_graffiti_text(draw, "MEDIA", 1550, 1580, 65, accent_white, width=4)
    
    # 2. Sketches and symbols
    # Crown drawings
    draw_crown(draw, 150, 270, 50, accent_pink, width=3)
    draw_crown(draw, 950, 680, 60, accent_green, width=3)
    draw_crown(draw, 1150, 1250, 55, accent_white, width=3)
    draw_crown(draw, 450, 1720, 50, accent_pink, width=3)
    
    # Lightning drawings
    draw_lightning(draw, 800, 180, 70, accent_pink, width=3)
    draw_lightning(draw, 120, 750, 60, accent_green, width=3)
    draw_lightning(draw, 1750, 1050, 80, accent_green, width=4)
    draw_lightning(draw, 900, 1550, 65, accent_white, width=3)
    
    # Ink Blots/Splatters
    draw_blot(draw, 400, 480, 45, accent_pink)
    draw_blot(draw, 1600, 250, 50, accent_green)
    draw_blot(draw, 850, 950, 55, accent_white)
    draw_blot(draw, 150, 1450, 40, accent_green)
    draw_blot(draw, 1200, 1800, 48, accent_pink)
    
    # Plus symbols and stars scattered
    for _ in range(15):
        sx = random.randint(100, W - 100)
        sy = random.randint(100, H - 100)
        size = random.randint(15, 30)
        col = random.choice([accent_green, accent_pink, accent_white])
        # Draw a little cross
        draw.line([(sx - size//2, sy), (sx + size//2, sy)], fill=col, width=2)
        draw.line([(sx, sy - size//2), (sx, sy + size//2)], fill=col, width=2)
        
    # Circle tags around some texts
    draw.arc([160, 130, 900, 320], start=0, end=360, fill=accent_green, width=2)
    draw.arc([1230, 430, 1800, 610], start=-30, end=330, fill=accent_pink, width=2)
    draw.arc([230, 1130, 1020, 1320], start=10, end=370, fill=accent_white, width=2)

    # Let's apply a subtle crumple texture shading to the background itself to make it feel like poster paper
    print("Applying global paper fiber and crumple shading...")
    # Generate heightmap for background paper texture
    np_img = np.array(img, dtype=np.float32)
    
    # Worley noise creases
    W_n = 2048
    H_n = 2048
    h1 = generate_noise_map(W_n, H_n)
    
    # Add high frequency paper grain noise
    grain = np.random.rand(H_n, W_n) * 0.08
    
    # Lighting factor
    dy, dx = np.gradient(h1 + grain)
    nx = -dx * 8.0
    ny = -dy * 8.0
    nz = np.ones_like(nx)
    
    length = np.sqrt(nx**2 + ny**2 + nz**2)
    nx /= length
    ny /= length
    nz /= length
    
    # Top-left light source
    lx, ly, lz = -1.0, -1.0, 2.5
    l_len = np.sqrt(lx**2 + ly**2 + lz**2)
    lx, ly, lz = lx/l_len, ly/l_len, lz/l_len
    
    dot = nx * lx + ny * ly + nz * lz
    shading = 0.90 + 0.15 * np.clip(dot, 0, 1) # very subtle shading factor between 0.9 and 1.05
    
    for c in range(3):
        np_img[:, :, c] = np.clip(np_img[:, :, c] * shading, 0, 255)
        
    out_img = Image.fromarray(np_img.astype(np.uint8))
    
    # Apply a light Gaussian blur to the background details to merge them smoothly into the dark atmosphere
    out_img = out_img.filter(ImageFilter.GaussianBlur(1.0))
    
    # Save the background file
    public_images_dir = r"h:\RageMedia\RageMedia\public\images"
    os.makedirs(public_images_dir, exist_ok=True)
    dst_path = os.path.join(public_images_dir, "site_background.png")
    out_img.save(dst_path, "PNG")
    print(f"Site background generated successfully and saved to: {dst_path}")

if __name__ == "__main__":
    generate_background()
