# Hashtag / Social Login

## 1. Hashtag

### 1.1 Model

```python
class Hashtag(models.Model):
    content = models.TextField(unique=True)
    
    def __str__(self):
        return self.content
```

- `unique=True`
  - True인 경우, 필드는 테이블 전체에서 고유한 값이여야한다.
  - 유효성 검사 단계에서 실행되며, 중복 값이 있는 모델을 저장하려고 하면 `.save()` 메서드로 인해서 에러가 발생한다.

```
1. 사용자가 업로드한 content
"오늘 수능날이라고 한다... 하지만 난 오늘도 신나는 마음으로 출근을 한다... #행복 그 자체다... ㅎ.. 옛날 생각 나네 또.. #감성 #추억 #뿌듯 # 행복 #수능왕".split(')

2. split() 메소드로 리스트 형식으로 변환
['오늘', '수능날이라고', '한다...', ... '#행복', ... , '#감성', '#추억', '#뿌듯']

3. 리스트 반복문 돌리기 : 앞자리가 '#'으로 시작하는 단어를 해시태그 등록
- 같은 해시태그가 오면 unique=True 옵션으로 에러 발생, 이를 방지하기 위해 get_or_create() 사용.

4. 동시에 해당 게시글 해시태그 목록에 추가해줌
-> article.hashtags.add(word)
```

- `get_or_create()`
  - word와 같은 해시태그를 찾고있으면 기존 객체 반환, 없으면 새로운 객체 생성
  - `hashtag, created = Hashtag.objects.get_or_create(content=word)`
    - 새로운 객체 생성되면 `created=True`
    - 기존 객체 반환되면 `created=False`

### 1.2 CREATE

```python
@login_required
def create(request):
    if request.method == 'POST':
        ...
        form = ArticleForm(request.POST)
        if form.is_valid():
            ...
            # hashtag
            # 게시글 내용을 잘라서 리스트로 만듦
            for word in article.content.split():
                # word가 '#'으로 시작할 경우 해시태그 등록
                if word.startswith('#'):
                    hashtag, created = Hashtag.objects.get_or_create(content=word)
                    article.hashtags.add(hashtag)
                    
        return redirect('articles:detail', article.pk)
    else:
    	...
    return render(request, 'articles/form.html', context)
```

### 1.3 UPDATE

```python
@login_required
def update(request, article_pk):
    article = get_object_or_404(Article, pk=article_pk)
    if request.user == article.user:
        if request.method == 'POST':
            ...
            if form.is_valid():
                ...
                # hashtag
                article.hashtags.clear()
                # 게시글 내용을 잘라서 리스트로 만듦
                for word in article.content.split():
                    # word가 '#'으로 시작할 경우 해시태그 등록
                    if word.startswith('#'):
                        hashtag, created = 
                        				Hashtag.objects.get_or_create(content=word)
                        article.hashtags.add(hashtag)

                return redirect('articles:detail', article.pk)
        else:
            ...
    else:
        return redirect('articles:index')
```

### 1.4 READ

```python
# articles/views.py

# Hashtag 글 모아보기
def hashtag(request, hash_pk):
    # 해시태그 가져오기
    hashtag = get_object_or_404(Hashtag, pk=hash_pk)
    # 해당 해시태그를 참조하는 게시글들 가져오기
    articles = hashtag.article_set.order_by('-pk')
    context = {
        'hashtag' : hashtag,
        'articles' : articles,
    }
    return render(request, 'articles/hashtag.html', context)
```

- 구조

  ![image-20191114131344359](Hashtag%20,%20Social%20Login.assets/image-20191114131344359.png)

```django
<!-- hashtag.html -->
{% extends 'base.html' %}
{% block body %}
<h1>{{ hashtag.content }} 게시글 모아보기</h1>
<h4>{{ articles|length }}개의 글이 있습니다.</h4>
<hr>
{% for article in articles %}
    <p>글 제목 : {{ article.title }}</p>
    <p>글 내용 : {{ article.content }}</p>
    <p>{{ article.comment_set.all|length }}개의 댓글이 있습니다.</p>
    <p>{{ article.like_users.all|length }}명이 이글을 좋아합니다.  </p>
	<a href="{% url 'articles:index' %}">[INDEX]</a>
{% endfor %}
{% endblock  %}
```

```python
urlpatterns = [
    ...
    path('<int:hash_pk>/hashtag/', views.hashtag, name='hashtag'),
]
```

- **DETAIL**

```django
{% extends 'base.html' %}
{% load make_link %}

{% block body %}
...
<p>글 내용 : {{ article|hashtag_link|safe }}</p>
...
<hr>
```

![image-20191114132017959](Hashtag%20,%20Social%20Login.assets/image-20191114132017959.png)

```python
# make_link.py

from django import template

register = template.Library()

@register.filter
def hashtag_link(article):
    content = article.content + ' '
    hashtags = article.hashtags.all()

    for hashtag in hashtags:
        content = content.replace(
            hashtag.content + ' ',
            f'<a href="/articles/{hashtag.pk}/hashtag/">{hashtag.content}</a> '
        )
    return content
```

-----

## 2. Social Login

> 인증, 계정, 등록 등을 다루는 여러가지 방법이 존재하는데, 우리는 `django-allauth`**라는 라이브러리를 사용해서 손쉽게 Social Login을 구현해보자.**
>
> 대부분의 소셜 로그인을 지원하고 회원가입 시킬 수 있다.

### 2.1 사전준비

- `django-allauth` 모듈 설치

```bash
$ pip install django-allauth
```

- `settings.py` 작성

```python
...
ALLOWED_HOSTS = []

# 이 부분 추가
AUTHENTICATION_BACKENDS = (
    'django.contrib.auth.backends.ModelBackend',
)


# Application definition
# https://django-allauth.readthedocs.io/en/latest/installation.html에서
# 사용할 Social 확인
INSTALLED_APPS = [
    ...
    'django.contrib.sites',
    'allauth',
    'allauth.account',
    'allauth.socialaccount',
    'allauth.socialaccount.providers.kakao',
    ...
]

SITE_ID = 1
```

- `config/urls.py`

```python
urlpatterns = [
    ...
    path('accounts/', include('allauth.urls')),
    ...
]
```

### 2.2 KAKAO Developers OAUTH 등록

- KAKAO Developers에 로그인해서 앱을 만들고 다음 사진과 같이 진행하자.

![image-20191114141450757](Hashtag%20,%20Social%20Login.assets/image-20191114141450757.png)

![image-20191114141736108](Hashtag%20,%20Social%20Login.assets/image-20191114141736108.png)

![image-20191114141856808](Hashtag%20,%20Social%20Login.assets/image-20191114141856808.png)

![image-20191114142033387](Hashtag%20,%20Social%20Login.assets/image-20191114142033387.png)

- 클라이언트 아이디에 REST API 키를 넣고
- 비밀 키에 클라이언트 Secret 코드를 넣자.