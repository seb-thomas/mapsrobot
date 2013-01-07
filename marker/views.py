from django.views.generic import *
from django.http import HttpResponse
from django.core import serializers
import json

from marker.models import Marker

class Landing(TemplateView):
    template_name='index.html'

def clean_vars(obj):
    v=vars(obj)
    v.pop('_state')
    return v

def marker(request):
    json.dumps([clean_vars(m) for m in Marker.objects.all()])