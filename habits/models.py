from django.db import models
from accounts.models import UserProfile
import datetime
from django.urls import reverse


class Habit(models.Model):

    TRIGGER_OPTION_1 = 'Wenn ich...'
    TRIGGER_OPTION_2 = 'Bevor ich...'
    TRIGGER_OPTION_3 = 'Immer wenn ich...'
    TRIGGER_OPTION_4 = 'Jedes Mal wenn ich...'
    TRIGGER_OPTION_5 = 'Nachdem ich...'

    TRIGGER_CHOICES = (
        (TRIGGER_OPTION_1, TRIGGER_OPTION_1),
        (TRIGGER_OPTION_2, TRIGGER_OPTION_2),
        (TRIGGER_OPTION_3, TRIGGER_OPTION_3),
        (TRIGGER_OPTION_4, TRIGGER_OPTION_4),
        (TRIGGER_OPTION_5, TRIGGER_OPTION_5),

    )

    priority = models.IntegerField(default=1)

    title = models.CharField(max_length=200)
    trigger = models.CharField(max_length=15, choices=TRIGGER_CHOICES, default=TRIGGER_OPTION_5)
    existingroutine = models.ForeignKey(
        'Existingroutine',
        on_delete=models.SET_NULL,
        blank=True,
        null = True,
    )
    targetbehavior = models.ForeignKey(
        'Targetbehavior',
        on_delete=models.SET_NULL,
        blank=True,
        null = True,
    )

    image = models.ImageField(upload_to='habit_image', blank=True)

    created_by = models.ForeignKey(UserProfile, on_delete=models.SET_NULL, null=True, blank=True)

    STATUS_CHOICES = ((True, 'active'), (False, 'inactive'))

    is_active = models.BooleanField(choices=STATUS_CHOICES, default=True)

    created_at = models.DateTimeField(default=datetime.datetime.now, blank=True)

    triggered_at_time = models.TimeField(blank=True, null=True)
    triggered_at_date = models.DateField(blank=True, null=True)

    # comments = models.ManyToManyField('Comment')


    def __str__(self):
        habitpresentation = self.title # '\on ' + self.trigger + '\n ' + str(self.existingroutine) + '\n ' + str(self.targetbehavior)
        return habitpresentation


    def get_absolute_url(self):
      return reverse('display_habit_details', args=[str(self.id)])

    def image_url(self):
        #print(self.image.url)
        if self.image and hasattr(self.image, 'url'):
            return self.image.url
        else:
            return None;

    def renderExistingroutine(self):
        if self.existingroutine == None:
            return '-nothing selected-'
        else:
            return self.existingroutine.name

    def renderTargetbehavior(self):
        if self.targetbehavior == None:
            return '-nothing selected-'
        else:
            return self.targetbehavior.name

class Existingroutine(models.Model):
    name = models.CharField(max_length=75)
    created_by = models.ForeignKey(UserProfile, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return self.name

class Targetbehavior(models.Model):
    name = models.CharField(max_length=75)
    created_by = models.ForeignKey(UserProfile, on_delete=models.SET_NULL, null=True)
    def __str__(self):
        return self.name


class Comment(models.Model):
    comment = models.CharField(max_length=100)
    created_at =  models.DateField(blank=True, default=datetime.datetime.now)
    created_by = models.ForeignKey(UserProfile, on_delete=models.SET_NULL, null=True)
    # related_habit = models.ForeignKey('Habit', related_name="habit_comments", null=True, blank=True)
    related_habit = models.ForeignKey('Habit',null=True, blank=True)
    def __str__(self):
        return self.comment
