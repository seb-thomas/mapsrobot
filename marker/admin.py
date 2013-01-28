# -*- coding: utf-8 -*-
from django.contrib import admin
from models import Marker


class MarkerAdmin(admin.ModelAdmin):
    #...
    class Media:
        from django.conf import settings
        js = ('http://maps.google.com/maps/api/js?sensor=true',
            'https://raw.github.com/HPNeo/gmaps/master/gmaps.js',
            '/media/js/MarkerAdmin.js')

admin.site.register(Marker, MarkerAdmin)
