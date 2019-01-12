import PIL

import pytesseract

print(pytesseract.image_to_string(PIL.Image.open('resources/orzo_year.png')))
