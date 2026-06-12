import os
import numpy as np
from PIL import Image

def worley_noise(width, height, num_points):
    # Seed for reproducibility
    np.random.seed(num_points * 7 + 13)
    points = np.random.rand(num_points, 2)
    points[:, 0] *= width
    points[:, 1] *= height
    
    # Grid of pixels
    x = np.arange(width)
    y = np.arange(height)
    xv, yv = np.meshgrid(x, y)
    
    pixels = np.stack([xv.ravel(), yv.ravel()], axis=1) # (W*H, 2)
    
    # Compute distances to all points.
    # To prevent memory bloat, we process in chunks of rows
    chunk_size = 20000
    f1_list = []
    f2_list = []
    
    for start in range(0, len(pixels), chunk_size):
        chunk = pixels[start:start+chunk_size]
        # shape: (chunk_size, num_points)
        dists = np.sqrt(np.sum((chunk[:, np.newaxis, :] - points[np.newaxis, :, :])**2, axis=2))
        sorted_dists = np.sort(dists, axis=1)
        f1_list.append(sorted_dists[:, 0])
        f2_list.append(sorted_dists[:, 1])
        
    f1 = np.concatenate(f1_list)
    f2 = np.concatenate(f2_list)
    
    edge = f2 - f1
    return edge.reshape(height, width)

def crumple_image(input_path, output_path, displacement_scale=20.0, shading_strength=0.75):
    print(f"Processing: {input_path}")
    # Load image
    img_pil = Image.open(input_path).convert("RGBA")
    W, H = img_pil.size
    img = np.array(img_pil, dtype=np.float32)
    
    # Generate multi-octave Worley noise for realistic creases
    print("Generating creases...")
    h1 = worley_noise(W, H, 12)  # Major folds
    h2 = worley_noise(W, H, 35)  # Medium folds
    h3 = worley_noise(W, H, 80)  # Fine wrinkles
    
    # Normalize octaves
    h1 = (h1 - h1.min()) / (h1.max() - h1.min() + 1e-6)
    h2 = (h2 - h2.min()) / (h2.max() - h2.min() + 1e-6)
    h3 = (h3 - h3.min()) / (h3.max() - h3.min() + 1e-6)
    
    # Combined heightmap: sharper ridges by taking (1.0 - edge)
    heightmap = 0.5 * (1.0 - h1) + 0.35 * (1.0 - h2) + 0.15 * (1.0 - h3)
    # Enhance contrast of the ridges
    heightmap = np.power(heightmap, 2.0)
    
    # Compute gradients (normals)
    dy, dx = np.gradient(heightmap)
    
    # Displace coordinates to warp edges
    print("Applying coordinate displacement...")
    x = np.arange(W)
    y = np.arange(H)
    xv, yv = np.meshgrid(x, y)
    
    map_x = xv - dx * displacement_scale
    map_y = yv - dy * displacement_scale
    
    map_x = np.clip(map_x, 0, W - 1 - 1e-5)
    map_y = np.clip(map_y, 0, H - 1 - 1e-5)
    
    x0 = np.floor(map_x).astype(np.int32)
    x1 = x0 + 1
    y0 = np.floor(map_y).astype(np.int32)
    y1 = y0 + 1
    
    wa = (x1 - map_x) * (y1 - map_y)
    wb = (map_x - x0) * (y1 - map_y)
    wc = (x1 - map_x) * (map_y - y0)
    wd = (map_x - x0) * (map_y - y0)
    
    # Interpolate displaced image channels
    displaced_img = np.zeros_like(img)
    for c in range(4):
        c_img = img[:, :, c]
        displaced_img[:, :, c] = (
            c_img[y0, x0] * wa +
            c_img[y0, x1] * wb +
            c_img[y1, x0] * wc +
            c_img[y1, x1] * wd
        )
    
    # Recalculate shading normals from the displaced heightmap for accurate shadows
    displaced_heightmap = np.zeros_like(heightmap)
    displaced_heightmap = (
        heightmap[y0, x0] * wa +
        heightmap[y0, x1] * wb +
        heightmap[y1, x0] * wc +
        heightmap[y1, x1] * wd
    )
    
    dy_disp, dx_disp = np.gradient(displaced_heightmap)
    
    # Lighting model
    print("Shading 3D folds...")
    # Adjust normal strength
    normal_strength = 25.0
    nx = -dx_disp * normal_strength
    ny = -dy_disp * normal_strength
    nz = np.ones_like(nx)
    
    length = np.sqrt(nx**2 + ny**2 + nz**2)
    nx /= length
    ny /= length
    nz /= length
    
    # Light direction: top-left
    lx, ly, lz = -1.0, -1.0, 1.8
    l_len = np.sqrt(lx**2 + ly**2 + lz**2)
    lx, ly, lz = lx/l_len, ly/l_len, lz/l_len
    
    # Dot product
    dot = nx * lx + ny * ly + nz * lz
    
    # Ambient and diffuse
    ambient = 0.50
    diffuse = 0.50
    shading = ambient + diffuse * np.clip(dot, 0, 1)
    
    # Specular highlights (for slight paper sheen)
    hx, hy, hz = lx, ly, lz + 1.0
    h_len = np.sqrt(hx**2 + hy**2 + hz**2)
    hx, hy, hz = hx/h_len, hy/h_len, hz/h_len
    spec_dot = nx * hx + ny * hy + nz * hz
    specular = 0.12 * (np.clip(spec_dot, 0, 1) ** 24)
    
    shading_factor = shading + specular
    # Scale shading strength
    shading_factor = 1.0 + (shading_factor - 1.0) * shading_strength
    
    # Apply shading to RGB channels only
    shaded_img = displaced_img.copy()
    for c in range(3):
        shaded_img[:, :, c] = np.clip(displaced_img[:, :, c] * shading_factor, 0, 255)
        
    # Keep transparency where alpha is very low or 0
    # Also clip alpha channel
    shaded_img[:, :, 3] = np.clip(displaced_img[:, :, 3], 0, 255)
    
    # Save output
    out_pil = Image.fromarray(shaded_img.astype(np.uint8))
    out_pil.save(output_path, "PNG")
    print(f"Successfully saved to: {output_path}")

if __name__ == "__main__":
    base_dir = r"h:\RageMedia\RageMedia\public\images"
    
    files = [
        ("lime_torn_paper.png", "lime_torn_paper_hover.png", 22.0, 0.70),
        ("pink_torn_paper.png", "pink_torn_paper_hover.png", 24.0, 0.75),
        ("white_torn_paper.png", "white_torn_paper_hover.png", 20.0, 0.65)
    ]
    
    for src, dst, disp_s, shad_s in files:
        src_path = os.path.join(base_dir, src)
        dst_path = os.path.join(base_dir, dst)
        if os.path.exists(src_path):
            crumple_image(src_path, dst_path, displacement_scale=disp_s, shading_strength=shad_s)
        else:
            print(f"Source file not found: {src_path}")
