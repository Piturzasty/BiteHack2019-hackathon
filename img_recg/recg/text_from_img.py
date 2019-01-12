import io
from google.cloud import vision
from google.oauth2 import service_account


def detect_text(path):
    credentials = service_account.Credentials.from_service_account_file('../keys/key.json')
    client = vision.ImageAnnotatorClient(credentials=credentials)

    with io.open(path, 'rb') as image_file:
        content = image_file.read()

    image = vision.types.Image(content=content)
    response = client.text_detection(image=image)
    texts = response.text_annotations

    #Retrun whole text
    return texts[0].description
