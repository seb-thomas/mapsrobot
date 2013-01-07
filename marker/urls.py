from django.conf.urls import patterns, include, url
from django.contrib import admin
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.views.generic import TemplateView, RedirectView
from django.core.urlresolvers import reverse_lazy

from marker.views import *

admin.autodiscover()

urlpatterns = patterns('',
    url(r'^$', Landing.as_view(), name='home'),
    url(r'^admin/', include(admin.site.urls)),

    url(r'^marker/', include('marker.urls')),
)

urlpatterns += staticfiles_urlpatterns()
