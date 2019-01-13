import facebook
import datetime
from scorer.promo_chekcer import is_promo


file = open('fb_token', "r")
token = file.read()
graph = facebook.GraphAPI(access_token=token)

id = '347472895881485'


def fromFacebook(id):
    posts_array = []
    posts = graph.request(id + '/posts')
    for elem in posts['data']:
        post_time = datetime.datetime.strptime(elem['created_time'], '%Y-%m-%dT%H:%M:%S+%f')
        if datetime.datetime.now() - post_time < datetime.timedelta(days=7):
            picture = graph.get_object(id=elem['id'], fields='full_picture')
            try:
                picStr = picture['full_picture']
            except KeyError:
                picStr = "#"
            posts_array.append((elem['created_time'], elem['message'], picStr))
    return posts_array


test = fromFacebook(id)

for elem in test:
    print(is_promo(elem))
