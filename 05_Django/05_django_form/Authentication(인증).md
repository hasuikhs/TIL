# Authentication(인증)

> Django에서 이미 Auth 관련 기능을 만들어두었고, 우리는 자연스럽게 사용하고 있었다. `createsuperuser`를 통해 관리자 계정도 만들었고, Admin 페이지에서 로그인 기능도 사용하고 있었다.

- **세션(Session)**
  - 클라이언트가 서버에 접속하면, 서버가 특정한 session_id를 발급한다. 클라이언트는 session_id를 쿠키를 사용해 저장한다.
  - 클라이언트가 서버측 여러 페잊에 이동할 때마다, 해당 쿠키(session_id)를 이용해서 서버에 session_id를 전달한다.
  - 따라서 서버는 페이지가 바뀌더라도 같은 사용자임을 인지할 수 있다.
- **쿠키 vs 세션**
  - `쿠키` : 클라이언트 로컬에 파일로 저장
  - `세션` : 서버에 저장 (session_id는 쿠키 형태로 클라이언트 로컬에 저장됨)

## 1. Accounts

- 기존 앱에서 구현해도 되지만, Django에서는 일반적으로 기능 단위로 애플리케이션을 나누는 것이 일반적이므로 `accounts`라는 새로운 앱을 만들어보자.

- accounts 앱 생성

  ```bash
  <venv>
  student@M150123 MINGW64 ~/Desktop/TIL/05_Django/05_django_form (master)
  $ python manage.py startapp accounts
  ```

- `INSTALLED_APPS` 에 accounts 등록

  ```python
  # settings.py
  
  INSTALLED_APPS = [
      'accounts',
      ...
  ]
  ```

- URL 분리

  ```python
  # config/urls.py
  
  urlpatterns = [
      path('accounts/', include('accounts.urls')),
   	...
  ]
  
  # accounts/urls.py
  
  from django.urls import path
  from . import views
  
  app_name = 'accounts'
  urlpatterns = [
      path('', views.signup, name='signup'),
      
  ]
  ```


## 2. SignUp

- 회원가입 로직은 CRUD 중에 'CREATE'에 가깝다.
- `class User`는 이미 Django가 만들어 두었고, User 클래스와 연동되는 ModelForm인 `UserCreationForm`도 Django가 이미 준비해두었다.

```python

```

## 3. Login

- Django에서 로그인하는 것은 `session`을 create하는 것과 같다.
  - Django는 `session`에 대한 매커니즘을 생각하지 않아도 쉽게 사용할 수 있음
  - `session` 사용자가 로그인을 하면, 사용자가 로그아웃을 하거나 정해진 일정한 시간이 지나기 전까지는 계속 유지됨
- User를 인증하는 ModelForm : `AuthenticationForm`
  - `AuthenticationForm(request, request.POST)`

```python

```

## 4. Logout

- `auth_logout(request)`
  - 현재 유지하고 있는 `session`을 DELETE하는 로직

```python

```





#### `login_required`  데코레이터

- 로그인하지 않은 사용자의 경우 `settings.LOGIN_URL`에 설정된 절대 경로로 redirect된다.

  - LOGIN_URL의 기본 경로는 `accounts/login`이다.

    - 경로 커스터마이징이 필요하다면, `config/settings.py`에서 맨 아래에

      ```python
      LOGIN_URL = '/members/login/'
      ```

      와 같이 넣어주자 여기서 members는 임의의 앱

  - 우리가 앱 이름을 `accounts`라고 했던 이유들 중 하나.

- `login_required`를 사용햇을 경우, 주소창에 특이한 쿼리스트링이 붙는다.

  ![image-20191111104643783](Authentication(%EC%9D%B8%EC%A6%9D).assets/image-20191111104643783.png)

- **"next" 쿼리 스트링 파라미터**

  - @login_required는 기본적으로 성공한 뒤에 사용자를 어디로 보낼지(redirect)에 대한 경로를 next라는 파라미터에 저장한다.
  - 사용자가 접근했던 페이지가 반드시 로그인이 필요한 페이지였기 때문에, 일단 로그인 페이졸 강제로 보낸 다음에 로그인을 끝내고 나면 **원래 요청했던 주소로 보내주기 위해 경로를 keep** 해둔다.
  - 우리가 따로 설정해주지 않으면, view에 설정해둔 redirect 경로로 이동한다. next에 담긴 경로로 이동시키기 위해, 코드를 바꾸어야한다.

```python
def login(request):
    ...
    if request.method == 'POST':
        form = AuthenticationForm(request, request.POST)
        if form.is_valid():
            auth_login(request, form.get_user())
            # next 파라미터 내용이 있으면 next 경로로 보내고, 없으면 메인 페이지로 보낸다.
            return redirect(request.GET.get('next') or 'articles:index')
        else:
        form = AuthenticationForm()
    context = {'form' : form}
    return render(request, 'accounts/login.html', context)
```



## 5. SignOut(회원탈퇴)

- CRUD 로직에서 User 테이블에서 User 레코드 하나를 삭제시키는 DELETE 로직과 흡사하다.
- 로그인 된 상태에서만 회원 탈퇴 링크를 만들어서 접근할 수 있도록 한다.
- 