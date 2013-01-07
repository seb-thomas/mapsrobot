from django.views.generic import *
from django.http import HttpResponse
import json

from marker.models import Marker

def clean_vars(obj):
    v=vars(obj)
    v.pop('_state')
    return v

def index(request):
    dump = json.dumps([clean_vars(m) for m in Marker.objects.all()])
    return HttpResponse(dump)