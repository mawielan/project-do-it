from django.conf import settings
from django.contrib.auth import login, update_session_auth_hash, authenticate
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.contrib.auth.forms import UserChangeForm, PasswordChangeForm

from django.contrib.auth.models import User
from django.contrib.sites.shortcuts import get_current_site
from django.shortcuts import render, redirect, get_object_or_404
from django.utils.encoding import force_bytes, force_text
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.http import HttpResponse, HttpResponseRedirect
from django.template.loader import render_to_string

from accounts.tokens import account_activation_token
from accounts.forms import RegistrationForm, EditProfileForm, UserProfileForm

from .models import UserProfile


def test(request):
    return render(request, 'accounts/test.html')

def home(request):
    return render(request, 'overview/overview.html')

def register(request):
    if request.method == 'POST':
        form = RegistrationForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            raw_password = form.cleaned_data.get('password1')
            user = authenticate(username=username, password=raw_password)
            login(request, user)
            return redirect(settings.LOGIN_REDIRECT_URL)
        # if form.is_valid():
        #     user = form.save(commit=False)
        #     user.is_active = False
        #     user.save()
        #     current_site = get_current_site(request)
        #     subject = 'Activate Your MySite Account'
        #     message = render_to_string('accounts/account_activation_email.html', {
        #         'user': user,
        #         'domain': current_site.domain,
        #         'uid': urlsafe_base64_encode(force_bytes(user.pk)),
        #         'token': account_activation_token.make_token(user),
        #     })
        #     user.email_user(subject, message)
        #     return redirect('account_activation_sent')
    else:
        form = RegistrationForm()
    return render(request, 'accounts/registration.html', {'form': form})


def account_activation_sent(request):
    return render(request, 'accounts/account_activation_sent.html')


def activate(request, token, uidb64):
    try:
        uid = force_text(urlsafe_base64_decode(uidb64))
        user = User.objects.get(pk=uid)
    except (TypeError, ValueError, OverflowError, User.DoesNotExist):
        user = None

    if user is not None and account_activation_token.check_token(user, token):
        user.is_active = True
        user.profile.email_confirmed = True
        user.save()
        login(request, user)
        return redirect('/overview/')
    else:
        return render(request, 'accounts/account_activation_invalid.html')


def view_profile(request, pk=None):
    print('view_profile')

    if pk:
        user = User.objects.get(pk=pk)
    else:
        user = request.user

    args = {'user': user}
    return render(request, 'accounts/profile.html', args)


def edit_profile(request):
    print('edit_profile')
    if request.method == 'POST':
        form = EditProfileForm(request.POST, instance=request.user)

        if form.is_valid():
            form.save()
            return redirect('/account/profile')
    else:
        form = EditProfileForm(instance=request.user)
        args = {'form':form}
        return render(request, 'accounts/edit_profile.html', args)

def upload_profile_image(request):
    print('upload_profile_image')
    if request.method == 'POST':
        form = UserProfileForm(request.POST or None, request.FILES or None, instance=request.user.userprofile)
        print(request.POST)
        print(request.FILES)
        
        if form.is_valid():
            print('form.is_valid == True')
            form.save()
            messages.success(request, 'Profile details updated.')
            return HttpResponseRedirect('/account/profile')
            # return redirect('/account/profile')

            #return render(request, '/account/profile')

def disable_account_confirm(request):
    print('disable_account_confirm')
    if request.method == 'POST':
        try:
            user = User.objects.get(pk=request.user.id)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            user = None
        user.is_active = False
        user.save()
        return redirect(settings.LOGIN_URL)
    else:
        return render(request, 'accounts/disable_account_confirm.html')




def change_password(request):
    print('change_password')

    if request.method == 'POST':
        form = PasswordChangeForm(data=request.POST, user=request.user)

        if form.is_valid():
            form.save()
            update_session_auth_hash(request, form.user)
            return redirect('/account/profile')

        else:
            return redirect('/account/profile/edit/change_password')

    else:
        form = PasswordChangeForm(user=request.user)
        args = {'form':form}
        return render(request, 'accounts/change_password.html', args)
