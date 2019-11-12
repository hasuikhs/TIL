# Model Relationships

- 현재 User와 Article의 관계는 `User : Article = 1 : N` 이다.
  - [참조] `article.user`
  - [역참조] `user.article_set`
- 관점을 조금 바꿔서, `User : Article = M : N` 으로 설정하고 다시 생각해보자. 유저와 게시글 관계에서 서로 좋아요를 표현할 수 있다고 생각해보자.
  - User는 여러 개의 게시글에 Like를 할 수 있고,
  -  Article은 여러 명의 User로부터 Like를 받을 수 있다.

## 1. Many to One

- 새로운 폴더를 만들고 이동하여 프로젝트와 앱을 만들어주자.

  ```bash
  (venv)
  student@M150123 MINGW64 ~/Desktop/TIL/05_Django (master)
  $ cd 06_model_relation/
  
  (venv)
  student@M150123 MINGW64 ~/Desktop/TIL/05_Django/06_model_relation (master)
  $ django-admin startproject config .
  
  (venv)
  student@M150123 MINGW64 ~/Desktop/TIL/05_Django/06_model_relation (master)
  $ python manage.py startapp manytoone
  ```

- `settings.py`

  ```python
  INSTALLED_APPS = [
      'manytoone',
      'django_extensions',
      ...
  ]
  ```

- `models.py`

  ```python
  from django.db import models
  
  # Create your models here.
  class User(models.Model):
      name = models.TextField()
  
      def __str__(self):
          return f'{self.name}'
  
  class Article(models.Model):
      title = models.TextField()
      user = models.ForeignKey(User, on_delete=models.CASCADE)
  
      def __str__(self):
          return f'{self.title}'
  
  class Comment(models.Model):
      content = models.TextField()
      article = models.ForeignKey(Article, on_delete=models.CASCADE)
      user = models.ForeignKey(User, on_delete=models.CASCADE)
  
      def __str__(self):
          return f'{self,content}'
  ```

- 마이그레이션 해주자

  ```bash
  (venv)
  student@M150123 MINGW64 ~/Desktop/TIL/05_Django/06_model_relation (master)
  $ python manage.py makemigrations
  
  Migrations for 'manytoone':
    manytoone\migrations\0001_initial.py
      - Create model Article
      - Create model User
      - Create model Comment
      - Add field user to article
      
      
  (venv)
  student@M150123 MINGW64 ~/Desktop/TIL/05_Django/06_model_relation (master)
  $ python manage.py migrate
  
  Operations to perform:
    Apply all migrations: admin, auth, contenttypes, manytoone, sessions
  Running migrations:
    ...
    Applying manytoone.0001_initial... OK
    Applying sessions.0001_initial... OK
  ```

- **쿼리 실습**

  - ```
    user1 = User.objects.create(name='Kim')
    user2 = User.objects.create(name='Lee')
    article1 = Article.objects.create(title='1글', user=user1)
    article2 = Article.objects.create(title='2글', user=user1)
    article3 = Article.objects.create(title='3글', user=user2)
    c1 = Comment.objects.create(content='1글1댓글', user=user1, article=article1)
    c2 = Comment.objects.create(content='1글2댓글', user=user2, article=article1)
    c3 = Comment.objects.create(content='1글3댓글', user=user1, article=article1)
    c4 = Comment.objects.create(content='1글4댓글', user=user2, article=article1)
    c5 = Comment.objects.create(content='2글1댓글', user=user1, article=article2)
    c6 = Comment.objects.create(content='!1글5댓글', user=user2, article=article1)
    c7 = Comment.objects.create(content='!2글2댓글', user=user2, article=article2)
    ```

  1. 1번 사람이 작성한 게시글을 다 가져오기

     ```
     user1.article_set.all()
     ```

  2. 1번 사람이 작성한 모든 게시글에 달린 댓글 가져오기

     ```
     1 for article in user1.article_set.all():
     2     for comment in article.comment_set.all():
     3         print(comment.content)
     ```

  3.  2번 댓글을 작성한 User는?

     ```
     c2.user
     ```

  4. 2번 댓글을 작성한 User의 이름은?

     ```
     c2.user.name
     ```

  5. 2번 댓글을 작성한 사람의 모든 게시글은?

     ```
     In [9]: Article.objects.get(pk=c2.user.pk)
     Out[9]: <Article: 3글>
     
     In [10]: c2.user.article_set.all()
     Out[10]: <QuerySet [<Article: 3글>]>
     ```

  6.  1번 글의 첫번째 댓글을 작성한 사람의 이름은 ?

     ```
     In [13]: article1.comment_set.all()[0].user.name
     Out[13]: 'Kim'
     
     In [14]: article1.comment_set.first().user.name
     Out[14]: 'Kim'
     ```

  7.  1번 글의 2번째부터 4번째 까지 댓글 가져오기

     ```
     article1.comment_set.all()[1:4]
     ```

  8.  1번 글의 첫번째, 두번째 댓글 가져오기

     ```
     article1.comment_set.all()[0:2]
     ```

  9.  1번 글의 두번째 댓글을 작성한 사람의 첫번째 게시물의 작성자의 이름은?

     ```
      article1.comment_set.all()[1].user.article_set.all()[0].user.name
     ```

  10. 1번 댓글의 user정보만 가져오기

      ```
      Comment.objects.values('user').get(pk=1)
      ```

  11.  2번 사람이 작성한 댓글을 pk 내림차순으로 가져오면?

      ```
      In [27]: User.objects.get(pk=2).comment_set.all()[::-1]
      Out[27]: [<Comment: !2글2댓글>, <Comment: !1글5댓글>, <Comment: 1글4댓글>, <Comment: 1글2댓글>]
      
      In [29]: user2.comment_set.order_by('-pk')
      Out[29]: <QuerySet [<Comment: !2글2댓글>, <Comment: !1글5댓글>, <Comment: 1글4댓글>, <Comment: 1글2댓글>]>
      ```

  12.  제목이 '1글'이라는 게시글을 전부 가져오면?

      ```
      In [31]: Article.objects.filter(title='1글')
      Out[31]: <QuerySet [<Article: 1글>, <Article: 1글>, <Article: 1글>, <Article: 1글>, <Article: 1글>, <Article: 1글>, <Article: 1글>]>
      ```

## 2. Many to Many

- 앱 등록

  ```bash
  student@M150123 MINGW64 ~/Desktop/TIL/05_Django/06_model_relation (master)
  $ python manage.py startapp manytomany
  ```

- `INSTALLED_APP` 등록

  ```python
  INSTALLED_APPS = [
      'manytoone',
      'manytomany',
      ...
  ]
  ```

### 2.1 1:N의 한계

### 2.2 중개 모델 생성

- 1:N 으로만 구현하려니 예약 정보 시스템을 표현하기 어렵다.
  - 에를 들어 Patient가 다른 Doctor에게 진료를 받고자 할때, 기존 기록을 지우지 않으려면 새로운 Patient 인스턴스를 생성해야 한다.
- 중개 모델(class Reservation)을 만들어서 Doctor와 Patient를 이어주는 예약 정보를 담아보자.

### 2.3 `through` 옵션

- patient 입장에서 `reservation_set` 형태로 예약정보를 가져오는 것은 너무 불편하다.
  - 마찬가지로 Doctor도 `reservation_set` 형태로 예약 정보를 먼저 불러온 뒤에 Patient 정보를 꺼내올 수 있다.
- `through` 옵션을 통해 Doctor 정보를 중개 모델을 거치지 않고, 다이렉트로 가져와보자.

### 2.4 `related_name`

- 이제 Patient 입장에서는 `patient.doctors.all()`과 같은 형태로 쉽게 Doctor 정보를 가져올 수 있다.
- 마찬가지로 Doctor 입장에서도 `doctor.patients.all()`과 같은 형태로 Patient 정보를 가져올 수 있게끔, `related_name` 옵션을 사용해보자.

### 2.5 Many To Many

- 단순히 Doctor와 Patient를 이어줄 생각이라면, 굳이 중개모델이 필요 없다. `ManyToManyField`만 사용하면 장고가 자동으로 중개 테이블을 만들어준다.

- `models.py`

  ```python
  from django.db import models
  
  # Create your models here.
  class Doctor(models.Model):
      name = models.TextField()
  
      def __str__(self):
          return f'{self.pk}번 의사 {self.name}'
  
  class Patient(models.Model):
      name = models.TextField()
      doctors = models.ManyToManyField(Doctor, related_name='patients')
      def __str__(self):
          return f'{self.pk}번 환자 {self.name}'
  ```

- 마이그레이트

  ```bash
  student@M150123 MINGW64 ~/Desktop/TIL/05_Django/06_model_relation (master)
  $ python manage.py makemigrations
  Migrations for 'manytomany':
  
  student@M150123 MINGW64 ~/Desktop/TIL/05_Django/06_model_relation (master)
  $ python manage.py migrate
  ```

- 실습

  ```bash
  $ python manage.py shell_plus
  ```

  ```bash
  In [6]: doctor1 = Doctor.objects.create(name='도현')
  
  In [7]: doctor2 = Doctor.objects.create(name='은애')
  
  In [9]: patient1 = Patient.objects.create(name='민승')
  
  In [10]: patient2 = Patient.objects.create(name='세환')
  ```

  ```bash
  In [8]: doctor1.patients.all()
  Out[8]: <QuerySet [<Patient: 1번 환자 세환>]>
  
  In [9]: doctor1.patients.add(patient2)
  
  In [10]: doctor1.patients.all()
  Out[10]: <QuerySet [<Patient: 1번 환자 세환>, <Patient: 2번 환자 민승>]>
  
  In [11]: doctor1.patients.remove(patient1)
  
  In [12]: doctor1.patients.all()
  Out[12]: <QuerySet [<Patient: 2번 환자 민승>]>
  ```