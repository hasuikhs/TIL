# 종합 실습 프로젝트 2

## 0. 개발 환경 설정

### 0.1 프로젝트 경로 및 앱 생성

#### 0.1.1 경로 생성

```bash
$ mkdir 07_django_PJT_2
```

#### 0.1.2 pip install

```bash
$ pip install django

$ pip install django-bootstrap4

$ pip install bootstrap4
```

#### 0.1.3 Project 생성

```bash
$ django-admin startproject config .
```

#### 0.1.4 Application 생성

```bash
$ python manage.py startapp movies
```

#### 0.1.5 `config/settings.py` 설정

```python
...
INSTALLED_APPS = [
    'movies',
    'bootstrap4',
    ...
]
...
LANGUAGE_CODE = 'ko-kr'

TIME_ZONE = 'Asia/Seoul'
...
```

### 0.2 URL 분리 & `app_name` 설정

- `movies/` 에 `urls.py ` 생성

  ```python
  from django.urls import path
  from . import views
  
  app_name = 'movies'
  urlpatterns=[
      # 현재는 비어 있음
  ]
  ```

- `config/urls.py`

  ```python
  urlpatterns = [
      ...
      path('movies/', include('movies.urls')),
  ]
  ```

### 0.3 템플릿 경로 커스터마이징

- `config/` 에 `templates/movies/` 생성

```
config/
	templates/
		movies/
```

- `templates/` 에 `base.html` 생성

```django
<!-- base.html -->
<!DOCTYPE html>
{% load bootstrap4 %}
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>auth</title>
    <!-- Bootstrap CSS -->
    {% bootstrap_css %}   
</head>

<body>
    <div class="container">
        {% block body %}
        {% endblock  %}
    </div>
    <!-- Bootstrap JS-->
    {% bootstrap_javascript jquery='full' %}
</body>
</html>
```

- `config/settings.py`템플릿 탐색 경로 수정

```python
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'config', 'templates')],
        'APP_DIRS': True,
        ...
    },
]
```

-----

## 1. 데이터베이스 모델링

- Movie

![image-20191116171341579](README.assets/image-20191116171341579.png)

- Rating

![image-20191116172914453](README.assets/image-20191116172914453.png)

```python
# movies/models.py
class User(models.Model):
    name = models.TextField()

    def __str__(self):
        return f'{self.name}'
        
class Movie(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    poster = models.ImageField()
    created_at = models.DateField(auto_now_add=True)
    updated_at = models.DateField(auto_now=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.title}'

class Rating(models.Model):
    score = models.FloatField()
    content = models.CharField(max_length=100)
    created_at = models.DateField(auto_now_add=True)
    updated_at = models.DateField(auto_now=True)
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.score}'
```

- 이제 마이그레이션 하자.

```bash
$ python manage.py makemigrations

$ python manage.py migrate
```

-----

## 2. Accounts

### 2.1 accoutns Application 생성

```bash
$ python manage.py startapp accounts
```

- `INSTALLED_APPS` 등록

```python
INSTALLED_APPS = [
    'accounts',
]
```

- URL 분리

```python
# config/urls.py

urlpatterns = [
    path('accounts/', include('accounts.urls')),
]

# accounts/urls.py

from django.urls import path
from . import views

app_name = 'accounts'
urlpatterns = [
    # 비워두자
]
```

### 2.2 SignUp

- `accounts/views.py`

```python
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth import login as auth_login

def signup(request):
    if request.method == 'POST':
        # Django에서 기본적으로 제공하는 폼
        form = UserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            # 회원가입후 자동으로 로그인이 되는 로직
            auth_login(request, user)
            return redirect('movies:index')
    else:
        form = UserCreationForm
    context = { 'form' : form }
    return render(request, 'accounts/auth_form.html', context)
```

- `templates/accounts/auth_form.html`

```django
{% extends 'base.html' %}
{% load bootstrap4 %}
{% block body %}
{% if request.resolver_match.url_name == 'signup' %}
    <h1>회원가입</h1>
{% if request.resolver_match.url_name == 'login' %}
    <h1>로그인</h1>
{% endif %}
<hr>
<form action="" method="POST">
    {% csrf_token %}
    {% bootstrap_form form %}
    {% buttons submit='제출' reset='초기화' %}
    {% endbuttons %}
</form>
{% endblock %}
```

- 실행 화면

![image-20191116185221298](README.assets/image-20191116185221298.png)

### 2.3 LogIn

- `accounts/views.py`

```python
def login(request):
    if request.user.is_authenticated:
        return redirect('movies:index')

    if request.method=='POST': 
        form = AuthenticationForm(request, request.POST)
        if form.is_valid():
            auth_login(request, form.get_user())
            return redirect(request.GET.get('next') or 'movies:index')
    else:
        form = AuthenticationForm()
    context = {'form' : form}
    return render(request, 'accounts/auth_form.html', context)
```

- `accounts/urls.py`

```python
urlpatterns = [
    path('login/', views.login, name='login'),
]
```

### 2.4 LogOut

- `accounts/views.py`

```python
from django.contrib.auth import logout as auth_logout
from django.contrib.auth.decorators import login_required

@login_required
def logout(request):
    auth_logout(request)
    return redirect('movies:index')
```

-----

## 3. Movie

### 3.1 Index

- `movies/views.py`

```python
from .models import Movie

# Create your views here.
def index(request):
    movie = Movie.objects.all()
    context = {'movies' : movie}
    return render(request, 'movies/index.html', context)
```

- `movies/urls.py`

```python
urlpatterns=[
    path('', views.index, name='index'),
]
```

- `config/templates/movies/index.html`

```django
{% extends 'base.html' %}

{% block body %}
<h1 class="text-center">Movies</h1>
<a href="{% url 'movies:create' %}">[새 영화 등록]</a>
<hr>
{% for movie in movies %}
   <p>
    [{{ movie.pk }}] {{ movie.title }}
  </p>
<hr>
{% endfor %}
{% endblock  %}
```

- `127.0.0.1:8000/movies/` 로 접속시

![image-20191116202154068](README.assets/image-20191116202154068.png)

### 3.2 Create

![image-20191116202545168](README.assets/image-20191116202545168.png)

- `movies/views.py`

```python
def new(request):
    if request.method == 'POST':

        title = request.POST.get('title')
        description = request.POST.get('description')
        poster = request.POST.get('poster')

        movie = Movie(title=title, description=description, poster=poster)
        movie.save()

        return redirect(f'/movies/{movie.pk}/')
    else:
        return render(request, 'movies/new.html')
```

- `movies/urls.py`

```python
urlpatterns=[
    path('new/', views.new, name='new'),
]
```

- `config/templates/movies/new.html`

```django
{% extends 'base.html' %}

{% block body %}
<h1 class="text-center">영화 등록</h1>
<form action="/movies/new/" method="POST">
{% csrf_token %}
  영화명 : <input type="text" name="title"><br>
  영화 소개 : <br>
  <textarea name="description" cols="30" rows="10"></textarea>
  포스터 : <input type="file" name="poster">
  <input type="submit">
</form>
<hr>
<a href="/movies/">[영화 목록으로]</a>
{% endblock %}
```

### 3.3 Detail

- `movies/views.py`

```python
def detail(request, movie_pk):
    movie = Movie.objects.get(pk=movie_pk)
    comments = movie.comment_set.all()
    context = {
         'movie' : movie,
         'comments' : comments,
    }
    return render(request, 'movies/detail.html', context)
```

- `movies/urls.py`

```python
urlpatterns=[
    path('<int:movie_pk>/', views.detail, name='detail'),
]
```

- `config/templates/movies/detail.html`

```django
{% extends 'base.html' %}

{% block body %}
<h1 class="text-center">영화 상세 정보</h1>
<table>
<tr>
<td>영화명 : <td>
<td>{{ movie.title }}</td>
</tr>
<tr>
<td>영화 소개</td>
<td> {{ movie.description }}</td>
</tr>
<tr>
<td>포스터</td>
<td>{{ movie.poster }}</td>
</tr>
</table>
<div class="btn-group" role="group" aria-label="Basic example">
  <button type="button" class="btn btn-secondary" onclick="location.href='{% url 'movies:index' %}'">영화 목록으로</button>
  <button type="button" class="btn btn-secondary" onclick="location.href='{% url 'movies:update' movie.pk %}'">영화 정보 수정하기</button>
  <button type="button" class="btn btn-secondary" onclick="location.href='{% url 'movies:delete' movie.pk %}'">영화 삭제하기</button>
</div>
<hr>
{% endblock %}
```

### 3.5 Update

- `movies/views.py`

```python
def update(request, movie_pk):
    # 1. 수정할 게시글 인스턴스 가져오기
    movie = Movie.objects.get(pk=movie_pk)
    if request.method == 'POST':
        # 2. 폼에서 전달받은 데이터 덮어쓰기
        movie.title = request.POST.get('title')
        movie.description = request.POST.get('description')
        movie.poster = request.POST.get('poster')

        # 3. DB 저장
        movie.save()

        # 4. 저장 끝났으면 게시글 Detial로 이동시키기
        return redirect(f'/movies/{movie.pk}/')
    else:
        context = { 'movie': movie }
        return render(request, 'movies/update.html', context)
```

- `movies/urls.py`

```python
urlpatterns=[
    path('<int:movie_pk>/edit/', views.edit, name='edit'),
]
```

- `config/templates/movies/edit.html`

```django
{% extends 'base.html' %}

{% block body %}
<h1 class="text-center">영화 정보 수정</h1> 
<form action="{% url 'movies:edit' movie.pk %}" method="POST">
{% csrf_token %}
  영화명 : <input type="text" name="title" value="{{ movie.title }}"><br>
  영화 소개 : <br>
  <textarea name="description" cols="30" rows="10" value="{{ movie.description }}"></textarea>
  포스터 : <input type="file" name="poster">
  <input type="submit" onclick="alert('수정 되었습니다!');">
</form>
<hr>
<a href="/movies/">[영화 목록으로]</a>
{% endblock %}
```

### 3.6 Delete

- `movies/views.py`

```python
def delete(request, movie_pk):
    movie = Movie.objects.get(pk=movie_pk)
    movie.delete()
    return redirect('/movies/')
```

- `movies/urls.py`

```python
urlpatterns=[
    path('<int:movie_pk>/delete/', views.delete, name='delete'),
]
```

