from PIL import Image
import os

src_path = r"h:\RageMedia\RageMedia\public\images\rage_logo_uploaded.png"
if not os.path.exists(src_path):
    print("Logo not found!")
    exit(1)

# Load the image
img = Image.open(src_path).convert("RGBA")

# Crop to content bounding box to remove empty space
bbox = img.getbbox()  # returns (left, upper, right, lower)
if bbox:
    cropped = img.crop(bbox)
    w, h = cropped.size
    
    # Create a square canvas of size max(w, h)
    side = max(w, h)
    # Add a small padding (5% of the side length) to keep it breathing
    padding = int(side * 0.05)
    canvas_side = side + 2 * padding
    
    # Create transparent square canvas
    canvas = Image.new("RGBA", (canvas_side, canvas_side), (0, 0, 0, 0))
    
    # Center the cropped image on the canvas
    offset_x = (canvas_side - w) // 2
    offset_y = (canvas_side - h) // 2
    canvas.paste(cropped, (offset_x, offset_y), cropped)
    
    # Save as favicon.ico with multi-resolution support (16x16, 32x32, 48x48, 256x256)
    ico_sizes = [(16, 16), (32, 32), (48, 48), (256, 256)]
    ico_images = [canvas.resize(size, Image.Resampling.LANCZOS) for size in ico_sizes]
    
    # Save to public directory
    public_dir = r"h:\RageMedia\RageMedia\public"
    ico_path = os.path.join(public_dir, "favicon.ico")
    ico_images[0].save(ico_path, format="ICO", append_images=ico_images[1:])
    print(f"Saved multi-resolution favicon.ico to {ico_path}")
    
    # Save a standard PNG version as well
    png_path = os.path.join(public_dir, "favicon.png")
    canvas.resize((32, 32), Image.Resampling.LANCZOS).save(png_path, "PNG")
    print(f"Saved favicon.png to {png_path}")
else:
    print("Empty image, cannot crop.")
