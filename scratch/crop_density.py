from PIL import Image
import os

def crop_by_density(image_path, threshold_percent=0.01):
    print(f"\n--- Processing {image_path} ---")
    if not os.path.exists(image_path):
        print(f"File {image_path} does not exist!")
        return

    img = Image.open(image_path).convert("RGBA")
    width, height = img.size
    
    # Calculate non-transparent pixel counts for each row and column
    row_counts = [0] * height
    col_counts = [0] * width
    
    for y in range(height):
        for x in range(width):
            r, g, b, a = img.getpixel((x, y))
            if a > 10: # not fully transparent
                row_counts[y] += 1
                col_counts[x] += 1
                
    # Find bounding box based on threshold
    row_threshold = width * threshold_percent
    col_threshold = height * threshold_percent
    
    # Find top, bottom
    top = 0
    while top < height and row_counts[top] < row_threshold:
        top += 1
        
    bottom = height - 1
    while bottom >= 0 and row_counts[bottom] < row_threshold:
        bottom -= 1
        
    # Find left, right
    left = 0
    while left < width and col_counts[left] < col_threshold:
        left += 1
        
    right = width - 1
    while right >= 0 and col_counts[right] < col_threshold:
        right -= 1
        
    if top < bottom and left < right:
        cropped_img = img.crop((left, top, right + 1, bottom + 1))
        # Save it
        cropped_img.save(image_path, "PNG")
        print(f"Cropped from {width}x{height} to {cropped_img.size} (left={left}, top={top}, right={right}, bottom={bottom})")
    else:
        print(f"Failed to find valid crop boundaries for {image_path}!")

if __name__ == "__main__":
    crop_by_density("public/images/lime_torn_paper.png", threshold_percent=0.02)
    crop_by_density("public/images/pink_torn_paper.png", threshold_percent=0.02)
    crop_by_density("public/images/white_torn_paper.png", threshold_percent=0.02)
