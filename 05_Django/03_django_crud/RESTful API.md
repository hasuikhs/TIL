# RESTful API

> HTTP URI를 통해 자원(Resource)을 명시하고, HTTP Method(GET, POST, PUT, DELETE)를 통해 해당 자원에 대한 CRUD로직을 적용하는 것
>
> - 혼자 개발해서 혼자 사용할 용도면 `articles/1/butterfly/show/magic` 처럼 그냥 마구잡이로 개발하고 작동만 하면 된다.
> - 하지만 다른 사람이 사용하는 것을 염두해 둔다면, `[GET] articles/1` 과 같이 전세계 개발자들이 사용하는 REST 아키텍처를 염두에 두고 개발해야 한다.

- **REST 핵심 구성요소**

  1. 자원(Resource) : URI
  2. 행위(Verb) : `HTTP Method`

- **REST API 디자인 가이드**

  - URI는 **정보의 자원**을 표현해야 한다.

    ```bash
    # URI는 자원을 표현하는데 중점을 둔다. 따라서 show, read와 같은 행위에 대한 표현이 들어가서는 안된다.
    
    GET /articles/show/1 (X)
    GET /articles/1 (O)
    ```

  - 자원에 대한 행위는 **HTTP Method**로 표현한다.

    ```bash
    # GET Method는 리소스 생성/삭제 등의 행위에는 어울리지 않는다.
    
    GET /articles/1/update (X)
    PUT /articles/1 (O)
    ```

  - But! Django에서는 PUT, DELETE와 같은 비공식적 요청을 default로 지원하지 않고 있기 때문에 어느정도의 절충안이 필요하다.

    ```bash
    GET /articles/2/update/		# 사용자에게 수정 페이지 보여줌
    POST /articles/2/update/	# 수정 작업 진행
    ```

-----

- **03_django_crud RESTful하게 바꿔보기**

  - create 로직

    - `views.py`

    ```python
    
    def create(request):
        # POST 요청일 경우 -> 게시글 생성 로직 수행
        if request.method == 'POST':
            
            title = request.POST.get('title')
            content = request.POST.get('content')
    
            article = Article(title=title, content=content)
            article.save()
        
            return redirect('articles:detail', article.pk)
        # GET 요청일 경우 -> 사용자에게 폼 보여주기
        else:
            return render(request, 'articles/create.html')
    ```

    - `new.html`을 `create.html`로 이름 변경

    ```html
    {% extends 'base.html' %}
    
    {% block body %}
    <h1 class="text-center">NEW</h1>
    <form action="{% url 'articles:create' %}" method="POST">
      {% csrf_token %}
      <label for="title">제목</label>
      <input type="text" id="title" name="title"><br>
      <label for="content">내용</label><br>
      <textarea id="content"name="content" cols="30" rows="10"></textarea>
      <input type="submit">
    </form>
    <hr>
    <a href="{% url 'articles:index' %}">[BACK]</a>
    {% endblock  %}
    ```

    - `index.html`

    ```html
    {% extends 'base.html' %}
    
    {% block body %}
    <h1 class="text-center">Articles</h1>
    <a href="{% url 'articles:create' %}">[NEW]</a>
    <hr>
    {% for article in articles %}
      
       <p>
        [{{ article.pk }}] <a href="{% url 'articles:detail' article.pk %}">{{ article.title }}</a>
      </p>
      <a href="{% url 'articles:detail' article.pk %}">[DETAIL]</a>
    <hr>
    {% endfor %}
    {% endblock  %}
    ```

    - `urls.py`

    ```python
    app_name = 'articles'
    urlpatterns = [
        ...
        # path('new/', views.new, name='new'),
        # GET(new) / POST(create)
        path('create/', views.create, name='create'),  
        ...
    ]
    ```

  - update 로직

    - `views.py`

    ```python
    # 수정 내용 전달 받아서 DB에 저장(반영)
    def update(request, article_pk):
        # POST 요청 -> DB에 수정사항 반영
         # 1. 수정할 게시글 인스턴스 가져오기
        article = Article.objects.get(pk=article_pk)
        if request.method == 'POST':    
            # 2. 폼에서 전달받은 데이터 덮어쓰기
            article.title = request.POST.get('title')
            article.content = request.POST.get('content')
        
            # 3. DB 저장
            article.save()
        
            # 4. 저장 끝났으면 게시글 Detial로 이동시키기
            # return redirect(f'/articles/{article.pk}/')
            return redirect('articles:detail' , article.pk)
        else:
            context = { 'article': article }
            return render(request, 'articles/update.html', context)
    ```

    - `edit.html`을 `update.html`로 이름 변경

    ```html
    {% extends 'base.html' %}
    
    {% block body %}
    <h1 class="text-center">EDIT</h1>
    <form action="{% url 'articles:update' article.pk %}" method="POST">
      {% csrf_token %}
      TITLE: <input type="text" name="title" value="{{ article.title }}"><br>
      CONTENT: 
      <textarea name="content" cols="30" rows="10">
        {{ article.content }}
      </textarea>
      <input type="submit">
    </form>
    <hr>
    <a href="{% url 'articles:detail' article.pk %}">[BACK]</a>
    {% endblock  %}
    ```

    - `urls.py`

    ```python
    ...
    app_name = 'articles'
    urlpatterns = [
        ...
        # path('<int:article_pk>/edit/', views.edit, name='edit'),
        # GET(edit) / POST(update)
        path('<int:article_pk>/update/', views.update, name='update'),
    ]
    ```

