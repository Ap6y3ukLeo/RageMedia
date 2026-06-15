import os
from PIL import Image

public_dir = r"h:\RageMedia\RageMedia\public\images"

def batch_convert():
    print("Starting batch conversion of images to WebP (quality=80%)...")
    total_original_size = 0
    total_webp_size = 0
    converted_count = 0
    
    # Supported formats to convert
    valid_exts = (".png", ".jpg", ".jpeg")
    
    # We walk through public_dir
    for root, dirs, files in os.walk(public_dir):
        # Skip scoped temp directories if any
        if "scoped_dir" in root:
            continue
            
        for f in files:
            ext = os.path.splitext(f)[1].lower()
            if ext in valid_exts:
                src_path = os.path.join(root, f)
                dest_path = os.path.splitext(src_path)[0] + ".webp"
                
                try:
                    orig_size = os.path.getsize(src_path)
                    total_original_size += orig_size
                    
                    # Convert to webp
                    with Image.open(src_path) as img:
                        # WebP supports RGBA (transparency), so convert "RGBA" or "RGB" appropriately
                        if img.mode in ("RGBA", "LA") or (img.mode == "P" and "transparency" in img.info):
                            # Keep alpha channel
                            img.save(dest_path, "WEBP", quality=80)
                        else:
                            # RGB mode is fine
                            img.save(dest_path, "WEBP", quality=80)
                            
                    webp_size = os.path.getsize(dest_path)
                    total_webp_size += webp_size
                    converted_count += 1
                    
                    saving = (orig_size - webp_size) / orig_size * 100
                    print(f"  Converted {f} -> {os.path.basename(dest_path)}: "
                          f"{orig_size/1024:.1f} KB -> {webp_size/1024:.1f} KB (saved {saving:.1f}%)")
                          
                except Exception as e:
                    print(f"  Error converting {f}: {e}")
                    
    if converted_count > 0:
        savings = (total_original_size - total_webp_size) / total_original_size * 100
        print(f"\nBatch conversion complete!")
        print(f"Total converted: {converted_count} files")
        print(f"Original total size: {total_original_size / 1024 / 1024:.2f} MB")
        print(f"WebP total size: {total_webp_size / 1024 / 1024:.2f} MB")
        print(f"Overall savings: {savings:.1f}%")
    else:
        print("\nNo files were converted.")

if __name__ == "__main__":
    batch_convert()
