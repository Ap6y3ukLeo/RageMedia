from PIL import Image
import numpy as np

original_path = r"C:\Users\A6Leo\Downloads\Gemini_Generated_Image_etwphketwphketwp.png"
img = Image.open(original_path).convert("RGBA")
data = np.array(img)
width, height = img.size

# Bottom-right corner analysis: x in [2000, width], y in [1200, height]
# Let's group non-black pixels (R > 30 or G > 30 or B > 30) into connected components.
opaque_pixels = []
for y in range(1200, height):
    for x in range(2000, width):
        r, g, b, a = data[y, x]
        if r > 30 or g > 30 or b > 30:
            opaque_pixels.append((x, y))

region_h = height - 1200
region_w = width - 2000
grid = np.zeros((region_h, region_w), dtype=bool)
for x, y in opaque_pixels:
    grid[y - 1200, x - 2000] = True

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
                comp.append((curr_c + 2000, curr_r + 1200))
                
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
print(f"Found {len(components)} components in original image.")
for i, comp in enumerate(components[:15]):
    xs = [p[0] for p in comp]
    ys = [p[1] for p in comp]
    min_x, max_x = min(xs), max(xs)
    min_y, max_y = min(ys), max(ys)
    # Check if there are colorful pixels (e.g. R, G, B difference is high, or it matches pink)
    pink_count = 0
    for x, y in comp:
        r, g, b, a = data[y, x]
        # Pink watermark is usually high R and B compared to G
        if r > 150 and b > 100 and g < 100:
            pink_count += 1
            
    print(f"Component {i+1}: Size = {len(comp)}, bounding box: x=[{min_x}, {max_x}], y=[{min_y}, {max_y}], pink_pixels={pink_count}")
