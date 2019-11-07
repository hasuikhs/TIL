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

> Django가 제공하는



### 4.1 require_POST

- view 함수가 POST 메서드 요청만 승인하도록 하는 데코레이터
- 일치하지 않는 요청이면 `405 Method Not Allowed` 에러 발생시킴

