from django.urls import path
from . import views

app_name = 'students'
urlpatterns = [
    path('', views.index, name='index'),  # READ Logic - Index
    path('new/', views.new, name='new'),    # CREATE Logic 1 - 사용자에게 폼 전달
    path('create/', views.create, name='create'),  # CREATE Logic 2 - 데이터베이스에 저장
    path('<int:student_pk>/', views.detail, name='detail'),    # READ Logic - Detail
    path('<int:student_pk>/delete/', views.delete, name='delete'),  # DELETE Logic
    path('<int:student_pk>/edit/', views.edit, name='edit'), # UPDATE Logic - 폼 전달
    path('<int:student_pk>/update/', views.update, name='update'), # UPDATE Logic - DB 저장
]
