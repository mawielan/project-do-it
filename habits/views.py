from django.shortcuts import render, redirect, get_object_or_404, render_to_response
from django.template import RequestContext
from habits.models import Habit, Existingroutine, Targetbehavior, Comment
from django.views.generic.edit import UpdateView, DeleteView
from django.views.generic import TemplateView, ListView, DetailView
from django.urls import reverse_lazy, reverse
from django.forms import formset_factory
from habits.forms import (
    HabitForm,
    ExistingroutineForm,
    TargetbehaviorForm,
    HabitToManageForm,
    HabitUpdateForm,
    HabitCreateForm,
    SendMailForm,
    HabitImageForm,
)
from django.contrib import messages
from django.core.mail import send_mail
from django.core import serializers
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
import base64
from django.core.files.base import ContentFile
    # Habit

def create_habit(request):
    print('create_habit')
    if(request.method == 'POST'):
        form = HabitCreateForm(request.POST or None, request.FILES or None)
        if form.is_valid():
            habit = form.save(commit=False)
            habit.created_by = request.user.userprofile
            habit.triggered_at_date = request.POST['date']
            habit.triggered_at_time = request.POST['time']
            habit.save()
            request.session.pop('selected_routine_id', None)
            request.session.pop('selected_targetbehavior_id', None)
            return redirect('/overview')
    else:
        # preview existingroutine
        if 'selected_routine_id' in request.session:
            existingroutine_id = request.session['selected_routine_id']
            existingroutine = Existingroutine.objects.get(id=existingroutine_id)
        else:
            existingroutine = None;

        # preview targetbehavior
        if 'selected_targetbehavior_id' in request.session:
            targetbehavior_id = request.session['selected_targetbehavior_id']
            targetbehavior = Targetbehavior.objects.get(id=targetbehavior_id)
        else:
            targetbehavior = None;

        form = HabitCreateForm(request.POST or None, initial={'targetbehavior' : targetbehavior,
                                                        'existingroutine' : existingroutine})



    return render(request, 'habits/create_habit.html', {'form':form})

# def markdown_uploader(request):
#     """
#     Makdown image upload for locale storage
#     and represent as json to markdown editor.
#     """
#     if request.method == 'POST' and request.is_ajax():
#         if 'markdown-image-upload' in request.FILES:
#             image = request.FILES['image']
#             image_types = [
#                 'image/png', 'image/jpg',
#                 'image/jpeg', 'image/pjpeg', 'image/gif'
#             ]
#             if image.content_type not in image_types:
#                 data = json.dumps({
#                     'status': 405,
#                     'error': _('Bad image format.')
#                 })
#                 return HttpResponse(
#                     data, content_type="application/json", status=405)
#
#             tmp_file = os.path.join(settings.UPLOAD_PATH, image.name)
#             path = default_storage.save(tmp_file, ContentFile(image.read()))
#             img_url = os.path.join(settings.MEDIA_URL, path)
#
#             data = json.dumps({
#                 'status': 200,
#                 'link': img_url,
#                 'name': image.name
#             })
#             return HttpResponse(data, content_type='application/json')
#         return HttpResponse(_('Invalid request!'))
#     return HttpResponse(_('Invalid request!'))

def upload_habit_image(request):
    print('upload_habit_image is fired!')
    if request.method == 'POST':
        if request.is_ajax():
            form = myForm(request.POST or request.FILES or None)
            if form.is_valid():
                print(request.FILES)
                for filename, file in request.FILES.iteritems():
                        print(filename)
                        print(file)
                return JSONResponse(data);


def set_state(request):
    print('set_state is fired')
    badNumber = 9999;
    if request.method == 'POST':
        if request.is_ajax():

            habits = Habit.objects.filter(created_by=request.user.userprofile)
            habit_id = request.POST.get('habit_id')
            state = request.POST.get('state')

            print(habit_id)
            print(state)

            habitWhichChangeState = Habit.objects.get(id=habit_id)

            if state == 'true':
                print('state = true');
                habitWhichChangeState.is_active = True
            else:
                habitWhichChangeState.is_active = False;

            if (habitWhichChangeState.is_active):
                for habit in habits:
                    habit.priority += 1
                    habit.save()
                habitWhichChangeState.priority = 1;

            else:
                habitWhichChangeState.priority = badNumber;
            habitWhichChangeState.save()


            data = {'habitWhichChangeID': habit_id}
            return JsonResponse(data)

def update_habit_complete(request):
    print('update_habit_complete')
    if (request.method == 'POST'):
        if request.is_ajax():

            habits = Habit.objects.filter(created_by=request.user.userprofile)

            habitToUpdate_id = request.POST.get('habitToUpdate_id')
            habit_title = request.POST.get('habit_title')
            habit_trigger = request.POST.get('habit_trigger')
            habit_routine = request.POST.get('habit_routine')
            habit_targetbehavior = request.POST.get('habit_targetbehavior')
            habit_image = request.POST.get('habit_image')
            print(habit_image)
            habit_image = habit_image.split('base64,', 1 )
            print(habit_image)
            habit_image = base64.b64decode(habit_image[1])
            image_name = request.POST.get('image_name')


            #
            # image = habit_image.split('http://localhost:8000/media')

            print('id: ' + habitToUpdate_id)
            print('title: ' + habit_title)
            print('trigger: ' + habit_trigger)
            print('routine: ' + habit_routine)
            print('targetbehavior: ' + habit_targetbehavior)

            try:
                obj_habit = Habit.objects.get(id=habitToUpdate_id, created_by=request.user.userprofile)
            except Habit.DoesNotExist:
                console.log('Habit with id: ' + habitToUpdate_id + ' does not exist!')

            # Check if any value has changed and update and finally save habit with this specific id.

            try:
                obj_routine = Existingroutine.objects.get(name=habit_routine, created_by=request.user.userprofile)
            except Existingroutine.DoesNotExist:
                obj_routine = Existingroutine(name=habit_routine, created_by=request.user.userprofile)
                obj_routine.save()

            try:
                obj_targetbehavior = Targetbehavior.objects.get(name=habit_targetbehavior, created_by=request.user.userprofile)
            except Targetbehavior.DoesNotExist:
                obj_targetbehavior = Targetbehavior(name=habit_targetbehavior, created_by=request.user.userprofile)
                obj_targetbehavior.save()

            # if (habit_title)
            #
            #
            # for habit in habits:
            #     habit.priority += 1;
            #     habit.save();
            obj_habit.title = habit_title;
            obj_habit.trigger = habit_trigger;
            obj_habit.existingroutine = obj_routine;
            obj_habit.targetbehavior = obj_targetbehavior;

            # check if habit has already an image
            print(obj_habit.image)

            if (obj_habit.image):
                obj_habit.image.delete(save=True)


            obj_habit.image = ContentFile(habit_image, image_name)


            obj_habit.save();
            # habit = Habit(created_by=request.user.userprofile, is_active=True,
            # title=habit_title, trigger=habit_trigger, existingroutine=obj_routine,
            # targetbehavior=obj_targetbehavior, image=image[1])

            # habit.save()

            data = {"habit_title":habit_title,
                    "habit_trigger":habit_trigger,
                    "habit_routine":habit_routine,
                    "habit_targetbehavior":habit_targetbehavior };
            return JsonResponse(data)
    return redirect('display_habits')

def save_habit(request):
    print('save_habit')
    if (request.method == 'POST'):
        if request.is_ajax():

            habits = Habit.objects.filter(created_by=request.user.userprofile, is_active=True)

            habit_title = request.POST.get('habit_title')
            habit_trigger = request.POST.get('habit_trigger')
            habit_routine = request.POST.get('habit_routine')
            habit_targetbehavior = request.POST.get('habit_targetbehavior')
            habit_imageBase64Decode = request.POST.get('habit_image')
            # print(habit_image)
            habit_imageSplit = habit_imageBase64Decode.split('base64,', 1 )
            # print(habit_image)
            habit_image = base64.b64decode(habit_imageSplit[1])
            image_name = request.POST.get('habit_image_name')

            try:
                obj_routine = Existingroutine.objects.get(name=habit_routine, created_by=request.user.userprofile)
            except Existingroutine.DoesNotExist:
                obj_routine = Existingroutine(name=habit_routine, created_by=request.user.userprofile)
                obj_routine.save()

            try:
                obj_targetbehavior = Targetbehavior.objects.get(name=habit_targetbehavior, created_by=request.user.userprofile)
            except Targetbehavior.DoesNotExist:
                obj_targetbehavior = Targetbehavior(name=habit_targetbehavior, created_by=request.user.userprofile)
                obj_targetbehavior.save()


            for habit in habits:
                habit.priority += 1;
                habit.save();


            print(habit_image)
            # prent(image_name)
            obj_habit = Habit(created_by=request.user.userprofile, is_active=True)
            obj_habit.title = habit_title;
            obj_habit.trigger = habit_trigger;
            obj_habit.existingroutine = obj_routine;
            obj_habit.targetbehavior = obj_targetbehavior;
            obj_habit.image = ContentFile(habit_image, image_name)

            # habit = Habit(created_by=request.user.userprofile, is_active=True,
            # title=habit_title, trigger=habit_trigger, existingroutine=obj_routine,
            # targetbehavior=obj_targetbehavior, image=ContentFile(habit_image, image_name))

            obj_habit.save()

            data = {"habit_title":habit_title,
                    "habit_trigger":habit_trigger,
                    "habit_routine":habit_routine,
                    "habit_targetbehavior":habit_targetbehavior };

            return JsonResponse(data)
    return redirect('display_habits')


def save_comment(request):
    print('save_comment is fired')
    if (request.method == 'POST'):
        if request.is_ajax():
            comment = request.POST.get('comment')

            habit = Habit.objects.get(id=request.POST.get('habit_id'))

            commentToSave = Comment(comment=comment, created_by=request.user.userprofile, related_habit=habit)
            commentToSave.save()


            data = {"comment":comment, "habit_title":habit.title};
            return JsonResponse(data)


def get_comments(request):
    print('get_comments is fired')
    if (request.method == 'POST'):
        if request.is_ajax():

            habit = Habit.objects.get(id=request.POST.get('habit_id'))
            comments = Comment.objects.filter(created_by=request.user.userprofile, related_habit=habit)
            numberOfComments = len(comments)

            comments_json = serializers.serialize('json', comments)
            print(comments_json)

            data = { "habit_title" : habit.title, "comments_json" : comments_json, "numberOfComments" : numberOfComments}
            return JsonResponse(data, safe=False)




def display_habitToCreate(request):
    print('display_habitToCreate is fired!')
    habits = Habit.objects.filter(created_by=request.user.userprofile)
    existingroutines = Existingroutine.objects.filter(created_by=request.user.userprofile)
    targetbehaviors = Targetbehavior.objects.filter(created_by=request.user.userprofile)

    if (request.method == 'GET'):
        print('request.display_habitToCreate == GET')
        form = HabitCreateForm(request.POST or None)

    template_args = {'form':form, 'habits':habits,
                    'routines':existingroutines,
                    'targetbehaviors': targetbehaviors}
    return render(request, 'habits/display_habit_to_create.html', template_args)
    # if(request.method == 'POST'):
    #     print('create_habit_post')
    #     habits = Habit.objects.filter(created_by=request.user.userprofile, is_active=True)
    #     if request.is_ajax():
    #
    #         for habit in habits:
    #             habit.priority += 1;
    #             habit.save();
    #
    #         habit = Habit(title="HabitAjax", created_by=request.user.userprofile, image="habit_image/no_image_placeholder.png")
    #         habit.save()
    #
    #         data = {"habit_title":habit.title,
    #                 "habit_id":habit.id}
    #         return JsonResponse(data)
    #
    #     form = HabitCreateForm(request.POST or None, request.FILES or None)
    #     if form.is_valid():
    #
    #         habit = form.save(commit=False)
    #         habit.created_by = request.user.userprofile
    #         # habit.triggered_at_date = request.POST['date']
    #         # habit.triggered_at_time = request.POST['time']
    #         habit.save()
    #         # request.session.pop('selected_routine_id', None)
    #         # request.session.pop('selected_targetbehavior_id', None)
    #         return redirect('display_habits')
    # else:
    #     print('create_habit_get')
    #     form = HabitCreateForm(request.POST or None)

    # template_args = {'form':form, 'habits':habits,
    #                 'routines':existingroutines,
    #                 'targetbehaviors': targetbehaviors}
    # return render(request, 'habits/create_habit_newVersion.html', template_args)
    # if request.method == 'POST':
    #     habits = Habit.objects.filter(created_by=request.user.userprofile, is_active=True)
    #
    #     if request.is_ajax():
    #
    #         for habit in habits:
    #             habit.priority += 1;
    #             habit.save();
    #
    #         habit = Habit(title="HabitAjax", created_by=request.user.userprofile, image="habit_image/no_image_placeholder.png")
    #         habit.save()
    #
    #         data = {"habit_title":habit.title,
    #                 "habit_id":habit.id}
    #         return JsonResponse(data)
    # else:
    #     return render(request, 'habits/create_habit_newVersion.html')

#TODO: wird diese Methode benutzt?
def edit_habit(request):
    if request.method == 'POST':
        habits = Habit.objects.filter(created_by=request.user.userprofile, is_active=True)

        if request.is_ajax():

            testNote = "Success!";

            data = {"testNote":testNote}
            return render(request, 'habits/create_habit_newVersion.html')
    #Get goes here
    return render(request, 'habits/display_habitToCreate.html')


def tweet_habit(request, id):
    habit = Habit.objects.get(id=id)
    text = ('?text=Tweet from Habitus member ' + str(request.user) + ':'
            '\n'
            'Hi, there!'
            ' I\'m working actually on habit ' + '"' + habit.title + '"' + '.'
            '\n'
            'Have a nice day :) ')

    return HttpResponseRedirect('//twitter.com/intent/tweet' + text)

def post_habit(request, id):
    habit = Habit.objects.get(id=id)
    base_url = 'https://www.facebook.com/sharer/sharer.php?u='
    # TODO: base_url + eigene Webseite benutzen. Idee: template für preview von dem Habit das man posten möchte
    return HttpResponseRedirect(base_url + 'https://google.com')

def gplus_habit(request, id):
    habit = Habit.objects.get(id=id)
    base_url = 'https://plus.google.com/share?url='
    # TODO: base_url + eigene Webseite benutzen. Idee: template für preview von dem Habit das man posten möchte
    return HttpResponseRedirect(base_url + 'http://codingforentrepreneurs.com')

def mail_habit(request, id):
    habit = Habit.objects.get(id=id)

    if request.method == 'POST':
        form = SendMailForm(request.POST)
        if form.is_valid():
            send_mail(
            request.POST['mail_subject'],
            request.POST['mail_body'],
            request.POST['mail_from'],
            [request.POST['mail_to']]
            )
        return redirect('display_habits')
    else:
        body_text = ('HI THERE! '
                    '\n'
                    'I\'m working currently on this habit: ' + habit.title +
                    '\n'
                    'Have a nice day :) ')
        form = SendMailForm(initial={'mail_from':request.user.email, 'mail_body':body_text})

    template_args = {'form': form }
    return render(request, 'habits/display_habit_to_send.html', template_args )



def delete_habit(request):
    print('deleteHabit')
    habit_to_delete = get_object_or_404(Habit, id=id)
    print(habit_to_delete)
    if (request.method == 'POST'):
        form = HabitForm(instance=habit_to_delete)
        if form.is_valid(): # checks CSRF
            print('delete')
        return redirect('display_habits') # wherever to go after deleting
    else:
        # Not Working
        return render(request, 'habits/delete_habits.html')


    # Existing routine

def display_existing_routines(request):
    print(' display_existing_routines')
    print(request.user.userprofile)
    routines = Existingroutine.objects.filter(created_by=request.user.userprofile)

    args = {'routines' : routines}
    return render(request, 'habits/existingroutine/display_existingroutines.html', args)

def create_existing_routine(request):
    print('create_existing_routine')
    if(request.method == 'POST'):
        form = ExistingroutineForm(request.POST or None)
        if form.is_valid():
            name = request.POST['name']
            created_by = request.user.userprofile
            existingroutine = Existingroutine(name=name, created_by=created_by)
            existingroutine.save()
            return redirect('display_existing_routines')
    else:
        form = ExistingroutineForm(request.POST or None)

    return render(request, 'habits/existingroutine/create_existingroutine.html', {'form':form})

def select_existing_routine(request, id):
    print('select_existing_routine')
    if request.method == 'POST':
        request.session['selected_routine_id'] = id
        return redirect('create_habit')
    else:
        return render(request, 'habits/existingroutine/display_existingroutines.html')



def display_targetbehavior(request):
    print(' display_targetbehavior')
    print(request.user.userprofile)
    targetbehaviors = Targetbehavior.objects.filter(created_by=request.user.userprofile)

    args = {'targetbehaviors' : targetbehaviors}
    return render(request, 'habits/targetbehavior/display_targetbehavior.html', args)

def create_targetbehavior(request):
    print('create_targetbehavior')
    if(request.method == 'POST'):
        form = TargetbehaviorForm(request.POST or None)
        if form.is_valid():
            name = request.POST['name']
            created_by = request.user.userprofile
            targetbehavior = Targetbehavior(name=name, created_by=created_by)
            targetbehavior.save()
            return redirect('display_targetbehavior')
    else:
        form = TargetbehaviorForm(request.POST or None)

    return render(request, 'habits/targetbehavior/create_targetbehavior.html', {'form':form})

def select_targetbehavior(request, id):
    print('select_targetbehavior')
    if request.method == 'POST':
        request.session['selected_targetbehavior_id'] = id
        return redirect('create_habit')
    else:
        return render(request, 'habits/targetbehavior/display_targetbehavior.html')

    # Position

def locate_position(request):
    print('Position Determination')
    if request.method == 'POST':
        longitude = request.POST.get('id_lng')
        print(longitude)
        latitude = request.POST.get('id_lat')
        return HttpResponse('Longitude: ' + str(longitude) + '\n' + 'Latitude: ' + str(latitude))
    else:
        print('GET')
        return render(request, 'habits/position.html')
    # Habits

class HabitListView(ListView):
    model = Habit
    context_object_name = 'habits'   # your own name for the list as a template variable
    template_name = 'habits/display_habits.html'  # Specify your own template name/location

    def get_queryset(self):
        print('get_queryset_HabitListView')
        queryset = Habit.objects.filter(created_by=self.request.user.id)
        # if (len(queryset) == 0):
        #     print(len(queryset))
        #     print('Keine Habits vorhanden')
        #
        #     # TODO: könnte man ersetzen durch eine json file mit habits.
        #     routine1 = Existingroutine(name="meine Tasse auf dem Tisch abstelle,", created_by=self.request.user.userprofile)
        #     routine2 = Existingroutine(name="meine Mappe auf dem Tisch ablege", created_by=self.request.user.userprofile)
        #
        #     # save routines in db
        #     routine1.save()
        #     routine2.save()
        #
        #     targetbehavior1 = Targetbehavior(name="gebe ich den Zeitplan des heutigen Meetings bekannt.", created_by=self.request.user.userprofile)
        #     targetbehavior2 = Targetbehavior(name="stelle ich die Uhr auf...", created_by=self.request.user.userprofile)
        #     targetbehavior3 = Targetbehavior(name="erinnere ich das Team an die verbleibende Zeit.", created_by=self.request.user.userprofile)
        #
        #     # save targetbehaviors in db
        #     targetbehavior1.save()
        #     targetbehavior2.save()
        #     targetbehavior3.save()
        #
        #     habit1 = Habit(created_by=self.request.user.userprofile, title="Verhaltensnugget#1", existingroutine=routine1, targetbehavior=targetbehavior1, trigger=Habit.TRIGGER_OPTION_1, image="habit_image/icon_27774228454_5b8fe69dd7_q.jpg")
        #     habit2 = Habit(created_by=self.request.user.userprofile, title="Verhaltensnugget#2", existingroutine=routine1, targetbehavior=targetbehavior2, trigger=Habit.TRIGGER_OPTION_1, image="habit_image/icon_26856987_a9c88043d3_q.jpg")
        #     habit3 = Habit(created_by=self.request.user.userprofile, title="Verhaltensnugget#3", existingroutine=routine2, targetbehavior=targetbehavior3, trigger=Habit.TRIGGER_OPTION_1,  image="habit_image/Kompetenzz_17752__DSC5803.jpg")
        #     habit1.save()
        #     habit2.save()
        #     habit3.save()
        #
        # print(len(queryset))
        print(queryset)
        return queryset

    # def get_context_data(self, **kwargs):
    #     # Call the base implementation first to get a context
    #     context = super(HabitCreateView, self).get_context_data(**kwargs)
    #     # Add in a QuerySet of all the comments
    #     comments = Comment.objects.filter(created_by=self.request.user.userprofilge, habit=self.object)
    #     context['habitToCreate'] = Habit(created_by=self.request.user.userprofile, is_active=True, title="Testhabit")
    #     return context

    def post(self, request):
        print('post')
        habits = Habit.objects.filter(created_by=request.user.userprofile).order_by("priority")

        if request.is_ajax():
            list = request.POST.get('result')
            print(list)
            list = list.split("&")
            print(list)
            print(len(habits))

            if (len(list) != 1 and list[0] != ''):
                _priority = 1;
                for habit in range(0, len(habits)):
                    print(habit)
                    habitWithID = list[habit].split("=")
                    print('habitWithID' + str(habitWithID))

                    habitToUpdate = Habit.objects.get(id=habitWithID[1])
                    habitToUpdate.priority = _priority
                    habitToUpdate.save()
                    _priority += 1

            data = {"result":list}
            return JsonResponse(data)
        return redirect('display_habits')

class HabitCreateView(ListView):
    model = Habit
    context_object_name = 'habits'
    template_name = 'habits/create_habit_newVersion.html'

    def queryset(self):
        queryset = Habit.objects.filter(created_by=self.request.user.id, is_active=True)
        print(queryset)
        return queryset

    def get_context_data(self, **kwargs):
        # Call the base implementation first to get a context
        context = super(HabitCreateView, self).get_context_data(**kwargs)
        # Add in a QuerySet of all the books
        context['habitToCreate'] = Habit(created_by=self.request.user.userprofile, is_active=True, title="Testhabit")
        return context

    def post(self, request):
        print('post_habit')
        form = HabitCreateForm(request.POST or None)
        if form.is_valid():
            print("Valid")
            return redirect('display_habits')
        return redirect('create_habit_newVersion    ')



            # if(request.method == 'POST'):
            #     form = ExistingroutineForm(request.POST or None)
            #     if form.is_valid():
            #         name = request.POST['name']
            #         created_by = request.user.userprofile
            #         existingroutine = Existingroutine(name=name, created_by=created_by)
            #         existingroutine.save()
            #         return redirect('display_existing_routines')
            # else:
            #     form = ExistingroutineForm(request.POST or None)
            #
            # return render(request, 'habits/existingroutine/create_existingroutine.html', {'form':form})

    # def post(self, request):
    #     print('post')
    #     habits = Habit.objects.filter(created_by=request.user.userprofile, is_active=True).order_by("priority")
    #
    #     if request.is_ajax():
    #         list = request.POST.get('result')
    #         print(list)
    #         list = list.split("&")
    #         print(list)
    #         print(len(habits))
    #
    #         if (len(list) != 1 and list[0] != ''):
    #             _priority = 1;
    #             for habit in range(0, len(habits)):
    #                 print(habit)
    #                 habitWithID = list[habit].split("=")
    #                 print('habitWithID' + str(habitWithID))
    #
    #                 habitToUpdate = Habit.objects.get(id=habitWithID[1])
    #                 habitToUpdate.priority = _priority
    #                 habitToUpdate.save()
    #                 _priority += 1
    #
    #         data = {"result":list}
    #         return JsonResponse(data)
    #     return redirect('display_habits')


class HabitDetailView(DetailView):
    model = Habit
    template_name = 'habits/display_habit_detail.html'

class HabitUpdateView(UpdateView):
    model = Habit
    form_class = HabitUpdateForm
    template_name = 'habits/display_habit_to_update.html'

    def get_context_data(self, **kwargs):
        # Call the base implementation first to get a context
        context = super(HabitUpdateView, self).get_context_data(**kwargs)
        # Add in a QuerySet of all the books
        context['habits'] = Habit.objects.filter(created_by=self.request.user.id, is_active=True)
        context['routines'] = Existingroutine.objects.filter(created_by=self.request.user.id)
        context['targetbehaviors']= Targetbehavior.objects.filter(created_by=self.request.user.id)

        context['habitToUpdate'] = self.get_object()
        return context

class HabitDeleteView(DeleteView):
    model = Habit
    context_object_name = 'habits'
    template_name = 'habits/display_habit_to_delete_confirm.html'
    # success_url = reverse_lazy('display_habits')
    def get_queryset(self):
        print('get_queryset_HabitDeleteView')
        queryset = Habit.objects.filter(created_by=self.request.user.id, is_active=True)
        print(queryset)
        return queryset

    def get_context_data(self, **kwargs):
        # Call the base implementation first to get a context
        context = super(HabitDeleteView, self).get_context_data(**kwargs)
        # Add in a QuerySet of all the books
        context['habits'] = Habit.objects.filter(created_by=self.request.user.id, is_active=True)
        context['habitToDelete'] = self.get_object()
        print('hier')
        print(self.get_object())
        return context

    def get_success_url(self):
        return reverse_lazy('display_habits')


    # Existing routine

class ExistingroutineDelete(DeleteView):
    model = Existingroutine
    success_url = reverse_lazy('display_existing_routines')
    template_name = 'habits/existingroutine/delete_existingroutine.html'

class ExistingroutineUpdate(UpdateView):
    model = Existingroutine
    fields = ('name',)
    success_url = reverse_lazy('display_existing_routines')
    template_name = 'habits/existingroutine/update_existingroutine.html'


    # Targetbehavior

class TargetbehaviorDelete(DeleteView):
    model = Targetbehavior
    success_url = reverse_lazy('display_targetbehavior')
    template_name = 'habits/targetbehavior/delete_targetbehavior.html'

class TargetbehaviorUpdate(UpdateView):
    model = Targetbehavior
    fields = ('name',)
    success_url = reverse_lazy('display_targetbehavior')
    template_name = 'habits/targetbehavior/update_targetbehavior.html'
