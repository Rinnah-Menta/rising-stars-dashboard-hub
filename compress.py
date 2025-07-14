from PIL import Image, ImageOps
import os

# Folder with images to compress
input_folder = r"C:\Users\Fresh Teacher\Pictures\passport"  # <-- Change this
output_folder = os.path.join(input_folder, "compressed")

# Create output folder if it doesn’t exist
os.makedirs(output_folder, exist_ok=True)

# Resize threshold – resize if larger than this
MAX_WIDTH = 1280
MAX_HEIGHT = 1280

# Compression quality
JPEG_QUALITY = 75  # WhatsApp-like compression

# Loop through files
for filename in os.listdir(input_folder):
    if filename.lower().endswith((".jpg", ".jpeg")):
        input_path = os.path.join(input_folder, filename)
        output_path = os.path.join(output_folder, filename)

        try:
            with Image.open(input_path) as img:
                # Auto-rotate based on EXIF orientation
                img = ImageOps.exif_transpose(img)

                # Convert to RGB if needed
                if img.mode in ("RGBA", "P"):
                    img = img.convert("RGB")

                # Resize if larger than max size
                width, height = img.size
                if width > MAX_WIDTH or height > MAX_HEIGHT:
                    img.thumbnail((MAX_WIDTH, MAX_HEIGHT))

                # Save compressed, stripped of metadata
                img.save(output_path, format="JPEG", quality=JPEG_QUALITY, optimize=True)

                print(f"Compressed & corrected: {filename}")
        except Exception as e:
            print(f"Error with {filename}: {e}")
