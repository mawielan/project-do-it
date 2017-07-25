from django.conf.urls import include, url
from habits import views as habits_views

urlpatterns = [
    #url(r'^$', habits_views.display_habits, name='display_habits'),
    url(r'^$', habits_views.HabitListView.as_view(), name='display_habits'),

    url(r'^saveOrder/$', habits_views.HabitListView.as_view(), name='save_order'),

    url(r'^position/$', habits_views.locate_position, name='locate_position'),

    url(r'^habit/(?P<pk>\d+)$', habits_views.HabitDetailView.as_view(), name='display_habit_details'),
    url(r'^habit/(?P<pk>\d+)/update$', habits_views.HabitUpdateView.as_view(), name='update_habit'),
    url(r'^habit/update/complete$', habits_views.update_habit_complete, name='update_habit_complete'),
    url(r'^habit/(?P<pk>\d+)/delete$', habits_views.HabitDeleteView.as_view(), name='delete_habit'),
    url(r'^habit/(?P<id>\d+)/share/tweet', habits_views.tweet_habit, name='tweet_habit'),
    url(r'^habit/(?P<id>\d+)/share/post', habits_views.post_habit, name='post_habit'),
    url(r'^habit/(?P<id>\d+)/share/gplus', habits_views.gplus_habit, name='gplus_habit'),
    url(r'^habit/(?P<id>\d+)/share/mail', habits_views.mail_habit, name='mail_habit'),

    #url(r'^habit/details/(?P<id>\w{0,50})/$', habits_views.display_habit_details, name='display_habit_details'),
    #url(r'^habit/details/(?P<id>\w{0,50})/delete/$', habits_views.delete_habit, name='delete_habit'),
    #url(r'^habit/details/(?P<id>\w{0,50})/update/$', habits_views.update_habit, name='update_habit'),
    #url(r'^habit/details/(?P<pk>\w{0,50})/upate/$', habits_views.HabitUpdate.as_view(), name='update_habit'),

    # State
    url(r'^habit/state/$', habits_views.set_state, name='set_state'),

    # Comments
    url(r'^habit/comment/save/$', habits_views.save_comment, name='save_comment'),
    url(r'^habit/comments/$', habits_views.get_comments, name='get_comments'),


    url(r'^habit/create/$', habits_views.display_habitToCreate, name='display_habitToCreate'),
    url(r'^habit/save/$', habits_views.save_habit, name='save_habit'),
    # url(r'^habit/markdown_uploader/$', habits_views.markdown_uploader, name='markdown_uploader_page'),
    url(r'^habit/upload_habit_image/$', habits_views.upload_habit_image, name='upload_habit_image'),
    url(r'^habit/edit/$', habits_views.edit_habit, name='edit_habit'),


    url(r'^habitmanagement/$', habits_views.ManageHabits.as_view(), name='manage_habits'),

    url(r'^existingroutines/$', habits_views.display_existing_routines, name='display_existing_routines'),
    url(r'^existingroutines/create/$', habits_views.create_existing_routine, name='create_existing_routine'),
    url(r'^existingroutines/select/(?P<id>\w{0,50})/$', habits_views.select_existing_routine, name='select_existing_routine'),
    url(r'^existingroutines/update/(?P<pk>\w{0,50})/$', habits_views.ExistingroutineUpdate.as_view(), name='update_existing_routine'),
    url(r'^existingroutines/delete/(?P<pk>\w{0,50})/$', habits_views.ExistingroutineDelete.as_view(), name='delete_existing_routine'),
    url(r'^targetbehavior/$', habits_views.display_targetbehavior, name='display_targetbehavior'),
    url(r'^targetbehavior/create/$', habits_views.create_targetbehavior, name='create_targetbehavior'),
    url(r'^targetbehavior/select/(?P<id>\w{0,50})/$', habits_views.select_targetbehavior, name='select_targetbehavior'),
    url(r'^targetbehavior/update/(?P<pk>\w{0,50})/$', habits_views.TargetbehaviorUpdate.as_view(), name='update_targetbehavior'),
    url(r'^targetbehavior/delete/(?P<pk>\w{0,50})/$', habits_views.TargetbehaviorDelete.as_view(), name='delete_targetbehavior'),
]
