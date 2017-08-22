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
from habits.models import Habit, Existingroutine, Targetbehavior

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

            ##################################
            existingroutines = Existingroutine.objects.filter(created_by=request.user.userprofile)
            targetbehaviors = Targetbehavior.objects.filter(created_by=request.user.userprofile)
            habits = Habit.objects.filter(created_by=request.user.userprofile)
            # TODO: json auslagern
            if (len(existingroutines) == 0):
                print('No existing routines are available')
                routine1 = Existingroutine(name="meine Tasse auf dem Tisch abstelle...,", created_by=request.user.userprofile)
                routine2 = Existingroutine(name="meine Mappe auf dem Tisch ablege...", created_by=request.user.userprofile)
                routine3 = Existingroutine(name="mir die Zähne geputzt habe...", created_by=request.user.userprofile)
                routine4 = Existingroutine(name="mir die Haare gekämmt habe...", created_by=request.user.userprofile)
                routine5 = Existingroutine(name="meinen morgendlichen Kaffee getrunken habe...", created_by=request.user.userprofile)
                routine6 = Existingroutine(name="meine Schuhe angezogen habe...", created_by=request.user.userprofile)
                routine7 = Existingroutine(name="meine Haustüre abegeschlossen habe...", created_by=request.user.userprofile)
                routine8 = Existingroutine(name="meine Handtasche vom Haken genommen habe...", created_by=request.user.userprofile)
                routine9 = Existingroutine(name="mein Smartphone gestartet habe...", created_by=request.user.userprofile)
                routine10 = Existingroutine(name="mich in die Bahn gesetzt habe...", created_by=request.user.userprofile)
                routine11 = Existingroutine(name="mich auf meinen Stuhl gesetzt habe...", created_by=request.user.userprofile)
                routine12 = Existingroutine(name="meinen Computer gestartet habe...", created_by=request.user.userprofile)
                routine13 = Existingroutine(name="meinen Browser aufgerufen habe...", created_by=request.user.userprofile)
                routine14 = Existingroutine(name="meine Bürotür geschlossen habe...", created_by=request.user.userprofile)
                routine15 = Existingroutine(name="mein Fahrrad abgeschlossen habe...", created_by=request.user.userprofile)

                # save routines in db
                routine1.save()
                routine2.save()
                routine3.save()
                routine4.save()
                routine5.save()
                routine6.save()
                routine7.save()
                routine8.save()
                routine9.save()
                routine10.save()
                routine11.save()
                routine12.save()
                routine13.save()
                routine14.save()
                routine15.save()


            if (len(targetbehaviors) == 0):
                print('No target behaviors are available')
                targetbehavior1 = Targetbehavior(name="gebe ich den Zeitplan des heutigen Meetings bekannt.", created_by=request.user.userprofile)
                targetbehavior2 = Targetbehavior(name="stelle ich die Uhr auf...", created_by=request.user.userprofile)
                targetbehavior3 = Targetbehavior(name="erinnere ich das Team an die verbleibende Zeit.", created_by=request.user.userprofile)

                # Gesundheit & Fitness
                targetbehavior4 = Targetbehavior(name="...werde ich 3 Kniebeugen machen.", created_by=request.user.userprofile)
                targetbehavior5 = Targetbehavior(name="...werde ich Sonnencreme im Gesicht auftragen", created_by=request.user.userprofile)
                targetbehavior6 = Targetbehavior(name="...werde ich 3 Liegestützen machen.", created_by=request.user.userprofile)
                targetbehavior7 = Targetbehavior(name="...werde ich einen Apfel essen.", created_by=request.user.userprofile)
                targetbehavior8 = Targetbehavior(name="...werde ich ein kurzes Stretching machen.", created_by=request.user.userprofile)
                targetbehavior9 = Targetbehavior(name="...werde ich mein Handy auf 'lautlos' stellen.", created_by=request.user.userprofile)
                targetbehavior10 = Targetbehavior(name="...werde ich tief ein- und ausatmen", created_by=request.user.userprofile)
                targetbehavior11 = Targetbehavior(name="...werde ich ein Glass mit Wasser füllen.", created_by=request.user.userprofile)

                # Hobbies
                targetbehavior12 = Targetbehavior(name="...werde ich 3 Akkorde auf der Gitarre spielen.", created_by=request.user.userprofile)
                targetbehavior13 = Targetbehavior(name="...werde ich einen Absatz in einem Buch lesen.", created_by=request.user.userprofile)
                targetbehavior14 = Targetbehavior(name="...werde ich ein Übungsfoto machen.", created_by=request.user.userprofile)
                targetbehavior15 = Targetbehavior(name="...werde ich eine Tonleiter singen.", created_by=request.user.userprofile)

                # Mindfulness
                targetbehavior16 = Targetbehavior(name="...werde ich mir eine Sache, für die ich dankbar bin, sagen.", created_by=request.user.userprofile)
                targetbehavior17 = Targetbehavior(name="...werde ich mir im Spiegel zulächeln.", created_by=request.user.userprofile)
                targetbehavior18 = Targetbehavior(name="...werde ich eine Visualisierung vornehmen.", created_by=request.user.userprofile)
                targetbehavior19 = Targetbehavior(name="...werde ich ein positives Wort niederschreiben.", created_by=request.user.userprofile)

                # Organisation & Aufräumen
                targetbehavior20 = Targetbehavior(name="...werde ich das Waschbecken auswischen.", created_by=request.user.userprofile)
                targetbehavior21 = Targetbehavior(name="...werde ich meinen Kalender öffnen.", created_by=request.user.userprofile)
                targetbehavior22 = Targetbehavior(name="...werde ich meine E-Mails checken.", created_by=request.user.userprofile)
                targetbehavior23 = Targetbehavior(name="...werde ich das Licht ausmachen.", created_by=request.user.userprofile)
                targetbehavior24 = Targetbehavior(name="...werde ich ein Ding auf meinem Schreibtisch säubern.", created_by=request.user.userprofile)
                targetbehavior25 = Targetbehavior(name="...werde ich einen Teller spülen.", created_by=request.user.userprofile)
                targetbehavior26 = Targetbehavior(name="...werde ich ein Hemd bügeln.", created_by=request.user.userprofile)
                targetbehavior27 = Targetbehavior(name="...werde ich die Wäsche in den Korb legen.", created_by=request.user.userprofile)
                targetbehavior28 = Targetbehavior(name="...werde ich ein Regalfach abstauben.", created_by=request.user.userprofile)
                targetbehavior29 = Targetbehavior(name="...werde ich mein Handy aufladen.", created_by=request.user.userprofile)
                targetbehavior30 = Targetbehavior(name="...werde ich meine To-Do-List checken.", created_by=request.user.userprofile)

                # save targetbehaviors in db
                targetbehavior1.save()
                targetbehavior2.save()
                targetbehavior3.save()
                targetbehavior4.save()
                targetbehavior5.save()
                targetbehavior6.save()
                targetbehavior7.save()
                targetbehavior8.save()
                targetbehavior9.save()
                targetbehavior10.save()
                targetbehavior11.save()
                targetbehavior12.save()
                targetbehavior13.save()
                targetbehavior14.save()
                targetbehavior15.save()
                targetbehavior16.save()
                targetbehavior17.save()
                targetbehavior18.save()
                targetbehavior19.save()
                targetbehavior20.save()
                targetbehavior21.save()
                targetbehavior22.save()
                targetbehavior23.save()
                targetbehavior24.save()
                targetbehavior25.save()
                targetbehavior26.save()
                targetbehavior27.save()
                targetbehavior28.save()
                targetbehavior29.save()
                targetbehavior30.save()

            if (len(habits) == 0):
                print('No habits are available')
                habit1 = Habit(created_by=request.user.userprofile, title="Verhaltensnugget#1", existingroutine=routine1, targetbehavior=targetbehavior1, trigger=Habit.TRIGGER_OPTION_1, image="habit_image/icon_27774228454_5b8fe69dd7_q.jpg")
                habit2 = Habit(created_by=request.user.userprofile, title="Verhaltensnugget#2", existingroutine=routine1, targetbehavior=targetbehavior2, trigger=Habit.TRIGGER_OPTION_1, image="habit_image/icon_26856987_a9c88043d3_q.jpg")
                habit3 = Habit(created_by=request.user.userprofile, title="Verhaltensnugget#3", existingroutine=routine2, targetbehavior=targetbehavior3, trigger=Habit.TRIGGER_OPTION_1,  image="habit_image/Kompetenzz_17752__DSC5803.jpg")
                habit1.save()
                habit2.save()
                habit3.save()
            ##################################
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
