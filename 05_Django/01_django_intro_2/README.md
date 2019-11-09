# Start_Django_2

## 1. HTML Form Tag

- 스태틱 웹 vs 다이내믹 웹
  - `스태틱 웹` : 단순히 html 페이지 여러개로 구성되어있는 웹 서비스
  - `다이내믹 웹` : 데이터베이스에 변동을 주어서 데이터베이스에 따라 웹 사이트의 내용이 바뀌는 웹 서비스
- Form을 통해서 사용자로부터 정보를 받거나 정보를 가공하거나 하는 로직을 구현했었는데, 결국 다이내믹 웹을 구현하기 위해서는 Form을 통해서 정보를 요청하는 절차가 반드시 필요하다.
- `<form></form>`
  - 사용자로부터 제공받은 데이터를 서버 측에 전송해주는 역할
  - 사용자가 여러 정보를 입력할 수 있는 수단을 제공 -> `input` 태그를 통해!
    - `<form action="/new/">` : 어디로 보낼 것인지 서버측 경로를 지정
    - `<form action="" method="GET">` : 요청 방식을 무엇으로 할 것인지 지정
- `<input>`
  - Form 태그 안에서 가장 중요한 태그! 사용자로부터 어떠한 정보를 입력받는 태그
  - `<input type="">` : 사용자가 입력할 데이터의 종류 지정
  - `<input type="" name="">` : 서버 측에서 사용자가 입력한 값을 가져올 이름으로 사용

-----

## 2. HTML Form - GET 요청

### 2.1 기본 개념

- 요청의 종류 중 GET 요청은 **서버로부터 정보를 조회**하는데 사용한다. 데이터를 서버로 전송할 때 **쿼리스트링**을 통해 전송한다.

- **서버의 데이터(리소스)를 변경 시키지 않는 요청**이고, HTML 파일을 조회할 때 사용한다. 우리는 서버에 GET 요청을 하면, HTML 문서 한 장을 받는다.

- throw & catch

  ```python
  # 1. view.py
  # 정보를 던져줄 페이지
  def throw(request):
      return render(request, 'throw.html')
  ```

  ```django
  <!-- 2. template/throw.html -->
  <form action="/catch/" name="GET">
    <input type="text" name="message">
    <input type="submit" value="던져!">
  </form>
  ```

  ```python
  # 3. urls.py
  urlpatterns = [
      ...
      path('throw/', views.throw),
      ...
  ]
  ```

  ```python
  # 4. view.py
  # 사용자로부터 정보를 받아서 다시 던져줄 페이지
  def catch(request):
      message = request.GET.get('message')
      context = { 'message' : message }
      return render(request, 'catch.html', context)
  ```

  ```html
  <!-- 5. template/catch.html -->
  <h1> 니가 보낸 정보를 잘 받았고, 그 정보의 내용은 {{ message }}야!</h1>
  ```

  ```python
  # 6. urls.py
  urlpatterns = [
      ...
      path('catch/', views.throw),
      ...
  ]
  ```

### 2.2 실습

```python
# 1. views.py
def art(request):
    return render(request, 'pages/art.html')
```

```django
<!-- 2. art.html -->
<form action="/pages/result2/" name="GET">
  <input type="text" name="word">
  <input type="submit" value="가자!">
</form>
```

```python
# 3. urls.py
urlpatterns = [
    ...
    path('art/', views.art),
    ...
]
```

```python
# 4. views.py
def result2(request):
    print(request.GET)
    # 1. form 태그로 날린 데이터를 받는다. (GET 방식)
    word = request.GET.get('word')

    # 2. ARTII api로 요청을 보내 응답 결과를 text로 fonts에 저장한다.
    fonts = requests.get('http://artii.herokuapp.com/fonts_list').text
    # fonts --> str

    # 3. fonts(str)를 fonts(list)로 바꾼다.
    fonts = fonts.split('\n')
    
    # 4. fonts(list)안에 들어있는 요소중 하나를 선택해서 font라는 변수에 저장한다.
    font = random.choice(fonts)

    # 5. 위에서 우리가 만든 word와 font를 가지고 다시 요청을 보내 응답 결과를 result에 저장
    result = requests.get(f'http://artii.herokuapp.com/make?text={word}&font={font}').text

    context = {'result': result}
    return render(request, 'pages/result.html', context)
```

```django
<!-- 5. result.html -->
<pre>{{result}}</pre>
```

```python
# 6. urls.py
urlpatterns = [
    ...
    path('result/', views.result),
    ...
]
```

-----

## 3. HTML Form - POST 요청

- **CRUD**
  - **Create** : 생성
  - **Read** : 조회
  - **Update** : 수정
  - **Delete** : 수정

### 3.1 기본 개념

- POST 요청은 GET 요청처럼 쿼리스트링에 데이터가 노출되는 것이 아니라, **HTTP Body에 담겨서 전송**된다.

  - GET 요청 -> Read
  - POST 요청 -> Create, Update, Delete

- POST 요청은 데이터(리소스)를 수정/삭제시키는 로직이기 때문에, 똑같은 요청을 여러번 시도하게 되면 서버에서 응답하는 결과를 다룰 수 있다.

- 원칙적으로 POST 요청을 보냈는데 HTML 파일을 그려주는(render) 응답은 해서는 안된다.

  HTML 파일을 그려주는 응답은 GET 요청에서만 사용한다.

  - 사용자가 로그인을 하는 로직은 POST 요청을 통해서 이루어진다. 로직 마지막에 어떤 정보를 변수로 넘겨서 HTML 파일을 넘겨주는 로직을 구현하는게 아니라, 로그인이 끝나면 메인 페이지(' / ') 등으로 redirect 시켜주는 로직을 구현해야 한다.

- `{% csrf_token %}`

  - CSRF 공격을 막기위한 최소한의 신원 확인 장치

  - 장고 내부적으로 CSRF 공격을 막기 위한 미들웨어가 기본적으로 적용되어 있다.

    ```python
    # settings.py
    
    MIDDLEWARE = [
        ...
        'django.middleware.csrf.CsrfViewMiddelware',
        ...
    ]
    ```

    - 얘가 존재하기 때문에, Form에서 POST 요청을 할 때 `{% csrf_token %}`을 넣지 않으면 `403 forbidden` 에러를 뿜는다. 403 에러는 서버에는 정상적으로 접근을 하였으나, 권한이 없어서 접근하지 못하는 에러다.
    - **`GET 요청`**은 "야, HTML 파일 하나 내놔!"라고 하는 단순한 정보 조회 로직이지만, **`POST요청`**은 서버측 DB(리소스)에 변경을 요청하는 것이기 때문에 신원을 확인하는 절차가 없으면 임의의 공격을 통해 서버가 해킹당하게 된다.
    - `{% csrf_token %}`을 코드에 삽입하면, 실제 Form 태그를 개발자 도구로 찍어보면 hidden type의 input 태그가 생기고 그 안에 암호화 된 hash 값이 함께 전송되는 것을 확인할 수 있다.

```python
# 1. views.py
# 회원가입 폼을 보여주는 페이지
def user_new(request):
    return render(request, 'pages/user_new.html')
```

```django
<!-- 2. user_new.html -->
<form action="/pages/user_create/" method="POST">
  {% csrf_token %}
  <input type="text" name="user_id">
  <input type="password" name="pwd">
  <input type="submit" value="가입하기">
</form>
```

```python
# 3. urls.py
urlpatterns = [
    ...
    path('user_new/', views.user_new),
    ...
]
```

```python
# 4. views.py
# 회원가입 요청을 처리하는 페이지(로직)
# 실제로는 이렇게 구현하지 않는다. 이건 저세상 코드
def user_create(request):

    user_id = request.POST.get('user_id')
    pwd = request.POST.get('pwd')
    context = {
        'user_id' : user_id,
        'pwd' : pwd,
    }
    return render(request, 'pages/user_create.html', context)
```

```django
<!-- 5. user_create.html -->
<h1>{{ user_id }}님 환영합니다!</h1>
<h2>당신의 비밀번호는 {{ pwd }}입니다.</h2>
```

```python
# 6. urls.py
urlpatterns = [
    ...
    path('user_create/', views.user_create),
    ...
]
```

-----

## 4. 정적 파일 (Static files)

### 4.1 기본 개념

- 정적 파일?
  - 별도의 가공 없이 사용자에게 그냥 전달만 해주면 되는 파일들. 예를 들어 `이미지`, `CSS`, `JavaScript` 파일들이 있다. 서버(프로그래머)가 미리 준비해두고, 사용자는 그냥 받아 보기만 하면 된다.
  - 이미지의 경우 데이터베이스를 통해 저장한 것이 아니라면, 일정한 주소를 통해 이미지를 불러와야 되는데 로컬에 저장햇을 경우 그냥 경로만 적어서는 이미지를 불러 올 수 없다.
    - 장고에서 제공하는 static 파일 관리 방법을 준수해서 이미지를 불러와야 한다.

```python
# 1. views.py
def static_sample(request):
    return render(request, 'pages/static_sample.html')
```

```django
<!-- static_sample.html -->
{% load static %}

<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Static 파일 실습</title>

  <link rel="stylesheet" href="{% static 'stylesheets/sample.css' %}">
</head>
<body>
  <h1>정적 파일 출력을 실습해봅시다!</h1>
  <img src="{% static 'images/back.jpg' %}" alt="back">
</body>
</html>
```

```python
# urls.py
urlpatterns = [
    ...
    path('static_sample/', views.static_sample),
    ...
]
```

-----

## 5. URL 로직 분리

> 이때까지 프로젝트 폴더 안에 있는 `urls.py`에서 모든 URL 경로를 관리했다. 근데 애플리케이션이 추가적으로 생기고 , 관리해야 할 URL 경로가 많아지면 매우 복잡해진다. 각자의 애플리케이션에 해당하는 URL은, 애플리케이션이 직접 관리하도록 위임 시켜보자.

### 5.1 애플리케이션 만들기

```bash
$ python manage.py startapp utilities
```

```python
# settings.py

INSTALLED_APPS = [
    'utilities',
    ...
]
```

### 5.2 애플리케이션 urls.py 생성

```
config/
	urls.py
pages/
	urls.py
utilities/
	urls.py
```

### 5.3 프로젝트 urls.py 로직 수정

> include 메서드를 사용해서 일정한 경로로 오는 요청들을 애플리케이션의 urls.py에서 처리하도록 위임한다.

```python
# config/urls.py
from django.urls import path, include

urlpatterns = [
    path('pages/', include('pages.urls')),
    path('utilites/', include('utilities.urls')),
    ...
]
```

### 5.4 애플리케이션 urls.py

```python
# pages/urls.py (-> 다른 애플리케이션도 형식 동일)

from django.urls import path
from . import views

urlpatterns = [
    ...
    # 'http://localhost/pages/new/'라는 경로로 요청했을 경우
    path('new/', views.new),
    # 'http://localhost/pages/'라는 경로로 요청했을 경우
    path('', views.index), 		
]
```

-----

## 6. 이름공간(Namespace)

- 장고는 기본적으로 템플릿(스태틱도 동일) 파일을 탐색할 때, 템플릿 폴더를 전부 모아놓고 순서대로 탐색한다.

  ```
  [As-is 폴더구조]
  pages/
  	templates/
  		index.html
  utilities/
  	templates/
  		index.html
  ```

  ```python
  # [As-is 뷰 함수 - pages]
  def index(request):
  	return render(request, 'index.html')
  ```

  ```python
  # settings.py
  INSTALLED_APPS = [
      'utilities',
      'pages',
      ...
  ]
  ```

  - 탐색하는 순서는 settings.py에 있는 INSTALLED_APPS 리스트 위에서부터 차례대로 탐색한다.
  - 따라서 중간에 구분하는 폴더를 만들어주지 않은 경우, **나는 pages의 index.html 이라는 템플릿을 렌더링하고 싶었지만 앱 등록 순서상 상위에 있는 utilities의 index.html 템플릿이 렌더링된다.**

  ```
  [To-be 폴더구조]
  pages/
  	templates/
  		pages/
  			index.html
  utilities/
  	templates/
  		utilities/
  			index.html
  ```

  ```python
  # [To-be 뷰 함수 - pages]
  def index(request):
      return render(request, 'pages/index.html')
  ```

  -  그냥 templates 폴더를 방문해서 파일을 찾지 않고, 해당 애플리케이션에 맞는 폴더를 찾기 위해 중간에 폴더를 하나 더 생성해준다. 
  - 이제 render 메서드 내부 템플릿 경로를 단순히 `index.html` 이라고 하지 말고 ,앞에 애플리케이션 이름을 붙여서 `pages/index.html` 이라고 바꿔주자.

-----

## 7. 템플릿 상속 (Template Inheritance)

### 7.1 기본 개념

- 상속은 기본적으로 **코드의 재사용성**에 초점을 맞춘다.

  - 템플릿에서 반복되는 코드를 매번 일일이 치고있을 여유는 없다.

    반복되는 부분은 미리 만들어두고 가져다 쓰자!

### 7.2 `base.html` 생성 및 애플리케이션 템플릿 이동

```
01_django_intro_2
	config/
		templates/
			pages/
				...
				index.html
			utilities/
				...
				index.html
			base.html
```

### 7.3 템플릿 탐색 경로 수정

- 실제 파일의 경로는 바꿔 버렸는데 장고가 바라보는 템플릿 탐색 경로를 바꾸어주지 않았다. 따라서 지금 서버를 돌려보면 템플릿을 찾을 수 없기 때문에 에러를 뿜어낸다.

- 장고 기본 세팅값으로 템플릿은 기본적으로 애플리케이션 밑에 있는 templates라는 폴더를 탐색하도록 되어있다.
  - DIRS에 임의의 경로를 넣어서 템플릿을 탐색하는 경로를 커스터마이징 해보자.

```python
# settings.py

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

## 8. 개발환경 관리

- 프로젝트를 받아보는 다른 사람이, 프로젝트에 필요한 파이썬 패키지들을 정확하게 설치하기 위해 현재 설치되어 있는 패키지들 목록을 넘겨준다.
  - 그래서 GitHub에 올릴 때 불필요하게 패키지들을 같이 올려서 용량을 높일 필요가 없다. 목록만 넘겨주고, 받는 사람이 본인 컴퓨터에 알아서 설치할 수 있게 환경 조성까지 해주자!
  - 파이썬 버전의 경우에는 같이 올라가지 않기 때문에, 되도록이면 `README.md`에 명시를 해준다.

```bash
# 현재 가상환경에 설치되어 있는 패키지 리스트 목록을 파일로 만들기
$ pip freeze > requirements.txt

# 패키지 리스트 목록을 읽어서, 없는 패키지를 자동으로 설치하기
$pip install -r requirments.txt
```