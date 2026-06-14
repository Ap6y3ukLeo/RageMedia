from PIL import Image, ImageDraw
import os

img_path = r"C:\Users\A6Leo\Downloads\Gemini_Generated_Image_etwphketwphketwp.png"
img = Image.open(img_path).convert("RGBA")
width, height = img.size

# We will perform floodfill from the four corners:
# (0, 0), (width-1, 0), (0, height-1), (width-1, height-1)
# Since we want to make the filled area transparent, we can use a temporary color, say (0, 255, 0, 0)
# or we can flood fill on a mask.
# Let's floodfill on a mask first to see what pixels are background.

# Create a grayscale mask (initialized to white/255, meaning keep)
mask = Image.new("L", (width, height), 255)
draw = ImageDraw.Draw(mask)

# Seed points at the corners and along the edges if needed
seeds = [
    (0, 0),
    (width - 1, 0),
    (0, height - 1),
    (width - 1, height - 1),
    (width // 2, 0),
    (0, height // 2),
    (width - 1, height // 2),
    (width // 2, height - 1)
]

# The background color is around (0, 0, 0). Let's flood fill the mask with black (0, meaning transparent)
# for any pixel that is connected to the seeds and has RGB value close to the seed.
# We'll try different tolerances (thresholds). Let's use 35 as a starting point.
tolerance = 45

for seed in seeds:
    # We flood fill on the mask. To do this, we need to base the fill decisions on the original image,
    # but Pillow's floodfill only inspects the image it is drawing on.
    # So we can create a temporary copy of the original image, flood fill the background there with a distinct color,
    # and then create a mask from that distinct color!
    pass

# Let's do the distinct color method.
# We will use a color that doesn't appear in the image, e.g. bright green (0, 255, 0, 255)
# or we can just use (0, 0, 0, 0) directly if we floodfill on the image itself!
# Wait, if we flood fill with transparent (0, 0, 0, 0) directly on the image, the seed pixel color changes.
# Pillow's floodfill needs the seed color to match the target. If we change it, the floodfill might stop or behave weirdly.
# So it's best to flood fill on a copy of the image with a solid color like (0, 255, 0, 255).
temp_img = img.copy()
temp_draw = ImageDraw.Draw(temp_img)

fill_color = (0, 255, 0, 255) # Bright green

for seed in seeds:
    # Get current color of seed in temp_img. If it's already green, skip
    current_color = temp_img.getpixel(seed)
    if current_color == fill_color:
        continue
    # Floodfill with green
    ImageDraw.floodfill(temp_img, seed, fill_color, thresh=tolerance)

# Now, create the final image by copying pixels from original image,
# making them transparent if they became bright green in temp_img.
img_data = img.getdata()
temp_data = temp_img.getdata()
new_data = []

for orig_pixel, temp_pixel in zip(img_data, temp_data):
    if temp_pixel == fill_color:
        # Make transparent
        new_data.append((0, 0, 0, 0))
    else:
        new_data.append(orig_pixel)

final_img = Image.new("RGBA", (width, height))
final_img.putdata(new_data)

# Let's save the final image in the public images folder
output_path = r"h:\RageMedia\RageMedia\public\images\hero_megaphone_no_rage.png"
final_img.save(output_path, "PNG")

# Also save a copy to the brain folder for the user / walkthrough preview
artifacts_dir = r"C:\Users\A6Leo\.gemini\antigravity-ide\brain\2befbe8f-a854-478e-85f3-b4fcaabc7b17"
artifacts_output_path = os.path.join(artifacts_dir, "hero_megaphone_no_rage_processed.png")
final_img.save(artifacts_output_path, "PNG")

print(f"Background removed successfully with tolerance {tolerance}.")
print(f"Saved to: {output_path}")
print(f"Saved to: {artifacts_output_path}")
