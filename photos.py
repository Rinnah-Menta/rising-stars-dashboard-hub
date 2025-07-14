import os

# Folder containing the passport photos
image_folder = r'g:\ \springing stars ppp\JUNIOR FOUR'
output_file = r'photo_names_junior_four.txt'

# Open file to write the names
with open(output_file, 'w', encoding='utf-8') as f_out:
    for filename in os.listdir(image_folder):
        if filename.lower().endswith('.jpg'):
            # Remove file extension and write name
            name = os.path.splitext(filename)[0]
            f_out.write(name + '\n')

print(f"✅ All names saved to '{output_file}'")
