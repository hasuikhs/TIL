# URL vs URI

## 1. URL ( Uniform Resource Locator)

- 자원
- 예전에는 URL이 가르키는게 파일 소스
- 요즘은 Rewrite등의 아파치,톰켓등의 핸들러 때문에 자원이라고 부름
- 웹사이트 주소가 요청하는 파일이라기 보다는, 구분자로 보는 것
- 웹 상에 서비스를 제공하는 각 서버들에 있는 파일의 위치를 표시하기 위한 것
  \- http://blong.com/work/test.pdf 는 blog.com서버에서 work폴더안의 test.pdf를 요청

## 2. URI ( Uniform Resource Identifier)

### 2.1 URI ?

- 통합 자원 식별자

- 인터넷에 있는 자원을 나타내는 유일한 주소이다.

- URI의 존재는 인터넷에서 요구되는 기본조건으로서, 인터넷 프로토콜에 항상 붙어다님
  \- ex) [http://www.naver.com](http://www.naver.com/) (http프로토콜임을 명시하고 있음)

- URI의 하위개념에 URL, URN이 포함되어 있다.

- URI의 보편적인 형태가 URL인데, URI의 부분집합으로 볼 수 있다.

  \- 자원에 접근하기 위해 사용되는 절차

  - 어떤 자원을 가지고 있는 특정한 컴퓨터
  - 컴퓨터 상의 유니크한 자원의 이름(파일명)

- http://test.com/test.pdf?docid=111이라는 주소는 URI이지만 URL은 아니다.

  - http://test.com/test.pdf까지만 URL임(주소의 위치)

  - docid=111이라는 쿼리스트링의 값에 따라 결과가 달라지게됨, 따라서 식별자 역할을 하고 있음

- http://test.com/test.pdf?docid=111 ,http://test.com/test.pdf?docid=112는 같은 URL을 가지고 다른 URI를 가짐

### 2.2 URI의 구성 요소

|  요소명  |                            설 명                             |
| :------: | :----------------------------------------------------------: |
|  Scheme  |     웹 서버 접속 시 어떤 프로토콜을 사용할지에 대한 정보     |
|   Host   |   Authority의 일부이며 접속할 웹 서버의 호스트에 대한 정보   |
|   Port   |    Authority의 일부이며 접속할 웹 서버의 포트에 대한 정보    |
|   Path   |       접속할 웹 서버의 경로에 대한 정보(`'/'`로 구분)        |
|  Query   |          웹 서버에 전달하는 파라미터(`'?'`로 구분)           |
| Fragment | 메인 리소스 내에 존재하는 서브 리소스에 접근할 경우 식별하기 위한 정보(`'#'`로 구분) |

- 예) `http://example.com:80/path?search=1#fragment`
  - **Scheme** : http://
  - **Host** : example.com
  - **Port** : 80
  - **Path** : /path
  - **Query** : ?search=1
  - **Frangment** : #fragment