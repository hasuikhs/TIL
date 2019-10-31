from django.urls import path
from . import views

app_name = 'jobs'
urlpatterns = [
    path('', views.index, name='index'),  # READ Logic - Index
    path('new/', views.new, name='new'),
    path('create/', views.create, name="create"),
    path('past_job/', views.past_job, name='past_job'),
]