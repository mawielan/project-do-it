"""habitusProject URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""

from django.conf import settings
from django.conf.urls import include, url
from django.conf.urls.static import static
from django.contrib import admin
from django.contrib.auth import views as auth_views
from django.views.generic.base import TemplateView
from django.shortcuts import render, redirect

urlpatterns = [
    url(r'^$', include('accounts.urls')),
    url(r'^admin/', admin.site.urls),
    url(r'^account/', include('accounts.urls')),
    url(r'^overview/', include('habits.urls')),
    #url(r'^overview/', include('overview.urls')),
    #url(r'^home/', include('login.urls')),
    #url(r'^registration/$', include('registration.urls')),
    #url(r'^password_reset/$', include('login.urls')),
    #url(r'^$', TemplateView.as_view(template_name='home.html'), name='home'),
    #url(r'^login/$', include('login.urls')),
    #url(r'^logout/$', auth_views.logout, {'template_name': 'logged_out.html'}, name='logout'),
    #url(r'^activate/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$', register_views.activate, name='activate'),
    #url(r'^account_activation_sent/$', register_views.account_activation_sent, name='account_activation_sent'),
    #url(r'^registration/', include('registration.urls')),
    #url(r'^login/', include('login.urls')),
    #url(r'^$', core_views.home, name='home'),
    #url(r'^login/$', auth_views.login, {'template_name': 'login.html'}, name='login'),
    #url(r'^logout/$', auth_views.logout, {'next_page': 'login'}, name='logout'),
    #url(r'^signup/$', core_views.signup, name='signup'),
]


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
