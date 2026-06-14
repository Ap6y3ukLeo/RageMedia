from PIL import Image
import numpy as np

def get_average_color(img_path):
    img = Image.open(img_path).convert("RGBA")
    data = np.array(img)
    # Get only non-transparent pixels (alpha > 50)
    opaque = data[data[:, :, 3] > 50]
    if len(opaque) == 0:
        return (0, 0, 0)
    # Average of RGB channels
    avg_r = np.mean(opaque[:, 0])
    avg_g = np.mean(opaque[:, 1])
    avg_b = np.mean(opaque[:, 2])
    return (avg_r, avg_g, avg_b)

case_color = get_average_color(r"h:\RageMedia\RageMedia\public\images\case_paper_pink.png")
stats_color = get_average_color(r"h:\RageMedia\RageMedia\public\images\pink_torn_paper.png")

print(f"Case paper pink average color: {case_color}")
print(f"Stats paper pink average color: {stats_color}")
