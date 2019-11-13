# Like / Profile / Follow

## 1. Like

> `User`는 여러 개의 `Article`에 좋아요 표시를 할 수 있고, `Article`은 여러 명의 `User`에게 좋아요를 받을 수 있다.

### 1.1 Model 설정

- `blank=True`
  - 최초 작성되는 글에는 좋아요가 없고, 글이 작성되더라도 좋아요를 받지 못할 수도 있다.
  - 이 옵션을 줘서 유효성 검사를 통과한다.
  - 실제 데이터베이스는 null이 들어가는게 아니라 빈 스트링(`''`)형태로 들어간다.

```python
# article/models.py

class Article(models.Model):
    ...
    like_users = models.ManyToManyField(settings.AUTH_USER_MODEL,
                                        related_name='like_articles', blank=True)
```

- 현재 상황에서 `related_name` 설정은 필수
  - `like_users` 필드에 `related_name`을 쓰지 않으면, User 입장에서 `article_set`을 사용할 경우 user 필드를 갖고올지 `like_users`필드를 갖고 올지 인식하지 못한다.
  - `related_name` 설정과 함께 해당 필드는 `article_set`과 같은 방식으로 호출하지 못하고, `like_users` 방식으로 호출해야 된다.
- 사용할 수 있는 ORM 기능(명령어)
  - `user.article_set.all()` : 유저가 작성한 게시글 전부 - 1 : N
  - `user.like_articles.all()` : 유저가 좋아요 누른 게시글 전부 - M : N
  - `article.user` : 게시글 작성한 유저 - 1 : N
  - `article.like_users` : 게시글 좋아요 누른 유저 전부 - M : N

### 1.2 View & URL

- `exists()` & `filter()`
  - `filter()` : 특정한 조건에 맞는 레코드들을 가져온다.
  - `exists()` : 최소한 하나의 레코드가 존재하는지 여부를 말해준다.
- `get()` vs `filter()`
  - `get()` : 데이터가 없는 경우 에러 발생
  - `filter()` : 데이터가 없는 경우 에러가 발생하지 않음

```python
# articles/views.py
```

### 1.3 Template

#### 1.3.1 Template 분리(`_article.html`)

- 모듈화한 템플릿은 제목 앞에 언더스코어(_) 붙여주는 것이 코딩 컨벤션!

```
articles/
	templates/
		articles/
			_article.html
			index.html
			...
```

- Bootstrap Card 컴포넌트를 사용해서 예쁘게 꾸며보자.
  - Bootstrap 공식 홈페이지 -> Documentation -> Cards

```django
<!-- articles/index.html -->
...
<div class="row">
    {% for article in articles %}
    	{% include 'articles/_article.html' %}
    {% endfor %}
</div>
```

```django
<!-- articles/_article.html -->
<div class="col-12 col-md-6">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">{{ article.title }}</h5>
        <p class="card-text">
            ...
        {{ article.like_users.all|length }}명이 이글을 좋아합니다.<br>
        {{ article.created_at }}</p>
        <a href="{% url 'articles:detail' article.pk %}" class="btn btn-primary">상세보기</a>
      </div>
    </div>
</div>
```

![image-20191113104719969](C:%5CUsers%5Cstudent%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5Cimage-20191113104719969.png)

#### 1.3.2 Font-Awesome 아이콘 적용

> Font Awesome 홈페이지 가입후 Kits로 들어가서 코드 복사

```django
<!-- base.html -->
<!DOCTYPE html>
<html lang="ko">
<head>
    ....
   	<!-- font awesome -->
    <script src="https://kit.fontawesome.com/코드번호" crossorigin="anonymous"></script>
</head>
```

```django
<!-- articles/_article.html -->
...
<p class="card-text">
	<a href="{% url 'articles:like' article.pk %}"
    	{% comment %}사용자가 좋아요 안누른 상태 (빈하트){% endcomment %}
        {% if request.user in article.like_users.all %}
        {% comment %} python list in {% endcomment %}
        	<i class="fas fa-heart"></i>
      	{% comment %} 누른 상태 (꽉찬 하트) {% endcomment %}
        {% else %}
        	<i class="far fa-heart"></i>
        {% endif %}
	</a><br>
    {{ article.like_users.all|length }}명이 이글을 좋아합니다.<br>
    {{ article.created_at }}</p>
...
```

## 2. Profile

> 각 유저마다 프로필 페이지를 만들어주자.

- User에 대해서 CRUD 로직을 구현한다고 생각하면, READ(DETAIL)에 속한다.

### 2.1 View & URL

- User에 대한 CRUD 로직 대부분을 accounts 앱에서 구현했으므로, Profile 페이지 역시 accounts 앱에 구현해보자.

```python
# accounts/views.py

def profile(request, username):
  person = get_object_or_404(get_user_model(), username=username)
  context = {'person' : person}
  return render(request, 'accounts/profile.html', context)
```

```python
urlpatterns = [
    ...
    path('<str:username>/', views.profile, name='profile'),
]
```

```django
<!-- accounts/profile.html -->
{% extends 'base.html' %}

{% block body %}
<h1>{{ person.username }}님의 Profile</h1>
<hr>
<h3>{{ person.username }}님이 작성한 게시글</h3><hr>
<div class="row">
{% for article in person.article_set.all %}
<div class="col-12 col-sm-6 mb-3">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">{{ article.title }}</h5>
        <p class="card-text">
        {{ article.like_users.all|length }}명이 이글을 좋아합니다.<br>
        {{ article.created_at }}</p>
        <a href="{% url 'articles:detail' article.pk %}" class="btn btn-primary">상세보기</a>
      </div>
    </div>
</div>
{% endfor %}
</div>
<h3>{{ person.username }}님이 작성한 댓글</h3>
<div class="row">
    {% for comment in person.comment_set.all %}
    <div class="col-12 col-sm-4 mb-3">
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">{{ comment.content }}</h5>
                <p class="card-text">{{ comment.created_at|date:"SHORT_DATETIME_FORMAT" }}</p>
                <a href="{% url 'articles:detail' comment.article.pk %}" class="btn btn-primary">게시글 확인</a>
            </div>
        </div>
    </div>
    {% endfor %}
</div>
{% endblock  %}
```



## 3. Follow

- Follow는 User와 User의 M : N 관계다.
- Django가 제공하고 잇는 User 모델을 대체해서 사용한다. 처음부터 User 모델을 만드는게 아니라, Django가 개발자들이 자신만의 User 모델을 만들 수 있도록 제공해준다.
  - `AbstractUser`

### 3.1 User 모델 대체하기

```python
# accounts/models.py
from django.contrib.auth.models import AbstractUser
from django.conf import settings

# Create your models here.
class User(AbstractUser):
    followers = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='followings')
```

### 3.2 `articles/views.py`

```python
def detail(request, article_pk):
    article = get_object_or_404(Article, pk=article_pk)
    person = get_object_or_404(get_user_model(), pk=article.user_id)
    comment_form = CommentForm()
    comments = article.comment_set.all()
    context = {
        'article' : article,
        'comment_form' : comment_form,
        'comments' : comments,
        'person' : person,
    }
    return render(request, 'articles/detail.html', context)

@login_required
def follow(request, article_pk, user_pk):
    # 게시글 작성한 유저
    person = get_object_or_404(get_user_model(), pk=user_pk)
    # 지금 접속하고 있는 유저
    user = request.user
    if person != user:
        if person.followers.filter(pk=user.pk).exists():
            person.followers.remove(user)
        else:
            person.followers.add(user)
    # # 게시글 작성 유저 팔로워 목록에 접속 중인 유저가 있을 경우
    # # -> unfollow
    # if user in person.followers.all() :
    #     person.followers.remove(user)        
    # # 명단에 없으면
    # # -> follow
    # else:
    #     person.followers.add(user)
    # 게시글 상세정보로 redirect
    return redirect('articles:detail', article_pk)
```

```python
app_name = 'articles'
urlpatterns = [
    ...
    path('<int:article_pk>/follow/<int:user_pk>/', views.follow, name='follow'),
]
```

```django
<!-- _follow.html -->
<div class="jumbotron">
    <h1 class="display-4"></h1>
    <p class="lead">
        팔로워 : {{ person.followers.all|length }}명 | 팔로잉: {{ person.followings.all|length }}명
    </p>
    <hr class="my-4">
    {% if user != article.user %}
        <a class="btn btn-primary btn-lg" href="{% url 'articles:follow' article.pk person.pk %}" role="button">
        {% if request.user in person.followers.all %}
            UnFollow
        {% else %}
            Follow
        {% endif %}
        </a>
    {% endif %}
</div>
```

```django
<!-- detail.html -->
{% extends 'base.html' %}

{% block body %}
{% include 'articles/_follow.html' %}
...
```

