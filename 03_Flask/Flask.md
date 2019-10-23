## Flask

### 1. Start Flask

#### 1.1 Install

- 첫 시작은 무조건 공식문서( http://flask.palletsprojects.com/en/1.1.x/)를 참고

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

  - 코드 추가하기ㅏ

    ```python
    # app.py
    
    ...
    
    # end of file !!!!
    # debug 모드를 활성화해서 서버 새로고침을 생략
    if __name__ == '__main__':
        app.run(debug.True)
    ```

  - 명령어 실행

    ```python
    $ python app.py
    ```

### 1.3 간단한 페이지 렌더링하기

  | 단순한 문자를 리턴, HTML 태그 리턴이 모두 가능하다

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

  | 사용자가 URL을 통해 입력한 값을 받아서 사용 할 수 있다.

```python
@app.route("/greeting/<string,name>")
def greeting(name):
    return f'안녕, {name}?'
```

### 1.5 Render Template

  | 템플릿을 미리 만들어두고 사용자에게 보여줄 수 있다.

- Flask에서 제공하는 render_templates 모듈을 불러온다.

  ```python
  from flask import Flask, render_template
  ```

- templates 폴더를 생성한다.

  - 플라스크는 render_template메서드를 사용할 때 기본적으로 루트 디렉토리에 있는 templates라는 폴더를 탐색해서 html파일을 찾는다.

    * 위에 s를 빼먹으면 jinja2 관련 에러를 출력하니 조심하자!

    ```
    03_Flask/
    	templates/
    		index.html
    		...
    	app.py
    ```

  

### 1.6 Jinja2 템플릿 엔진 활용하기

  | 플라스크가 가지고 있는 Jinja2라는 템플릿 엔진을 활용해서 꾸며보자

- 조건문

  ```html
  <!-- greeting.html -->
  <body>
      {% if html_name == '도현'%}
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

  





