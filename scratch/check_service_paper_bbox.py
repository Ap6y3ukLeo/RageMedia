from PIL import Image
import numpy as np

files = [
    "service_paper_lime.png",
    "service_paper_pink.png",
    "service_paper_white.png"
]

for filename in files:
    path = f"h:\\RageMedia\\RageMedia\\public\\images\\{filename}"
    img = Image.open(path)
    data = np.array(img)
    # Find all alpha > 0 coordinates
    y_indices, x_indices = np.where(data[:, :, 3] > 0)
    if len(x_indices) > 0:
        min_x, max_x = x_indices.min(), x_indices.max()
        min_y, max_y = y_indices.min(), y_indices.max()
        print(f"{filename}: size={img.size}, bounding box: x=[{min_x}, {max_x}], y=[{min_y}, {max_y}] (paper height={max_y - min_y + 1})")
    else:
        print(f"{filename}: No non-transparent pixels found!")
