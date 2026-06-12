import os
from PIL import Image

def analyze_pink_distribution():
    img_path = 'public/images/pink_pixels_map.png'
    if not os.path.exists(img_path):
        return

    img = Image.open(img_path)
    W, H = img.size
    pixels = img.load()

    # Let's count pink pixels in grids of 100x100
    grid_size = 100
    grid_counts = {}

    for gy in range(0, H, grid_size):
        for gx in range(0, W, grid_size):
            count = 0
            for y in range(gy, min(gy + grid_size, H)):
                for x in range(gx, min(gx + grid_size, W)):
                    if pixels[x, y][3] > 0 and pixels[x, y][0] > 0:
                        count += 1
            if count > 100:
                grid_counts[(gx, gy)] = count

    # Print grids with high density of pink
    print("Grids with high pink pixel density:")
    for (gx, gy), count in sorted(grid_counts.items(), key=lambda item: item[1], reverse=True):
        print(f"Grid ({gx}, {gy}) to ({gx+grid_size}, {gy+grid_size}): count = {count}")

if __name__ == "__main__":
    analyze_pink_distribution()
