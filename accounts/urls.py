from django.conf.urls import include, url
from accounts import views as accounts_views
from django.contrib.auth.views import (
        login, logout, password_reset,password_reset_done,
        password_reset_confirm, password_reset_complete
    )
urlpatterns = [
    url(r'^$', include('habits.urls')),
    url(r'^login/$', login, {'template_name': 'accounts/login.html'}, name='login'),
    url(r'^login/reset_password/$', password_reset, {'template_name': 'accounts/reset_password.html'}, name='password_reset'),
    url(r'^login/reset_password/done/$', password_reset_done, {'template_name': 'accounts/reset_password_done.html'}, name='password_reset_done'),
    url(r'^login/reset_password/confirm/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$', password_reset_confirm, {'template_name': 'accounts/reset_password_confirm.html'}, name='password_reset_confirm'),
    url(r'^login/reset_password/complete/$', password_reset_complete, {'template_name': 'accounts/reset_password_complete.html'}, name='password_reset_complete'),
    url(r'^logout/$', logout, {'template_name': 'accounts/logged_out.html'}, name='logout'),
    url(r'^registration/$', accounts_views.register, name='registration'),
    url(r'^registration/account_activation_sent/$', accounts_views.account_activation_sent, name='account_activation_sent'),
    url(r'^activate/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$', accounts_views.activate, name='activate'),
    url(r'^profile/$',accounts_views.view_profile, name='view_profile'),
    url(r'^profile/upload/$', accounts_views.upload_profile_image, name='upload_profile_image'),
    url(r'^profile/edit/$', accounts_views.edit_profile, name='edit_profile'),
    url(r'^profile/disable_account/confirm/$', accounts_views.disable_account_confirm, name='disable_account_confirm'),

    url(r'^profile/edit/change_password/$', accounts_views.change_password, name='change_password'),

]
