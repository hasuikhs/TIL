# Django Model (ORM)

## 1. Model

- 장고 MTV 패턴
  - **Model**
    - 특정한 데이터의 구조(모양)에 대한 정보를 가지고 있다.(-> 데이터의 모양을 정의하는 곳)
    - 하나의 모델 클래스는 실제 DB에는 하나의 테이블로 매핑된다.
    - 컬럼들에 대한 정보, 해당 데이터에 대한 정보를 정의하는 곳
  - Template
  - View
- Model 로직
  - 데이터베이스 컬럼(열)과 어떠한 타입으로 정의할 것인지에 대한 정보를 `django.db.models`라는 곳에서 상속받아서 정의한다.
  - 모든 필드들은 `NOT NULL` 조건이 붙는다.
  - 각각의 클래스 변수는 데이터베이스 필드를 나타낸다.

### 1.1 Migration

- `makemigrations`

  - 실제 데이터베이스 테이블을 만들기 전에 설계도를 그려보는 작업

    - Python 코드로 데이터베이스 설계도를 작성한다.

  - migrations 폴더에서 확인해 볼 수 있다.(`0001_initial.py`, ...)

    ![3](C:\Users\student\Desktop\새 폴더 (2)\191030\3.JPG)

- `sqlmigrate`

  - 데이터베이스에 실제로 반영하기 전에 **설계한 Python 코드가 SQL문으로 바뀐 모습을 확인**해 볼 수 있다.

    ![4](C:\Users\student\Desktop\새 폴더 (2)\191030\4.JPG)

- `showmigrations`

  - migration 설계도를 작성했는데, 이 **설계도가 실제 DB에 반영되었는지 여부를 확인**

    ![5](C:\Users\student\Desktop\새 폴더 (2)\191030\5.JPG)

- `migrate`

  - `makemigrations`로 만든 **설계도를 실제 데이터베이스(sqlite3)에 반영**한다.

  - 모델의 변경사항과 데이터베이스 스키마를 동기화한다.

    ![6](C:\Users\student\Desktop\새 폴더 (2)\191030\6.JPG)

    ![7](C:\Users\student\Desktop\새 폴더 (2)\191030\7.JPG)

## 2. ORM - CRUD

> 우리는 앞으로 데이터베이스에 `SQL 쿼리문`을 날려서 데이터를 조작하는 것이 아니라, `ORM`을 통해 **클래스의 인스턴스 객체로 데이터베이스를 조작**한다. 

- ORM이 리턴되는 형식
  - QuerySet : 다수의 객체가 담김 (파이썬 리스트 다루는 것과 비슷)
  - Query : 단일 객체
- `모델명.objects.명령`
  - objects : 모델 클래스 정보를 토대로 실제 데이터베이스에 쿼리(SQL)를 날려서 데이터베이스와 의사소통 하는 통역사(매니저) 역할
- **우리가 ORM을 사용하는 이유?**
  - SQL문에 종속되지 않고 데이터를 객체 형태로 다루기 위해 (프로그래밍 언어만 알아도 DB 핸들링 가능)

### 2.1 Create

```sqlite
# 첫번째 방법
article = Article()
article.title = ''
article.content = ''
article.save()

# 두번째 방법 : 함수에서 키워드 인자 넘겨주는 방식
article = Article(title='', content='')
article.save()

# 세번째 방법 : 쿼리셋 객체 생성과 DB 저장을 한번에 해결
Article.objects.create(title='sdsd', content='sdsd')
```

```sqlite
# 유효성 검증
> article.null_clean()
```

### 2.2 Read

```sqlite
# 1. pk를 기준으로 내림차순하기
In [15]: articles = Article.objects.order_by('-pk')

# 2. 리스트처럼 사용해서 2, 3 번 데이터 뽑아오기
In [18]: articles = Article.objects.all()[1:3]

In [19]: articles
Out[19]: <QuerySet [<Article: [2]: second|djnago>, <Article: [3]: third|django>]>

# 3. title에 fir이 포함된 객체 뽑아오기
In [22]: Article.objects.filter(title__contains='fir')
Out[22]: <QuerySet [<Article: [1]: first|django>, <Article: [5]: first|hihi>]>

# 4. title이 first로 시작하는 객체 뽑아오기
In [24]: articles = Article.objects.filter(title__startswith='first')

In [25]: articles
Out[25]: <QuerySet [<Article: [1]: first|django>, <Article: [5]: first|hihi>]>

# 5. title이 d로 끝나는 객체 뽑아오기
In [26]: articles = Article.objects.filter(title__endswith='d')

In [27]: articles
Out[27]: <QuerySet [<Article: [2]: second|djnago>, <Article: [3]: third|django>]>
```

### 2.3 Update

```sqlite
# 1. 수정할 인스턴스 가져오기
In [28]: article = Article.objects.get(pk=2)

# 1.1 가져온 값 확인
In [29]: article
Out[29]: <Article: [2]: second|djnago>

# 2. 인스턴스 값 수정하기
In [30]: article.title = 'hello'

# 2.1 바뀐 값 확인
In [31]: article.title
Out[31]: 'hello'

# 3. 저장
In [32]: article.save()

# 4. 잘 저장되어있는지 확인
In [33]: article
Out[33]: <Article: [2]: hello|djnago>
```

### 2.4 Delete

```sqlite
In [34]: article.delete()
Out[34]: (1, {'articles.Article': 1})
```

### 2.5 Django-Extensions

> 기본 Django Shell은 직접 모델을 import 해주어야 하는 불편함이 있었지만, shell_plus는 필요한 모델을 자동으로 import 해주기 때문에 편리하다.

- 설치하기

  ```bash
  $ pip install django-extensions
  ```

- 앱 등록하기

  ```python
  # settings.py
  INSTALLED_APPS = [
      ...
      'django_extensions',
      ...
  ]
  ```

- Shell 실행하기

  ```bash
  $ python manage.py shell_plus
  ```

  ```
  # Shell Plus Model Imports
  from articles.models import Article
  ...
  
  In [1]:
  ```

  

