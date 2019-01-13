from django.db import models


class Restaurant(models.Model):
    restaurant_name = models.CharField(max_length=100, unique=True)
    data_posted = models.DateTimeField(auto_now_add=True)
    latitude = models.FloatField(default=0.0)
    longitude = models.FloatField(default=0.0)
    facebook_id = models.CharField(default="347472895881485", max_length=100)
    restaurant_url = models.CharField(default="#", max_length=250)
    image_url = models.CharField(default="#", max_length=350)

    def __str__(self):
        return self.restaurant_name


class Promotion(models.Model):
    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE)
    data_posted = models.CharField(max_length=20)
    data_end = models.CharField(max_length=20)
    promotion_message = models.TextField()
    promotion_name = models.TextField(max_length=100, default="Promocja")
    image_url = models.CharField(default="#", max_length=350)

    def __str__(self):
        return f'{self.restaurant}, {self.promotion_name}'
