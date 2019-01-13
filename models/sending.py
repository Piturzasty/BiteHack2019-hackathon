import requests
import simplejson as json
from .models import Restaurant

# url = "http://127.0.0.1:8000/"
# data = {'auth_token': 'auth1', 'widget': 'id1', 'title': 'Something1', 'text': 'Some text', 'moreinfo': 'Subtitle'}
# headers = {'Content-type': 'application/json'}
# r = requests.post(url, data=json.dumps(data), headers=headers)


# def send(url: str):
#     restaurants = Restaurant.objects.all()
#
#     data = []
#
#     for restaurant in restaurants:
#         r_data = {'restaurant_name': restaurant.restaurant_name, 'location': restaurant.location}
#
#         data.append(r_data)
#
#     print(data)
#
#     headers = {'Content-type': 'application/json'}
#     r = requests.get(url, data=json.dumps(data), headers=headers)
#
