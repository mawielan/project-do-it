from django import forms
from habits.models import Habit, Existingroutine, Targetbehavior

class HabitForm(forms.ModelForm):
    class Meta:
        model = Habit
        fields = ( 'title', 'trigger', 'existingroutine', 'targetbehavior', 'image', 'created_by')



class HabitCreateForm(forms.ModelForm):
    # triggered_at_time = forms.TimeField(widget=forms.TimeInput(format='%H:%M'))
    class Meta:
        model = Habit
        fields = ( 'title', 'trigger', 'existingroutine', 'targetbehavior', 'image', 'triggered_at_time', 'triggered_at_date')

class HabitUpdateForm(forms.ModelForm):
    class Meta:
        model = Habit
        fields = ('title', 'trigger', 'existingroutine', 'targetbehavior', 'image')

class HabitToManageForm(forms.ModelForm):
    class Meta:
        model = Habit
        fields = ('is_active',)

class HabitImageForm(forms.ModelForm):
    class Meta:
        model = Habit
        fields = ('image',)



class ExistingroutineForm(forms.ModelForm):
    class Meta:
        model = Existingroutine
        fields = ('name',)

class TargetbehaviorForm(forms.ModelForm):
    class Meta:
        model = Targetbehavior
        fields = ('name',)

class SendMailForm(forms.Form):
    mail_from = forms.EmailField(max_length=60, required=True)
    mail_to = forms.EmailField(max_length=60, required=True)
    mail_subject = forms.CharField(widget=forms.TextInput(attrs={'placeholder': 'Subject'}), required=False)
    mail_body = forms.CharField(widget=forms.Textarea(attrs={'rows':16, 'cols':60}))
