import io
from google.cloud import vision
from google.oauth2 import service_account


def detect_text(path):
    """Detects text in the file."""

    credentials = service_account.Credentials.from_service_account_file('../keys/key.json')

    client = vision.ImageAnnotatorClient(credentials=credentials)

    with io.open(path, 'rb') as image_file:
        content = image_file.read()

    image = vision.types.Image(content=content)

    response = client.text_detection(image=image)
    texts = response.text_annotations
    print('Texts:')

    for text in texts:
        print('\n"{}"'.format(text.description))


detect_text('../resources/1.jpg')