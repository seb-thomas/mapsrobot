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
    name = models.CharField(max_length=255)
    address = models.CharField(max_length=255)
    postcode = models.CharField(max_length=10)
    google_plus = models.CharField(max_length=255, help_text="Url to the restaurant's G+ page")
    #phone_number = models.CharField(max_length=15, blank=True, null=True, help_text="Inc country code (+44)")
    latitude = models.CharField(max_length=255)
    longitude = models.CharField(max_length=255)
    price_range = models.CharField(max_length=10,
                                      choices=PRICE_RANGE_CHOICES,
                                      default=MIDDLE)
    byob = models.BooleanField()
    def __unicode__(self):
        return self.name