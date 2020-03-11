# Jenkins(Windows)

## 1. Jenkins ?

- Jenkins는 Java로 제작된 오픈소스 **지속적 통합(CI, Continuous Integration) 도구**
- Jenkins에는 Tomcat 서버가 내장되어 **Servlet Container 위에 돌아가는 웹 서버**
- 쉽게 빌드 결과물을 만들고 테스트하며 배포할 수 있는 유용한 도구

## 2. Jenkins 시작하기

### 2.1 Jenkins 다운로드 및 설치

- [다운로드](https://jenkins.io/download/thank-you-downloading-windows-installer-stable/)

- 정상적으로 설치가 완료되면 Jenkins 웹 서버가 자동으로 구동(`localhost:8080`)

### 2.2 잠금 해제

- 관리자 암호를 입력하라는 페이지가 나오면

  ![img](Jenkins(Windows).assets/99DB403C5C5CDC6709.png)

- `C:\Program Files (x86)\Jenkins\secrets`에서 `initialAdminPassword`에서 비밀번호를 읽어 입력

  ![image-20200311160334870](Jenkins(Windows).assets/image-20200311160334870.png)

### 2.3 설치 진행

- 입력 후 `Install suggested plugins` 선택

  ![img](Jenkins(Windows).assets/9995B4335C5CDCE905.png)

### 2.4 관리자 계정 설정 및 마무리

![image-20200311160808276](Jenkins(Windows).assets/image-20200311160808276.png)

- 세팅 완료

  ![image-20200311160925304](Jenkins(Windows).assets/image-20200311160925304.png)

- `localhost:8080`으로 접속하면

  ![image-20200311161055072](Jenkins(Windows).assets/image-20200311161055072.png)

- 포트 번호를 바꿔주고 싶다면 `C:\Program Files (x86)\Jenkins\jenkins.xml`에서 `httpPort=` 수정

  ![image-20200311161331777](Jenkins(Windows).assets/image-20200311161331777.png)

### 3. 설정

- Jenkins 메인 페이지에서 **Jenkins 관리**를 누르고, **Global Tool Configuration** 메뉴 진입

![image-20200311162620756](Jenkins(Windows).assets/image-20200311162620756.png)

### 3.1 Maven 설정

- maven이 설치되어 있지 않다면 [https://maven.apache.org/download.cgi](https://maven.apache.org/download.cgi)에서 다운로드
- 압축을 풀고 시스템 환경변수 `path`에 `[Maven 경로]/bin`을 등록

- **Settings file in filesystem**과 **Global settings file on filesystem**을 선택 후<br> `maven 경로/conf/settings.xml`을 등록

  ![image-20200311163559236](Jenkins(Windows).assets/image-20200311163559236.png)

- 밑으로 내리면 **Maven 메뉴**가 보이는데 **Add Maven** 버튼을 누르고 `install automatically` 체크 해제

- **MAVEN_HOME**에 경로 입력

  ![image-20200311163844676](Jenkins(Windows).assets/image-20200311163844676.png)

### 3.2 JDK

- **Add JDK** 버튼을 누르고 `install automatically` 체크 해제

- Maven과 마찬가지로 **JAVA_HOME**에 jdk  경로 입력

  ![image-20200311165108325](Jenkins(Windows).assets/image-20200311165108325.png)

### 3.3 GIT

- **GIT**에서 경로를 지정 없다면 [다운로드](https://git-scm.com/downloads)

![image-20200311165312053](Jenkins(Windows).assets/image-20200311165312053.png)

### 3.4 Plugin 관리

![image-20200311165655479](Jenkins(Windows).assets/image-20200311165655479.png)

[https://kutar37.tistory.com/entry/Jenkins-%EC%B6%94%EA%B0%80%EC%84%A4%EC%A0%95-Maven-JDK-Git-Plugin-2](https://kutar37.tistory.com/entry/Jenkins-추가설정-Maven-JDK-Git-Plugin-2)