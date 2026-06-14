from PIL import Image
import numpy as np

img_path = r"h:\RageMedia\RageMedia\public\images\hero_megaphone_no_rage.png"
img = Image.open(img_path).convert("RGBA")
data = np.array(img)
width, height = img.size

# Region of interest for the watermark
# x in [2100, width], y in [1200, height]
opaque_pixels = []
for y in range(1200, height):
    for x in range(2100, width):
        r, g, b, a = data[y, x]
        if a > 0:
            opaque_pixels.append((x, y))

region_h = height - 1200
region_w = width - 2100
grid = np.zeros((region_h, region_w), dtype=bool)
for x, y in opaque_pixels:
    grid[y - 1200, x - 2100] = True

visited = np.zeros((region_h, region_w), dtype=bool)
components = []

for r in range(region_h):
    for c in range(region_w):
        if grid[r, c] and not visited[r, c]:
            comp = []
            queue = [(r, c)]
            visited[r, c] = True
            
            while queue:
                curr_r, curr_c = queue.pop(0)
                comp.append((curr_c + 2100, curr_r + 1200))
                
                for dr in [-1, 0, 1]:
                    for dc in [-1, 0, 1]:
                        if dr == 0 and dc == 0:
                            continue
                        nr, nc = curr_r + dr, curr_c + dc
                        if 0 <= nr < region_h and 0 <= nc < region_w:
                            if grid[nr, nc] and not visited[nr, nc]:
                                visited[nr, nc] = True
                                queue.append((nr, nc))
            components.append(comp)

components.sort(key=len, reverse=True)
for i, comp in enumerate(components[:20]):
    xs = [p[0] for p in comp]
    ys = [p[1] for p in comp]
    min_x, max_x = min(xs), max(xs)
    min_y, max_y = min(ys), max(ys)
    print(f"Component {i+1}: Size = {len(comp)}, bounding box: x=[{min_x}, {max_x}], y=[{min_y}, {max_y}]")
