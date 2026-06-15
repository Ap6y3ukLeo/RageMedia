from PIL import Image
import os
import numpy as np

artifacts_dir = r"C:\Users\A6Leo\.gemini\antigravity-ide\brain\2befbe8f-a854-478e-85f3-b4fcaabc7b17"
files = [
    "media__1781527298478.png",
    "media__1781527302289.png",
    "media__1781527305792.png"
]

for f in files:
    path = os.path.join(artifacts_dir, f)
    if os.path.exists(path):
        img = Image.open(path).convert("RGB")
        data = np.array(img)
        # Calculate average RGB channels
        avg_r = np.mean(data[:, :, 0])
        avg_g = np.mean(data[:, :, 1])
        avg_b = np.mean(data[:, :, 2])
        print(f"{f}: size={img.size}, avg_color=({avg_r:.1f}, {avg_g:.1f}, {avg_b:.1f})")
        
        # Classify by color
        # Lime/Green: high G, lower B
        # Pink: high R and B, low G
        # White/Gray: R, G, B are similar and relatively high
        if avg_g > avg_b * 1.5:
            print("  -> Classification: LIME / GREEN CARD")
        elif avg_r > avg_g * 1.5 and avg_b > avg_g * 1.2:
            print("  -> Classification: PINK CARD")
        else:
            print("  -> Classification: WHITE / GRAY CARD")
    else:
        print(f"{f} does not exist!")
