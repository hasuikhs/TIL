- Static files 기본 경로
  - 기본적으로 애플리케이션 안에 있는 `static`  디렉토리를 탐색해서 정적 파일을 가져온다.
- `{% load static %}`
  - 해당 페이지에 정적 파일들을 불러와서 사용하겠다고 선언
  - 일반적으로는 HTML 문서 상단에 위치. 상속받는 `{% extends %}`태그가 존재하면, 상속태그 밑에 위치한다.
- `{% static %}`
  - 해당하는 경로에 있는 파일에 대해, 장고가 접근할 수 있는 절대 URL 경로를 생성한다.
  - 실제 파일이 위치한 경로는 아님
  - `127.0.0.0:8000/static/articels/images/sample.png`



## Static files 경로 커스터마이징

```python
# settings.py
...

# 정적 파일이 위치한 경로
# 앞으로 static 파일을 찾을 때 아래 설정한 경로에 찾아가서 탐색한다.
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'config', 'assets'),
]
```

