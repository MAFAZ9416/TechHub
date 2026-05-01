from django.db import models


# Create your models here.

class Product(models.Model):
    name = models.CharField(max_length=200)
    price = models.IntegerField()
    description = models.TextField()
    image = models.URLField()
    rating = models.FloatField(default=4.0)
    reviews = models.IntegerField(default=100)
    original_price = models.IntegerField(null=True)
    badge = models.CharField(max_length=20, blank=True)
    category = models.CharField(max_length=100, default='General')

    def __str__(self):
        return self.name