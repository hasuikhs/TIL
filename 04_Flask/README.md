## Flask

### 0. 가상환경 진입

- 우리는 앞으로 글로벌 환경이 아니라, 우리 프로젝트에 필요한 버전과 패키지만 사용하기 위해 가상환경에서 개발을 진행한다.

- 파이썬에 내장된 venv를 사용해보자.

  ```bash
  # 기본 사용법
  $ python -m venv 가상환경이름
  
  # 이렇게 만들어보자
  # 일단 지금은 어디서든 사용하기 편하게루트 디렉토리에 가상환경을 생성한다.
  sutdent@150130 MINGW64 ~
  $ python -m venv venv
  ```

  - 자유롭게 이름 설정이 가능하지만, 편하게 venv라고 통일하는 것을 권장(학습단계)

- 가상환경 실행 및 종료

  ```bash
  # 다른 경로에서도 편하게 가상환경에 진입할 수 있다.
  student@M150130 MINGW64 ~/Desktop/TIL
  
  $ venv ~/venv/Scripts/activate		# for windows
  $ venv ~/venv/bin/activate			# for mac
  ```

- 가상환경 종료

  ```bash
  $ deactivate
  ```

- 이제 개발을 하기 전에 터미널에 (venv) 라는 가상환경 표시가 있는지 잘 확인하자!!

  ```bash
  (venv)
  student@M150130 MINGW64 ~/Desktop/TIL (master)
  $
  ```

  - 중간에 뭔가 이상하다 싶으면 pip list 명령어를 사용해서 모듈의 리스트를 확인하자!
  
    ```bash
    (venv)
    student@M150130 MINGW64 ~/Desktop/TIL (master)
    $ pip list
    ```

### 1. Start Flask

#### 1.1 Install

- 첫 시작은 무조건 [공식문서](<http://flask.palletsprojects.com/en/1.1.x/>)를 참고

```python
from flask import Flask
app = Flask(__name__)

@app.route('/')
def hello():
    return 'Hello World'
```

#### 1.2 개발용 서버 실행하기

- 일단 그냥 실행해보기

  ```python
  $ Flask_APP=hello.py flask run
  ```

- 여기서 생기는 두 가지 문제

  - 서버를 싱행하는 명령어가 너무 길다.
  - 코드 내용이 바뀌면 서버를 껐다 켜야된다.

- 간단한 서버 실행 코드로 바꿔보기

  - hello.py -> app.py : 플라스크는 기본적으로 폴더에서 app.py를 싱행하려고 한다.

  - 실제 개발단계에서도 이름을 app.py를 권장한다.

  - 코드 추가하기

    ```python
    # app.py
    
    ...
    
    # end of file !!!!
    # debug 모드를 활성화해서 서버 새로고침을 생략
    if __name__ == '__main__':
        app.run(debug=True)
    ```

  - 명령어 실행

    ```python
    $ python app.py
    ```

### 1.3 간단한 페이지 렌더링하기

> 단순한 문자를 리턴, HTML 태그 리턴이 모두 가능하다

- 문자열 리턴

  ```python
  @app.route('/')
  def hello():
      return 'Hello World!'
  ```

- HTML 요소 사용해서 리턴

  ```python
  @app.route('/')
  def hello():
      return '<h1>Hello World!</h1>'
  ```

### 1.4 동적 라우팅(Variable Routing)

> 사용자가 URL을 통해 입력한 값을 받아서 사용 할 수 있다.

```python
@app.route("/greeting/<string,name>")
def greeting(name):
    return f'안녕, {name}?'
```

### 1.5 Render Template

> 템플릿을 미리 만들어두고 사용자에게 보여줄 수 있다.

- Flask에서 제공하는 render_templates 모듈을 불러온다.

  ```python
  from flask import Flask, render_template
  ```

- templates 폴더를 생성한다.

  - 플라스크는 render_template메서드를 사용할 때 기본적으로 루트 디렉토리에 있는 templates라는 폴더를 탐색해서 html파일을 찾는다.

     ※ 위에 s를 빼먹으면 jinja2 관련 에러를 출력하니 조심하자!

    ```
    03_Flask/
    	templates/
    		index.html
    		...
    	app.py
    ```

- 사용해보자.

  ```python
  @app.route('/')
  def hello():
      return render_template('index.html')
  ```

- render_template + parameters

  ```python
  # app.py
  
  @app.route('/greeting/<string:name>')
  def greeting(name):
      return render_template('greeting.html', html_name=name)
  ```

  ```html
  <!-- greeting.html -->
  <body>
    <h1>당신의 이름은 {{ html_name }}입니다.</h1>
  </body>
  ```


### 1.6 Jinja2 템플릿 엔진 활용하기

> 플라스크가 가지고 있는 Jinja2라는 템플릿 엔진을 활용해서 꾸며보자

- 조건문

  ```html
  <!-- greeting.html -->
  <body>
      {% if html_name == '도현' %}
          <p>어서오세요, 유단자여...</p>
      {% else %}
          <p>제발 무술을 배우세요...</p>
      {% endif %}
  </body>
  ```

- 반복문

  ```html
  <!-- movies.html -->
  <body>
      {% for movie in movies %}
          <li>{{ movies }}</li>
      {% endif %}
  </body>
  ```

------

### 2. 응답-요청 (Request-Response)

- Ping : 사용자가 일정한 주소로 요청을 보내면, 사용자가 어떠한 값을 입력할 수 있는 Form이 담겨있는 페이지를 보여준다.
- Pong : 사용자로부터 Form 입력 데이터를 받아서, 데이터를 가공해서 다시 보여준다.

```python
# ping : 사용자로부터 입력을 받을 Form 페이지를 넘겨준다.
@app.route('/ping')
def ping():
    return render_template('ping.html')
```

```python
# pong : 사용자로부터 Form 데이터를 전달받아서 가공한다.
@app.route('/pong')
def pong():
    user_name = request.args.get('user_name')
    return render_template('pong.html', user_name=user_name)
```

```html
<!-- ping.html -->
<body>
    <form action="/pong" method="GET">
        이름 : <input type="text" name="user_name"><br>
        <input type="submit">
    </form>
</body>
```

```html
<!-- pong.html -->
<body>
    <h2>{{ user_name }}님 안녕하세요! 데이터가 저희 서버로 들어왔어요.</h2>
</body>
```

### 2.2 Fake Naver & Fake Google

> 위 ping-pong 구조에서 온전히 우리 웹 서비스 내에서 요청과 응답 프로세스를 구현했다. 하지만 사용자로부터 요청만 받은 뒤, 데이터를 처리해서 돌려주는 응답 프로세스를 다른 서버 측에 넘겨줄 수도 있다.

- Fake Naver

  ```python
  # fake naver
  @app.route('/naver')
  def naver():
      return render_template('naver.html')
  ```

  ```html
  <body>
      <form action="https://search.naver.com/search.naver">
          <input type="text" name="query">
          <input type="submit">
      </form>
  </body>
  ```

- Fake Google

  ```python
  # fake google
  @app.route('/google')
  def google():
      return render_template('google.html')
  ```

  ```html
  <body>
      <form action="https://www.google.com/search">
          <input type="text" name="q">
          <input type="submit">
      </form>
  </body>
  ```

  

