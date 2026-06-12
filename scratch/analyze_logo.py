from PIL import Image
import numpy as np

img = Image.open('public/images/rage_logo_uploaded.png')
alpha = np.array(img.split()[-1])

# Find non-zero columns and rows
non_zero_rows = np.where(alpha.any(axis=1))[0]
non_zero_cols = np.where(alpha.any(axis=0))[0]

if len(non_zero_rows) > 0 and len(non_zero_cols) > 0:
    ymin, ymax = non_zero_rows[0], non_zero_rows[-1]
    xmin, xmax = non_zero_cols[0], non_zero_cols[-1]
    print(f"Bounding box of content: y:({ymin}, {ymax}), x:({xmin}, {xmax})")
    print(f"Content size: {xmax-xmin}x{ymax-ymin}")
else:
    print("No non-zero alpha content found.")
