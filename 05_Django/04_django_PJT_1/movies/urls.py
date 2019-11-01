from django.urls import path
from . import views

urlpatterns = [
    # movies/ 로 요청했을 경우 index 함수 실행
    # 아직은 만들지 않았으니 유의하자!
    path('', views.index),
]