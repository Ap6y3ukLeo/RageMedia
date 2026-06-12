from PIL import Image

def check_image_opacity(image_path):
    img = Image.open(image_path).convert("RGBA")
    width, height = img.size
    print(f"\n--- Checking {image_path} ({width}x{height}) ---")
    
    # Check the corners and edges
    corners = [
        ("Top-Left", 0, 0),
        ("Top-Right", width - 1, 0),
        ("Bottom-Left", 0, height - 1),
        ("Bottom-Right", width - 1, height - 1),
        ("Center-Top", width // 2, 5),
        ("Center-Bottom", width // 2, height - 6),
    ]
    for name, x, y in corners:
        r, g, b, a = img.getpixel((x, y))
        print(f"{name} pixel at ({x},{y}): RGBA = ({r}, {g}, {b}, {a})")

if __name__ == "__main__":
    check_image_opacity("public/images/lime_torn_paper.png")
    check_image_opacity("public/images/pink_torn_paper.png")
    check_image_opacity("public/images/white_torn_paper.png")
