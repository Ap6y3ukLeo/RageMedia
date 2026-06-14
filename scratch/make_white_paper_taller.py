from PIL import Image
import os

base_dir = r"h:\RageMedia\RageMedia\public\images"
artifacts_dir = r"C:\Users\A6Leo\.gemini\antigravity-ide\brain\2befbe8f-a854-478e-85f3-b4fcaabc7b17"

def resize_white_paper(filename):
    path = os.path.join(base_dir, filename)
    if os.path.exists(path):
        img = Image.open(path).convert("RGBA")
        # Resize to width, 160 height using LANCZOS/BICUBIC
        resized = img.resize((img.width, 160), Image.Resampling.LANCZOS)
        resized.save(path, "PNG")
        print(f"Resized {filename} to {resized.size}")
        
        # Also copy to artifacts if it's the base normal image
        if filename == "service_paper_white.png":
            resized.save(os.path.join(artifacts_dir, "service_paper_white_processed.png"), "PNG")
            print("Saved copy to artifacts as service_paper_white_processed.png")
    else:
        print(f"{filename} does not exist!")

resize_white_paper("service_paper_white.png")
resize_white_paper("service_paper_white_hover.png")
