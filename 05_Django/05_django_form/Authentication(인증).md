# Authentication(인증)

> Django에서 이미 Auth 관련 기능을 만들어두었고, 우리는 자연스럽게 사용하고 있었다. `createsuperuser`를 통해 관리자 계정도 만들었고, ````Admin 페이지에서 로그인 기능도 사용하고 있었다.

## 1. Accounts

- 기존 앱에서 구현해도 되지만, Django에서는 일반적으로 기능 단위로 애플리케이션을 나누는 것이 일반적이므로 `accounts`라는 새로운 앱을 만들어보자.

- accounts 앱 생성

  ```bash
  <venv>
  student@M150123 MINGW64 ~/Desktop/TIL/05_Django/05_django_form (master)
  $ python manage.py startapp accounts
  ```

- `INSTALLED_APPS` 에 accounts 등록

  ```python
  # settings.py
  
  INSTALLED_APPS = [
      'accounts',
      ...
  ]
  ```

- URL 분리

  ```python
  # config/urls.py
  
  urlpatterns = [
      path('accounts/', include('accounts.urls')),
   	...
  ]
  
  # accounts/urls.py
  
  from django.urls import path
  from . import views
  
  app_name = 'accounts'
  urlpatterns = [
      path('', views.signup, name='signup'),
      
  ]
  ```

  

## 2.SignUp

