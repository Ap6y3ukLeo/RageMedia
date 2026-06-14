from PIL import Image
import numpy as np

img_path = r"h:\RageMedia\RageMedia\public\images\pink_torn_paper.png"
img = Image.open(img_path)
data = np.array(img)
width, height = img.size

# Find all coordinates where alpha > 0
y_indices, x_indices = np.where(data[:, :, 3] > 0)
if len(x_indices) > 0:
    min_x, max_x = x_indices.min(), x_indices.max()
    min_y, max_y = y_indices.min(), y_indices.max()
    print(f"Alpha > 0 bounding box: x=[{min_x}, {max_x}], y=[{min_y}, {max_y}] (size={(max_x - min_x + 1)}x{(max_y - min_y + 1)})")
else:
    print("No alpha > 0 pixels found!")

# Let's see if there are very bright pixels (the pink paper itself)
# Pink paper has high R and B, let's check max(R, G, B) > 100
bright_y, bright_x = np.where((data[:, :, 0] > 100) | (data[:, :, 2] > 100))
if len(bright_x) > 0:
    b_min_x, b_max_x = bright_x.min(), bright_x.max()
    b_min_y, b_max_y = bright_y.min(), bright_y.max()
    print(f"Bright pixels bounding box: x=[{b_min_x}, {b_max_x}], y=[{b_min_y}, {b_max_y}] (size={(b_max_x - b_min_x + 1)}x{(b_max_y - b_min_y + 1)})")
else:
    print("No bright pixels found!")
