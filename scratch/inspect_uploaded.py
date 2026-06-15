from PIL import Image
import numpy as np
import os

filepath = r"h:\RageMedia\RageMedia\public\images\New white card.png"
if os.path.exists(filepath):
    img = Image.open(filepath).convert("RGBA")
    data = np.array(img)
    print(f"Image shape: {data.shape}")
    
    # Check corners
    corners = [
        data[0, 0],
        data[0, -1],
        data[-1, 0],
        data[-1, -1]
    ]
    print(f"Corners: {corners}")
    
    # Let's see if there are transparent pixels or if it's solid black/dark
    a_channel = data[:, :, 3]
    num_transparent = np.sum(a_channel == 0)
    print(f"Transparent pixels: {num_transparent} ({num_transparent / a_channel.size * 100:.2f}%)")
    
    # If no transparent pixels, let's see how dark the background is
    brightness = np.maximum(np.maximum(data[:, :, 0], data[:, :, 1]), data[:, :, 2])
    print(f"Average brightness: {brightness.mean():.1f}")
    print(f"Min brightness: {brightness.min():.1f}")
    print(f"Max brightness: {brightness.max():.1f}")
else:
    print("File not found")
