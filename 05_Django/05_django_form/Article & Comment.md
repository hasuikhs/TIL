# User - Article & Comment

- User 클래스를 가져오는 법

  - `settins.Auth_USER_MODEL`

    - return str

    - `models.py` 에서 모델 정의할 때만 사용

      ```python
      from django.conf import settings
      settings.Auth_USER_MODEL
      ```

  - `get_user_model()`

    - return class

    - `models.py` 제외한 모든 곳

      ```python
      from django.contrib.auth import get_user_model
      get_user_model()
      ```

## 1. User - Article

### 1.1 Article 모델 클래스 수정

```

```

### 1.2 Create 로직 수정

```

```

### 1.3 Update, Delete 로직 수정

```

```

## 2. User - Comment

### 2.1 Comment 모델 클래스 수정

```python
# articles/models.py

class Comment(models.Model):
    # Comment -> 이중 1:N 관계 (Article, User)
   	...
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    ...
```

- 데이터베이스 반영
  - `makemigrations` : default값 설정
  - `migrate`

### 2.2 Comment HTML 수정

```django
{% extends 'base.html' %}

...

{% if request.user == article.user %}
<a href="{% url 'articles:update' article.pk %}">[EDIT]</a>
<form action="{% url 'articles:delete' article.pk %}" method="POST" style="display: inline;"
    onclick="return confirm('진짜 삭제...?')">
    {% csrf_token %}
    <input type="submit" value="DELETE">
</form>
{% endif %}

<hr>
{% if user.is_authenticated %}
<form action="{% url 'articles:comments_create' article.pk %}" method="POST">
    {% csrf_token %}
    {{ comment_form }}
    <input type="submit" value="댓글 작성">
</form>
{% else %}
<a href="{% url 'accounts:login' %}">[댓글을 작성하려면 로그인]</a>
{% endif %}
<hr>

{% if comment.user == request.user %}
	<form action="{% url 'articles:comments_delete' article.pk comment.pk %}" method="POST" style="display:inline;">
		{% csrf_token %}
            <input type="submit" value="삭제" />
    </form>
{% endif %}
```

### 2.3 comment View 함수 수정

```python
@require_POST
def comments_create(request, article_pk):
    article = get_object_or_404(Article, pk=article_pk)
    if request.user.is_authenticated:
        comment_form = CommentForm(request.POST)
        if comment_form.is_valid():
            # save 메서드 -> 선택 인자 : (기본값) commit=True
            # DB에 바로 저장되는 것을 막아준다.
            comment = comment_form.save(commit=False)
            comment.article = article
            comment.user = article.user
            comment.save()
    return redirect('articles:detail', article.pk)
    

@require_POST
def comments_delete(request, article_pk, comment_pk):
    # 1. 로그인 여부 확인
    if request.user.is_authenticated:
        comment = get_object_or_404(Comment, pk=comment_pk)
        # 2. 로그인한 사용자와 댓글 작성자가 같을 경우
        if request.user == comment.user:
            comment.delete()
    return redirect('articles:detail', article_pk)
```

