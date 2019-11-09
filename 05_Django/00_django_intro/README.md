# Django

### 1.1 가상환경 설정

- #### Why 가상환경?

  - 글로벌 환경에서 개발을 진행하다 보면, 실제 해당 프로젝트에는 필요없는 라이브러리들이 설치되어 있을 수 있다. 내 컴퓨터에서는 정상적으로 돌아가지만, 다른 컴퓨터에서 실행했을 때 그 사람이 가지고 있는 라이브러리와 만나게 되면 돌아가지 않을 수 있다.
  - 파이썬 버전도 마찬가지로 특정한 버전에서만 실행되는 경우가 있다.
  - 따라서, 지금 이프로젝트에서만 필요한 패키지들이 설치된 가상환경에 진입해서 개발을 진행한다.
  
- **Visual Studio Code에서 기본 가상환경 설정하기** 

  - `Shift + Ctrl + P` 혹은 좌측 하단의 파이썬 버전 클릭해서 우리가 생성한 venv를 기본값으로 선택해준다.
  - 그 다음 VSCode 내장 터미널을 새로 실행하면, 자동으로 `source ~activate`까지의 명령어가 실행되면서 가상환경으로 진입한다.

- **VSCode 환경설정이 꼬이는 경우, 그냥 터미널에서 가상환경 진입 명령어를 실행하자!**

  - `source venv/Scripts/activate`(for Windows)

- **앞으로 개발을 진행할 때는 반.드.시! 가상환경 진입여부를 확인해야 한다.**

  - 터미널 명령어 앞에 (venv) 표시 혹은 `pip list` 입력했을 때 적절한 패키지가 깔려있는지 확인!

     (글로벌에서 계속 진행했을 경우, Flask같은 필요 없는 패키지들이 깔려있을 것이다.)

```bash
# 가상환경을 설치할 폴더에서 실행
$ python -m venv venv

# 가상환경 진입
$ source venv/Scripts/activate		# venv가 있는 폴더로 들어왔을 때
$ source ~/venv/Scripts/activate	# venv가 위치하고 있는 상세 경로로 진입 가능

# 가상환경 나오기
$ deactivate		# 어느 경로에서나 상관 없음
```

### 1.2 장고 설치 및 개발서버 실행

```bash
(venv)
$ pip install django		# 최신버전 설치
$ pip install django==2.1.8	# 원하는 버전 설치
```

```bash
# 장고 버전 간단하게 확인
$ pip list
```

### 1.3 장고 프로젝트 시작

```bash
# 장고 프로젝트를 담을 폴더 생성
$ mkdir 00_django_intro

# 폴더로 이동
$ cd 00_django_intro
```

```bash
05_Django/00_django_intro
$ django-admin startproject config .	# 현재 폴더를 프로젝트 폴더로 설정!
```

```
00_Django_intro/
	config/
		settings.py
		...
	manage.py
```

```bash
# 반드시 manage.py가 있는 경로에서 명령어 실행
# manage.py : 장고 프로젝트와 의사소통하는 상호작용 커맨드라인 유틸리티
$ python manage.py runserver
```

- 터미널에 출력되는 로컬호스트 주소로 들어가서 로켓 확인

- 이 서버는 장고가 제공하는 경량 개발용 서버이므로, 배포할 때는 절대 이용해선 안된다. 

  배포할거면 heroku, pythonanywhere와 같은 배포 서비스를 이용하자.

### 1.4 Project 폴더 구조 확인

```
config/
	init.py
	settings.py
	urls.py
	wsgi.py
```

- `__init__.py` 
  - 빈 파일이며, 우리가 다룰 일은 없다.
  - Python에게 이 디렉토리를 하나의 Python 패키지로 다루도록 지시한다.
- `settings.py`
  - 우리가 만드는 웹 서비스의 모든 환경설정이 담긴다.
    (ex- Application 등록, Static files 설정, Database 설정 등)
  - 즉, Django Project 내의 모든 환경이 저장된 파일이다.
- `urls.py`
  - 웹 서비스의 URL 경로와 View 함수의 연결을 정의한다.
- `wsgi.py`
  - Web Server Gateway Interface
  - 파이썬 웹 프레임워크에서 사용하는 웹 서버 규칙

### 1.5 Application 생성

- Project vs Application 차이점?

  - Project는 여러 개의 애플리케이션을 담는 그릇의 역할을 한다. 
    - 커다란 장고 프로젝트의 각종 환경설정들이 담긴다.
    - 하나의 프로젝트는 여러개의 애플리케이션을 가질 수 있다.
  - Application은 실제 웹 서비스에서 어떠한 역할을 수행하는 것을 담당한다.
    - 예를 들어 게시글을 조회하고 수정, 삭제하거나 사용자의 로그인, 로그아웃, 회원가입을 하는 증 모든 행위는 애플리케이션이라는 친구가 수행한다.
    
    - 기본적으로 애플리케이션은 하나의 역할 및 기능 단위로 쪼개는 것이 원칙이다. 
  
      하지만, 장고 개발진에서 어떤 식으로 나누라는 기준을 제공하는 것은 아니므로 **프로젝트를 수행하면서 프로젝트 사정에 맞게 알아서 쪼개면 된다.**
    
    - 애플리케이션 이름은 가능한 **복수형**(ex- pages, posts, boards, ...)으로 짓는다.
  
  ```bash
  # manage.py 경로 위치 확인
  $ python manage.py startapp pages
  ```

### 1.6 Application 폴더 구조

```
pages/
	admin.py
	apps.py
	models.py
	tests.py
	views.py
```

- `admin.py`
  - 관리자용 페이지를 커스터마이징하는 파일
- `apps.py`
  - 애플리케이션의 구성 정보가 담긴 파일
- `models.py`
  - 애플리케이션에서 사용하는 데이터베이스 정보가 담긴 파일
- `tests.py`
  - 테스트 코드가 담긴 파일
- `views.py`
  - 사용자에게 보여줄 데이터를 가공하는 뷰 함수가 담긴 파일
  - Flask에서 app.py에 정의했던 함수가 담기는 장소

### 1.7 Application 등록

- 프로젝트가 자동으로 애플리케이션을 인식하지 않는다. 따라서 프로젝트의 setting.py에 가서 애플리케이션 등록 절차를 겨쳐야 한다.

```python
# config/setting.py

INSTALLED_APPS = [
    # Local apps
    'pages',
    
    # Third party apps
    
    # Django apps
    ...
]
```

### 1.8 추가 설정

- `LANGUAGE_CODE ='ko-kr'`

- `TIME_ZONE = 'Asia/Seoul'`
- 서버 새로고침해서 언어 설정이 바뀌었는지 확인!

### 1.9 MTV 패턴

- 장고에서는 MTV 패턴이라고 부르지만, 실제로는 MVC 패턴과 동일하다.
  - `Model` : 데이터베이스를 정의
  - `Template` : 사용자에게 어떻게 데이터를 보여줄 지 정의 (예쁘게 담아서 보여줌)
  - `view` : 사용자에게 어떤 데이터를 보여줄 지 정의 (보여줄 데이터 가공)
- 오늘은 Template과 View를 이용해서 요청 - 응답
- Django에서는 `.py` 3대장이라고 불리는 친구들이 있다.
  - `models.py` : 데이터베이스 관리
  - `view.py` : 페이지 관리 (페이지 하나당 하나의 함수)
  - `urls.py` : URL과 View 함수 맵핑

------

## 2. Django request-response 구조 실습

### 2.1 템플릿 변수 (Template Variable)

- 변수를 템플릿 언어로 쓰기 위해서는 **{{ 변수 }}**와 같은 형태로 표현

```python
# pages/views.py

from django.shortcuts import render
import random
from datetime import datetime

# Create your views here.
# view 함수 -> 중간 관리자
# 사용자가 접속해서 볼 페이지를 작성한다. 즉, 하나하나의 페이지를 'view'라고 부른다.
# 'view' 함수 내에서 사용자에게 보여줄 데이터 정보를 가공한다.

def index(request):     # 첫번째 인자 반드시 request!
    return render(request, 'index.html')    # 첫번째 인자 반드시 request!

def introduce(request):
    name = '김한석'
    # render 메서드의 세번째 인자로 변수를 딕셔너리 형태로 넘길 수 있다.
    return render(request, 'introduce.html', {'name': name})

def dinner(request):
    menu = ['초밥', '삼겹살', '돈까스', '먹지마']
    pick = random.choice(menu)
    context = {
        'pick' : pick
    }
    return render(request, 'dinner.html', context)
```

```python
# urls.py
from django.contrib import admin
from django.urls import path
from pages import views

urlpatterns = [
	path('introduce/', views.introduce),
    path('index/', views.index),
    path('dinner/', views.dinner),
    ...
]
```

```django
<!-- templates/index.html -->
<h1>Hello, Django!</h1>

<!-- templates/introduce.html -->
<h1>안녕하세요 {{ name }}</h1>

<!-- templates/dinner.html -->
<h1>오늘의 저녁은 {{ pick }} ㄱㄱ</h1>
```

### 2.2 동적 라우팅 (Variable Routing)

- 주소창에서 원하는 변수 등을 받아 함수에 적용

```python
# 동적 라우팅
def hello(request, name):
    menu = ['초밥', '삼겹살', '돈까스', '먹지마']
    pick = random.choice(menu)
    
    context = {
        'name': name,
        'pick' : pick,
        }

    return render(request, 'hello.html', context)
```

```html
<h1>안녕하세요, {{ name }} </h1>
<h2>당신의 저녁 메뉴는 ... {{ pick }}</h2>
```

```python
urlpatterns = [
    ...
    path('hello/<str:name>', views.hello),
    ...
]
```

### 2.3 실습문제

```python
# views.py
# 실습 1 : 템플릿 변수를 2개 이상 넘겨서, 이름/ 나이/ 취미/ 특기 등 여러가지 정보를 표현해보자.
def info(request):
    context = {
        'name' : '홍길동',
        'age' : '알수 없음',
        'hobby' : '도적질',
        'specialty' : '동해번쩍 서해번쩍',
    }
    return render(request, 'info.html', context)

# 실습 2 : 숫자 2개를 동적 라우팅으로 전달 받아서, 두 개의 숫자를 곱해주는 페이지 만들자!
def times(request, number1, number2):
    mul = number1 * number2
    context = { 'mul' : mul }
    return render(request, 'times.html', context)

# 실습 3 : 반지름을 인자로 받아서 원의 넓이를 구해주는 페이지를 만들자
def area(request, r):
    area = r * r * 3.141592
    context = { 'area' : area }
    return render(request, 'area.html', context)
```

```django
<!-- info.html -->
<h1>나의 이름은 {{ name }} 이다 </h1>
<h2>나의 나이는 {{ age }} 이고, 취미는 {{ hobby }}, 특기는 {{ specialty }}</h2>

<!-- times.html -->
<h1>곱 {{ mul }}</h1>

<!-- area.html -->
<h1>넓이는 {{ area }} </h1>
```

```python
# urls.py
urlpatterns = [
    ...
    path('info/', views.info),
    path('times/<int:number1>/<int:number2>', views.times),
    path('area/<int:r>', views.area),
    ...
]
```

-----

## 3. DTL(Django Template Language)

- 장고에 기본적으로 내장된 템플릿 엔진이다.
- 플라스크에서 내장된 Jinja2를 사용했던 것과 마찬가지다.
- **사용자에게 보여줄 데이터를 가공하는 작업이 필요할 경우, DTL에 내장된 연산 방식을 사용하지 말고, 되도록이면 뷰 함수 내부에서 데이터를 가공한 뒤 템플릿에게 넘겨주자!!**

### 3.1 DTL 활용해보기

```python
# views.py
def template_language(request):
    menus = ['짜장면', '탕수육', '짬뽕', '양장피']
    my_sentence = 'Life is short, you need python'
    messages = ['apple', 'banana', 'cucumber', 'mango']
    datetimenow = datetime.now()
    empty_list = []
    context = {
        'menus': menus,
        'my_sentence': my_sentence,
        'messages': messages,
        'empty_list': empty_list,
        'datetimenow': datetimenow,
    }
    return render(request, 'template_language.html', context)
```

```django
<!-- template_language.html -->
<h1>1. 반복문</h1>
<h4>메뉴판</h4>
<ul>
  {% for menu in menus %}
    <li>{{ menu }}</li>
  {% endfor %} 
</ul>
<hr>

<h1>2. 조건문</h1>
<ul>
  {% for menu in menus %}
    {% if menu == '짜장면' %}
      <li> {{ menu }}에는 고춧가루지!</li>
    {% else %}
      <li> {{ menu }} </li>
    {% endif %}
  {% endfor %}
</ul>

<hr>

<h1>3. Length Filter</h1>
{% for message in messages %}
  {% if message|length > 5 %}
    <p>{{ message }}... 너무 길어요. 줄여주세요!</p>
  {% else %}
    <p>{{ message }}의 길이는 {{ message|length}} 글자!</p>
  {% endif %}
{% endfor %}

<hr>

<h1>4. Lorem Text</h1>
<!-- w : word, p : <p></p>, random : 무작위 -->
{% lorem %}
<hr>
{% lorem 3 w%}
<hr>
{% lorem 4 w random%}
<hr>
{% lorem 2 p %}

<hr>

<h1>5. 글자수 제한(truncate - 자르기)</h1>
<p>{{ my_sentence|truncatewords:3 }}</p> <!-- 단어 단위로 자른다 -->
<p>{{ my_sentence|truncatechars:3 }}</p> <!-- 문자 단위로 자름 / 3번째 포함 X -->
<p>{{ my_sentence|truncatechars:10 }}</p> <!-- 10번째 포함 X -->

<hr>

<h1>6. 연산</h1>
<!-- 
  기본적으로, 사용자에게 보여줄 데이터를 가공하는 것은 뷰 함수에서 처리하자.
  반드시 필요한 경우에만 연산 필터 사용!
  django mathfilters
-->
<p>{{ 4|add:6 }}</p>

<hr>

<h1>7. 날짜</h1>
{% comment '' %}{% now %}가 기본적으로 내장되어 있다. -->{% endcomment %}
<!-- 파이썬 내장 라이브러리인 datetimenow로 날짜를 출력! -->
{{ datetimenow }}<br>
<!-- 7.2 DTL에 내장된 now를 사용해보자 -->
{% now "DATETIME_FORMAT" %}<br>
{% now "SHORT_DATETIME_FORMAT" %}<br>
{% now "DATE_FORMAT" %}<br>
{% now "SHORT_DATE_FORMAT" %}
<hr>
{% now "Y년 m월 d일 D h:i" %}
<hr>

<h1>8. 기타</h1>
{{ 'google.com'|urlize }}
```

```python
 # urls.py
urlpatterns = [
    ...
    path('template_language/', views.template_language),
    ...
]    
```

### 3.2 실습문제

```python
# views.py
# [실습1] IS IT YOUT BIRTH?
# 오늘 날짜와 본인 실제 생일 비교해서, 맞으면 예! 아니면 아니오!
def isbirth(request):
    days = datetime.now()
    if days.month == 8 and days.day == 17:
        result = True
    else:
        result = False
    
    context = { 'result' : result }
    return render(request, 'isbirth.html', context)

# [실습2] 회문 판별 (팰린드롬 / 문자열 슬라이싱 파트 활용)
# ex) 오디오는 거꾸로 해도 오디오 -> 회문!
def ispal(request, word):
    if word == word[::-1]:
        result = True
    else:
        result = False
    
    context = {
        'word':word,
        'result' : result
        }
    return render(request, 'ispal.html', context)

# [실습3] 로또 번호 추첨
# 임의로 출력한 로또 번호와 가장 최근에 추첨한 로또 번호 비교해서 당첨여부 확인
def lotto(request):
    lottos = sorted(list(random.sample(range(1, 46), 6)))
    real_lottos = [18, 34, 39, 43, 44, 45]    # 882회차
    
    context = {
        'lottos' : lottos,
        'real_lottos' : real_lottos,
    }
    return render(request, 'lottos.html', context)
```

```django
<!-- isbirth.html -->
{% if  result %}
  <p>예</p>
{% else %}
  <p>아니요</p>
{% endif %}

<!-- ispal.html -->
{% if result %}
  <p>{{ word }}는 거꾸로 해도 {{ word }}}네요. 회문이다!</p>
{% else %}
  <p>{{ word }}는 회문이 아니네요!</p>
{% endif %}

<!-- lottos.html -->
<h1>인생역전 가능할까요?</h1>
<h3>당신이 뽑은 로또 번호는...</h3>
<p>{{ lottos }} 입니다.</p>
<h3>882회차 로또 당첨번호는 ...</h3>
<p>{{ real_lottos }} 입니다.</p>
{% if lottos == real_lottos %}
  <h3>내일부터 출근 안합니다.</h3>
{% else %}
  <h3>새벽부터 출근할게요.</h3>
{% endif %}
```

```python
from pages import views

urlpatterns = [
    ...
    path('lottos/', views.lotto),
    path('ispal/<str:word>', views.ispal),
    path('isbirth/', views.isbirth),
   ...
]
```

-----

## 코드 작성 순서 (권장)

> 대출창구(views.py) 를 만들지도 않았는데 손님을 대출창구로 모시면(urls.py) 컴플레인 받는다. 에러를 뿜는다.

- `views.py` : 보여주고자 하는 페이지의 뷰 함수를 작성한다.
- `templates` : 사용자에게 보여줄 템플릿 페이지를 작성한다.
- `urls.py` : 해당 경로로 들어왔을 때 뷰 함수를 실행시킨다.