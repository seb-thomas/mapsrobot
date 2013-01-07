import datetime
from django.utils import timezone

from django.db import models
from django.db.models import Max

class Marker(models.Model):
    HIGH = "HI"
    MIDDLE = "MI"
    LOW = "LO"
    PRICE_RANGE_CHOICES = (
        (HIGH, 'High'),
        (MIDDLE, 'Middle'),
        (LOW, 'Low'),
    )
    price_range = models.CharField(max_length=2,
                                      choices=PRICE_RANGE_CHOICES,
                                      default=MIDDLE)
    def __unicode__(self):
        return self.price_range