from PIL import Image
import numpy as np

img_path = r"h:\RageMedia\RageMedia\public\images\hero_megaphone_no_rage.png"
img = Image.open(img_path).convert("RGBA")
data = np.array(img)
width, height = img.size

# Let's inspect all opaque pixels in the bottom right corner:
# x in [1800, width], y in [1000, height]
opaque_pixels = []
for y in range(1000, height):
    for x in range(1800, width):
        r, g, b, a = data[y, x]
        if a > 0:
            opaque_pixels.append((x, y))

print(f"Total opaque pixels in bottom-right region (x >= 1800, y >= 1000): {len(opaque_pixels)}")

# Find connected components of opaque pixels in this region.
# We can represent them as a grid and do BFS/DFS.
region_h = height - 1000
region_w = width - 1800
grid = np.zeros((region_h, region_w), dtype=bool)
for x, y in opaque_pixels:
    grid[y - 1000, x - 1800] = True

visited = np.zeros((region_h, region_w), dtype=bool)
components = []

for r in range(region_h):
    for c in range(region_w):
        if grid[r, c] and not visited[r, c]:
            # Start BFS
            comp = []
            queue = [(r, c)]
            visited[r, c] = True
            
            while queue:
                curr_r, curr_c = queue.pop(0)
                comp.append((curr_c + 1800, curr_r + 1000))
                
                # Check 8 neighbors
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

print(f"Found {len(components)} connected components.")
# Sort components by size (number of pixels) descending
components.sort(key=len, reverse=True)
for i, comp in enumerate(components[:10]):
    xs = [p[0] for p in comp]
    ys = [p[1] for p in comp]
    min_x, max_x = min(xs), max(xs)
    min_y, max_y = min(ys), max(ys)
    print(f"Component {i+1}: Size = {len(comp)}, bounding box: x=[{min_x}, {max_x}], y=[{min_y}, {max_y}]")
