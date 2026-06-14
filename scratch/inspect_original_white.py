import os
from PIL import Image

artifacts_dir = r"C:\Users\A6Leo\.gemini\antigravity-ide\brain\2befbe8f-a854-478e-85f3-b4fcaabc7b17"
files = [f for f in os.listdir(artifacts_dir) if f.startswith("service_paper_white") and f.endswith(".png")]

for f in files:
    img = Image.open(os.path.join(artifacts_dir, f))
    print(f"{f}: size={img.size}")
