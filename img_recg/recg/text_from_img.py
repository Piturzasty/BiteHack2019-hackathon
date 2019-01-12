import io
from google.cloud import vision
from google.oauth2 import service_account


def detect_text(path, is_url=False):
    credentials = service_account.Credentials.from_service_account_file('../keys/key.json')

    client = vision.ImageAnnotatorClient(credentials=credentials)
    if is_url:
        image = vision.types.Image()
        image.source.image_uri = path
    else:
        with io.open(path, 'rb') as image_file:
            content = image_file.read()
        image = vision.types.Image(content=content)

    response = client.text_detection(image=image)
    texts = response.text_annotations

    # Retrun whole text
    return texts[0].description


print(detect_text(
    'https://scontent.xx.fbcdn.net/v/t1.0-9/q81/p720x720/49947322_347544445874330_5586516966098599936_o.jpg?_nc_cat=109&_nc_ht=scontent.xx&oh=1f2a8eacc4cfc3632b00f4a3d46b52b2&oe=5CC12D99',True))
