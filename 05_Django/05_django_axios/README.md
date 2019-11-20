## 0. Image Resizing

- Python & Django 이미지 관련 라이브러리

  ```bash
  # 설치 순서 주의! (의존성 있음)
  
  $ pip install Pillow
  $ pip install pilkit
  $ pip install django-imagekit
  ```

  - `Pillow` : PIL(Python Image Library) 프로젝트에서 fork되어서 나온 라이브러리. 

    ​                 Python3를 지원하지 않기 때문에 Pillow를 많이 씀

  - `pilkit` : Pillow를 쉽게 쓸 수 있도록 도와주는 라이브러리. 다양한 Processors 지원

    - Thumbnail
    - Resize
    - Crop...

  - `django-imagekit` : 이미지 썸네일 Helper

- **INSTALLED_APPS 등록**

  ```python
  # settings.py
  INSTALLED_APPS = [
      ...
      'imagekit',
      ...
  ]
  ```

- 모델링

  ```python
  from imagekit.models import ProcessedImageField
  from imagekit.processors import Thumbnail
  
  from django.db import models
  
  # Create your models here.
  class Article(models.Model):
      ...
      # image = models.ImageField(blank=True)
      image = ProcessedImageField(
          processors=[Thumbnail(200, 300)], # 처리할 작업
          format="JPEG",                  # 이미지 포멧
          options={'quality' : 90},       # 각종 추가 옵션
          upload_to='articles/images'     # 저장 위치
          # 실제 경로 -> MEDIA_ROOT/articles/images
      )
      ...
  ```

- Migration

  ```bash
  $ python manage.py makemigrations
  $ python manage.py migrate
  ```

  - `ProcessedImageField`의 인자로 들어가는 옵션들은 수정을 하더라도 다시 migration 하지 않아도 바로바로 적용이 된다.

## 1. 사전 준비

> Django Form을 적용하기 전, 이때까지 우리가 학습했던 HTML Form으로 앱을 구현해보자.

- **프로젝트 생성**

  ```bash
  $ mkdir 04_django_form
  $ cd 04_django_form
  ```

  ```bash
  $ django-admin startproject config .
  ```

- **앱 생성**

  ```bash
  $ python manage.py startapp articles
  ```

- **Article Model**

  ```python
  # models.py
  
  class Article(models.Model):
      title = models.CharField(max_length=100)
      content = models.TextField()
      created_at = models.DateTimeField(auto_now_add=True)
      updated_at = models.DateTimeField(auto_now=True)
  
      # 객체 표시 형식 수정
      def __str__(self):
          return f'[{self.pk}] {self.title}'
  ```

  - 잊지 말자 출생신고

- **URL 설정**

  ```python
  # config/urls.py
  
  from django.contrib import admin
  from django.urls import path, include
  
  urlpatterns = [
      path('articles/', include('articles.urls')),
      path('admin/', admin.site.urls),
  ]
  ```

  ```python
  # articles/urls.py
  
  from django.urls import path
  from . import views
  
  app_name = 'articles'
  urlpatterns = [
      path('', views.index, name='index'),
  ]
  ```

- **`base.html` 생성**

- **Index 페이지(-> 모든 게시글 보여주기)**

  ```python
  # views.py
  def index(request):
      articles = Article.objects.all()[::-1]
      context = {'articles' : articles}
      return render(request, 'articles/index.html', context)
  ```

  ```django
  <!-- index.html -->
  {% extends 'base.html' %}
  
  {% block body %}
  <h1 class="text-center">Articles</h1>
  <a href="{% url 'articles:create' %}">[NEW]</a>
  <hr>
  {% for article in articles %}
  <p>번호 : {{ article.pk }}</p>
  <p>제목 : {{ article.title }}</p>
  <a href="{% url 'articles:detail' article.pk %}">[DETAIL]</a>
  {% endfor %}
  {% endblock  %}
  ```

- **Create 페이지**

  ```python
  # views.py
  def create(request):
      if request.method == 'POST':
          title = request.POST.get('title')
          content = request.POST.get('content')
          article = Article(title=title, content=content)
          article.save()
          return redirect('articles:detail', article.pk)
      else:
          return render(request, 'articles/create.html')
  ```

  ```django
  <!-- create.html -->
  {% extends 'base.html' %}
  
  {% block body %}
  <h1 class="text-center">CREATE</h1>
  <!--
    action 값이 공백일 경우, 현재 위치하고 있는 주소로 요청을 보낸다.
    폼을 던져주는 경로, DB에 저장하는 경로가 동일하다면 공백으로 해도 정상적으로 동작한다.  
  -->
  <form action="" method="POST">
    {% csrf_token %}
    <label for="title">TITLE</label>
    <input type="text" id="title" name="title"><br>
    <label for="content">CONTENT</label><br>
    <textarea id="content" name="content"></textarea><br>
    <input type="submit">
  </form>
  <hr>
  <a href="{% url 'articles:index' %}">[BACK]</a>
  {% endblock  %}
  ```

- **Detail 페이지**

  ```python
  # views.py
  def detail(request, article_pk):
      article = Article.objects.get(pk=article_pk)
      context = { 'article' : article }
      return render(request, 'articles/detail.html', context)
  ```

  ```django
  <!-- detail.html -->
  {% extends 'base.html' %}
  
  {% block body %}
  <h1>DETAIL</h1>
  <hr>
  <p>글 번호 : {{ article.pk }}</p>
  <p>글 제목 : {{ article.title }}</p>
  <p>글 내용 : {{ article.content }}</p>
  <p>글 생성 시각 : {{ article.created_at }}</p>
  <p>글 수정 시각 : {{ article.updated_at }}</p>
  <hr>
  <a href="{% url 'articles:index' %}">[BACK]</a>
  {% endblock  %}
  ```

## 2. Django Form

> Django에서 제공하는 Form 클래스를 이용해서 편리하게 폼 정보를 관리하고 유효성 검증을 진행하고, 비유효 field에 대한 에러 메시지를 결정한다.
>
>  
>
> 즉, HTML으로 Form 입력을 관리하던 것을 Django에서 제공하는 Form 클래스로 바꿔보는 작업을 해보자.



- Form의 장점(-> 자동화)
  - `blank=True`와 같은 옵션을 따로 지정해주지 않았으면, HTML 태그에 required 옵션을 달아준다.
  - 기존에 max_length와 같은 조건을 어길 경우 에러 페이지를 출력했는데, Django Form을 써서 에러 메시지를 출력해준다.

```python
# views.py

def create(request):
    # POST 요청 -> 데이터를 받아서 DB에 저장
    if request.method == 'POST':
        # Binding 과정
        # 폼 인스턴스를 생성하고, 전달받은 데이터를 채운다.
        # 인스턴스에 데이터를 채워서, 유효성 검증을 진행한다.
        form = ArticleForm(request.POST)
        embed()
        if form.is_valid():
            # cleaned_data를 통해 딕셔너리 안 데이터를 검증한다.
            title = form.cleaned_data.get('title')
            content = form.cleaned_data.get('content')
            article = Article.objects.create(title=title, content=content)
        return redirect('articles:detail', article.pk)
    else:
        form = ArticleForm()

    # form으로 전달받는 형태가 2가지
    # 1. GET요청 -> 비어있는 폼 전달
    # 2. 유효성 검증 실패 -> 에러 메시지를 포함한 채로 폼 전달
    context = {'form': form}
    return render(request, 'articles/create.html', context)
```

```bash
In [1]: form
Out[1]: <ArticleForm bound=True, valid=Unknown, fields=(title;content)>

In [3]: request.POST
Out[3]: <QueryDict: {'csrfmiddlewaretoken': ['cSitwCCtr6MF05KKfln3Ivt5RBVOk28Z9D6B9Qd37q0680qFK5blacE3Hn1lOV9x'], 'title': ['asdf'], 'content': ['asdfasdf']}>

In [4]: type(form)
Out[4]: articles.forms.ArticleForm

In [5]: form.is_valid()
Out[5]: True

In [6]: form
Out[6]: <ArticleForm bound=True, valid=True, fields=(title;content)>

In [7]: form.cleaned_data
Out[7]: {'title': 'asdf', 'content': 'asdfasdf'}

In [8]: type(form.cleaned_data)
Out[8]: dict

In [9]: form.cleaned_data.get('title')
Out[9]: 'asdf'
```

```html
<form action="" method="POST">
	{% csrf_token %}
    {{ form.as_p }}
</form>
```

**get_object_or_404**

- 500 에러는 내부 서버 오류로, '서버에 오류가 발생하여 요청을 처리할 수 없다'는 의미다. 예를 들어 articles/3598165와 같이 존재하지 않는 상세정보 페이지를 요청하면 500 에러가 발생한다.
- 하지만 이경우엔 사용자의 요청이 잘못된 경우이기 때문에 '서버에 존재하지 않는 페이지에 대한 요청'이라는 의미를 가진 404 에러를 돌려주어야 한다.
  - 500 에러를 돌려주면 "선생님, 깃헙 폭파됐는데요?"라는 말이 나올거고, 404 에러를 돌려주면 "아, 선생님이 주소를 잘못 줬거나 내가 잘못 쳣꾸나..."라는 말이 나올 것.

```python
# views.py
from django.shortcuts import render, redirect, get_object_or_404

def detail(request, article_pk):
    article = get_object_or_404(Article, pk=article_pk)
    context= {'article': article}
    return render(requestm 'articles/detail.html', context)
```

## 3. Django ModelForm

- 개념 

  - Django의 큰 특징 중 하나
  - Model 클래스 정의와 비슷하게 Form 클래스를 선언할 수 잇따.

- 역할

  1. HTML 입력 폼 생성 : `as_p()`, `as_table()`
  2. 유효성 검증 : `is_valid()`
  3. 검증 통과한 값 딕셔너리로 제공 : `cleaned_data`

- `Form` VS `ModelForm`

  ```python
  # forms.py
  
  # Django Form
  class ArticleForm(forms.form):
      title = forms.CharField()
      content = forms.CharField()
      
  # Django ModelForm
  # Django가 건네받은 모델을 기준으로 폼 양식에 필요한 대부분을 전부 만들어준다.
  class ArticleForm(forms.ModelForm):
      class Meta:
          model = Article
          fields = '__all__'
  ```

  ```python
  # views.py
  
  def create(request):
      # POST 요청 -> 데이터를 받아서 DB에 저장
      if request.method == 'POST':
          # Binding 과정
          # 폼 인스턴스를 생성하고, 전달받은 데이터를 채운다.
          # 인스턴스에 데이터를 채워서, 유효성 검증을 진행한다.
          form = ArticleForm(request.POST)
          if form.is_valid():
              # cleaned_data를 통해 딕셔너리 안 데이터를 검증한다.
              title = form.cleaned_data.get('title')
              content = form.cleaned_data.get('content')
              article = Article.objects.create(title=title, content=content)
              
          return redirect('articles:detail', article.pk)
      else:
          context = {'form':form}
      	return render(request, 'articles/form.html', context)
  ```

  ```python
  # views.py
  
  def create(request):
      # POST 요청 -> 데이터를 받아서 DB에 저장
      if request.method == 'POST':
          # Binding 과정
          # 폼 인스턴스를 생성하고, 전달받은 데이터를 채운다.
          # 인스턴스에 데이터를 채워서, 유효성 검증을 진행한다.
          form = ArticleForm(request.POST)
          if form.is_valid():
              article = form.save()
          return redirect('articles:detail', article.pk)
      else:
          form = ArticleForm()  
      context = {'form':form}
      return render(request, 'articles/form.html', context)
  ```

  



