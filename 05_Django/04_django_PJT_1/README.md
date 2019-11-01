# 종합 실습 프로젝트 1

## 0. 환경 설정

### 0.1 프로젝트 폴더 생성

- 새로운 프로젝트를 시작하기 위해서 `04_django_PJT_1 `를 생성해주자.

![image-20191101092640025](README.assets/image-20191101092640025.png)

- bash를 이용해 새로 생성한 프로젝트 폴더로 이동하자.

  ![image-20191101093039820](README.assets/image-20191101093039820.png)

### 0.2 새로운 가상환경 생성 및 Django 설치

- 해당 폴더 위치에서 venv 가상환경을 생해주자.

  ```bash
  student@M150123 MINGW64 ~/Desktop/TIL/05_Django/04_django_PJT_1 (master)
  $ python -m venv venv
  ```

- 새로 만들어진 가상환경을 activate 해주자.

  ```bash
  student@M150123 MINGW64 ~/Desktop/TIL/05_Django/04_django_PJT_1 (master)
  $ source venv/Scripts/activate
  ```

- 새로운 가상환경에 djang를 install 해주자.

  ```bash
  (venv)
  student@M150123 MINGW64 ~/Desktop/TIL/05_Django/04_django_PJT_1 (master)
  $ pip install django
  ```

### 0.3 Django 프로젝트 시작

- 장고 프로젝트를 시작해보자.

  ```bash
  (venv)
  student@M150123 MINGW64 ~/Desktop/TIL/05_Django/04_django_PJT_1 (master)
  $ django-admin startproject config .
  ```

- 해당 스크립트를 실행하면 프로젝트가 생성이 된다.

  ```
  04_django_PJT_1/
  	config/
  		__init__.py
  		setting.py
  		urls.py
  		wsgi.py
  	venv/
  	manage.py
  ```

- 프로젝트 생성 후 간단하게 `settings.py` 에서 언어와 시간을 설정해주자.

  ```python
  # config/settings.py
  ... 
  # 106번째 줄에 존재
  LANGUAGE_CODE = 'ko-kr'
  
  TIME_ZONE = 'Asia/Seoul'
  ...
  ```

- 설정이 끝났다면 runserver를 이용해 서버를 실행해보자.

  ```bash
  (venv)
  student@M150123 MINGW64 ~/Desktop/TIL/05_Django/04_django_PJT_1 (master)
  $ python manage.py runserver
  ```

  ```bash
  Watching for file changes with StatReloader
  Performing system checks...
  
  System check identified no issues (0 silenced).
  
  You have 17 unapplied migration(s). Your project may not work properly until you apply the migrations for app(s): admin, auth, contenttypes, sessions.
  Run 'python manage.py migrate' to apply them.
  November 01, 2019 - 09:42:50
  Django version 2.2.6, using settings 'config.settings'
  Starting development server at http://127.0.0.1:8000/
  Quit the server with CTRL-BREAK.
  ```

- 위와 같이 뜬다면 django server를 돌리는데 성공하였다. 해당 주소로 가서 로켓 모양 페이지를 확인해보자.

  ![image-20191101094837385](README.assets/image-20191101094837385.png)

### 0.4 