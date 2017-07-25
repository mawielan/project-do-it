from django.contrib import admin

from habits.models import Habit, Existingroutine, Targetbehavior, Comment




@admin.register(Habit)
class HabitAdmin(admin.ModelAdmin):
    list_display = ('priority', 'title', 'trigger', 'existingroutine', 'targetbehavior', 'image', 'created_by', 'is_active', 'triggered_at_time', 'triggered_at_date')
    actions = ['make_active', 'make_inactive']

    def make_active(self, request, queryset):
        rows_updated = queryset.update(is_active=True)
        if rows_updated == 1:
            message_bit = "1 story was"
        else:
            message_bit = "%s stories were" % rows_updated
        self.message_user(request, "%s successfully marked as active." % message_bit)
    make_active.short_description = "Mark selected habits as active"

    def make_inactive(self, request, queryset):
        rows_updated = queryset.update(is_active=False)
        if rows_updated == 1:
            message_bit = "1 story was"
        else:
            message_bit = "%s stories were" % rows_updated
        self.message_user(request, "%s successfully marked as inactive." % message_bit)
    make_inactive.short_description = "Mark selected habits as inactive"

@admin.register(Existingroutine)
class ExistingroutineAdmin(admin.ModelAdmin):
    list_display = ('name', 'created_by')

@admin.register(Targetbehavior)
class TargetbehaviorAdmin(admin.ModelAdmin):
    list_display = ('name', 'created_by')

@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ('comment', 'created_by', 'created_at', 'related_habit')
