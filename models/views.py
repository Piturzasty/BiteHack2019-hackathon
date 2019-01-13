from django.shortcuts import render
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView

from models.models import Restaurant

from rest_framework.decorators import api_view, permission_classes

from django.views.decorators.csrf import csrf_exempt

from models.help.distance import distance





@permission_classes((AllowAny, ))
@csrf_exempt
@api_view(['GET', 'POST'])
def restaurant(request):

    if request.method == 'POST':

        longitude = request.POST.get('longitude')
        latitude = request.POST.get('latitude')
        radius = request.POST.get('radius')

        print(latitude)
        print(longitude)
        print(radius)

        if longitude is None:
            return render(request, 'models/restaurant.html', {'data': "Need 'longitude'"})
        if latitude is None:
            return render(request, 'models/restaurant.html', {'data': "Need 'latitude'"})
        if radius is None:
            return render(request, 'models/restaurant.html', {'data': "Need 'radius'"})

        longitude = float(longitude)
        latitude = float(latitude)
        radius = float(radius)

        print(longitude)
        print(latitude)

        restaurants = Restaurant.objects.all()

        data = []

        for res in restaurants:
            r_data = {'restaurant_name': res.restaurant_name}

            dis = distance(longitude, latitude, res.latitude, res.longitude)

            if dis <= radius:
                post = fromFacebook(res.facebook_id)
                #find posts
                data.append(r_data)

        print(data)
    else:
        return render(request, 'models/restaurant.html', {'data': "DUPA na dole"})

    return render(request, 'models/restaurant.html', {'data': data})


