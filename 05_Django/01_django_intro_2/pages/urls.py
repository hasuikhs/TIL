from django.urls import path
from . import views

urlpatterns = [
    path('static_sample/', views.static_sample),
    path('user_create/', views.user_create),
    path('user_new/', views.user_new),
    path('art/', views.art),
    path('result2/', views.result2),
    path('result/', views.result),
    path('input_text/', views.input_text),
    path('catch/', views.catch),
    path('throw/', views.throw),
    path('index/', views.index),
]
