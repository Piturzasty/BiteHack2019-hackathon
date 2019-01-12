import PIL

import pytesseract

tessdata_dir_config = r'--tessdata-dir "train_data"'
print(pytesseract.image_to_string(PIL.Image.open('resources/orzo_year.png'),lang='pol',config=tessdata_dir_config))
