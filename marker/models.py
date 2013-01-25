import datetime
from django.utils import timezone

from django.db import models
from django.db.models import Max

class Marker(models.Model):
    HIGH = "high"
    MIDDLE = "mid"
    BUDGET = "budget"
    PRICE_RANGE_CHOICES = (
        (HIGH, 'High'),
        (MIDDLE, 'Middle'),
        (BUDGET, 'budget'),
    )
    price_range = models.CharField(max_length=10,
                                      choices=PRICE_RANGE_CHOICES,
                                      default=MIDDLE)
    name = models.CharField(max_length=255)
    address = models.CharField(max_length=255)
    postcode = models.CharField(max_length=10)
    latitude = models.CharField(max_length=255)
    longitude = models.CharField(max_length=255)
    byob = models.BooleanField()
    def __unicode__(self):
        return self.name