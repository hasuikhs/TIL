# Django Form 마무리

## 1. URL Resolver

- CREATE 로직과 UPDATE 로직이 같은 form.html을 공유하고 있는데, 둘다 `<h1>CREATE</h1>`라는 헤더가 출력되고 있따.

- URL Resolver는 사용자가 요청한 URL과 장고 내부로 들어오는 URL 사이에서 번역 역할을 해준다.

  - `form.html`

  ```django
  ...
  {% block body %}
  {% if request.resolver_match.url_name == 'create' %}
    <h1 class="text-center">CREATE</h1>
  {% else %}
    <h1 class="text-center">UPDATE</h1>
  {% endif %}
  <form action="" method="POST">
  ...   
  {% if request.resolver_match.url_name == 'create' %}
  <a href="{% url 'articles:index' %}">[BACK]</a>
  {% else %}
  <a href="{% url 'articles:detail' article.pk %}">[BACK]</a>
  {% endif %}
  {% endblock %}
  ```

  - `views.py`

  ```python
  def update(request, article_pk):
      article = get_object_or_404(Article, pk=article_pk)
      if request.method == 'POST':
          ...
      else:
          ...
      context = {
          'form' : form,
          'article' : article,	# 추가 해야 업데이트시 디테일 페이지 열수 있음 
      }
      
      return render(request, 'articles/form.html', context)
  ```

-----

## 2. Django Bootstrap

- `bootstrap4 를 깔자.`

```bash
STU@DESKTOP-4VU7OGG MINGW64 ~/Documents/Git/TIL/05_Django (master)
$ pip install bootstrap4
```

- `base.html` 에서 넣어줬던 부트스트랩을 바꿔주자.

```django
{% load bootstrap4 %}
<!DOCTYPE html>
<html lang="ko">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>PJT1</title>
    <!-- Bootstrap CSS -->
    {% bootstrap_css %}
</head>

<body>
    <div class="container">
    {% if user.is_authenticated %}
        <h2>어서오세요, {{ user.username}}</h2>
        <a href="{% url 'accounts:logout' %}">로그아웃</a>
    {% else %}
        <a href="{% url 'accounts:login' %}">로그인</a>
        <a href="{% url 'accounts:signup' %}">회원가입</a>
    {% endif %}
    
    
        {% block body %}
        {% endblock  %}
    </div>

    <!-- Bootstrap JS-->
    {% bootstrap_javascript jquery='full' %}
</body>

</html>
```

- `form.html` 도 바꿔주자.

```django
{% extends 'base.html' %}
{% load bootstrap4 %}
{% block body %}
{% if request.resolver_match.url_name == 'create' %}
<h1 class="text-center">CREATE</h1>
{% else %}
<h1 class="text-center">UPDATE</h1>
{% endif %}
<!--
  action 값이 공백일 경우, 현재 위치하고 있는 주소로 요청을 보낸다.
  폼을 던져주는 경로, DB에 저장하는 경로가 동일하다면 공백으로 해도 정상적으로 동작한다.  
-->

<div class="container">
  <form action="" method="POST">
    {% csrf_token %}
    {% comment %} {{ form.as_p }} {% endcomment %}
    {% bootstrap_form form layout='inline' %}
    <div class="text-center">
      {% buttons submit='제출' reset='초기화' %}{% endbuttons %}
    </div </form> </div> <hr>
</div>
{% if request.resolver_match.url_name == 'create' %}
<a href="{% url 'articles:index' %}">[BACK]</a>
{% else %}
<a href="{% url 'articles:detail' article.pk %}">[BACK]</a>
{% endif %}
{% endblock  %}
```

-----

## 3. Comment-ModelForm

- **Comment 모델 생성**

  ```python
  class Comment(models.Model):
      article = models.ForeignKey(Article, on_delete=models.CASCADE)
      content = models.CharField(max_length=250)
      created_at = models.DateTimeField(auto_now_add=True)
      updated_at = models.DateTimeField(auto_now=True)
  
      # Model Loevel에서 메타데이터 옵션 설정 -> 정렬 기능 사용
      class Meta:
          ordering=['-pk',]
  
      # 객체 표현 방식
      def __str__(self):
          return self.content
  ```

- **Comment ModelForm 생성**

  ```python
  class CommentForm(forms.ModelForm):
      content = forms.CharField(
          label='내용',
          widget=forms.CharField(
              attrs={
                  'class' : 'content',
                  'placeholder' : '내용 입력해라...',
              }
          )
      )
      class Meta:
          model = Comment
          fields = '__all__'
  ```

- **`admin.py` 등록**

  ```python
  from .models import Comment
  
  class CommentAdmin(admin.ModelAdmin):
      list_display = ('pk', 'article', 'content', 'created_at', 'updated_at',)
  
  admin.site.register(Comment, CommentAdmin)
  ```


-----

## 4. View Decorators

> Django가 제공하는 decorator 활용하기



### 4.1 require_POST

- view 함수가 POST 메서드 요청만 승인하도록 하는 데코레이터
- 일치하지 않는 요청이면 `405 Method Not Allowed` 에러 발생시킴

```python
# views.py

@require_POST
def delete(request, article_pk):
    article = get_object_or_404(Article, pk=article_pk)
    article.delete()
    return redirect('articles:index')

@require_POST
def comments_create(request, article_pk):
    article = get_object_or_404(Article, pk=article_pk)
    comment_form = CommentForm(request.POST)
    if comment_form.is_valid():
        # save 메서드 -> 선택 인자 : (기본값) commit=True
        # DB에 바로 저장되는 것을 막아준다.
        comment = comment_form.save(commit=False)
        comment.article = article
        comment.save()
    return redirect('articles:detail', article.pk)
    

@require_POST
def comments_delete(request, article_pk, comment_pk):
    comment = get_object_or_404(Comment, pk=comment_pk)
    comment.delete()
    return redirect('articles:detail', article_pk)
```