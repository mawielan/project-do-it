from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

class UserProfile(models.Model):
    user = models.OneToOneField(User)
    city = models.CharField(max_length=100, default='')
    website = models.URLField(default='')
    phone = models.IntegerField(default=0)
    image = models.ImageField(upload_to='profile_image', blank=True)

    def __str__(self):
        return self.user.username

    def image_url(self):
        #print(self.image.url)
        if self.image and hasattr(self.image, 'url'):
            return self.image.url
        else:
            return '/media/profile_image/dummy_avatar.jpg'


def create_profile(sender, **kwargs):
    if kwargs['created']:
        user_profile = UserProfile.objects.create(user=kwargs['instance'])

post_save.connect(create_profile, sender=User)
