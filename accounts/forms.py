from django import forms
from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from django.contrib.auth.models import User

from accounts.models import UserProfile


class RegistrationForm(UserCreationForm):
    first_name = forms.CharField(max_length=30, required=False, help_text='Optional.')
    last_name = forms.CharField(max_length=30, required=False, help_text='Optional.')
    email = forms.EmailField(max_length=254, help_text='Required. Inform a valid email address.')

    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', 'email', 'password1', 'password2', )

class EditProfileForm(UserChangeForm):
    image = forms.ImageField(required=False)
    class Meta:
        model = User
        fields = {
            'first_name', 'last_name', 'email', 'password', 'image'
        }

class UserProfileForm(forms.ModelForm):

    class Meta:
        model = UserProfile
        fields = [
            'image',
        ]
def save(self, commit=True):
  user = super(UserProfileForm, self).save(commit=False)
  user.image = self.cleaned_data['image']

  if commit:
      user.save()

  return user
