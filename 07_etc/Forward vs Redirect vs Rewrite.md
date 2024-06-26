# Forward vs Redirect

## 1. Forward

![image-20200406223308514](Forward_vs_Redirect.assets/image-20200406223308514.png)

- Web Container 차원에서의 페이지 이동만 존재
- 실제 웹 브라우저는 다른 페이지로 이동했음을 모름
- 그러므로 웹 브라우저에는 최초에 호출한 URL이 표시되고 이동한 페이지의 URL 정보 확인 불가
- 동일한 Web Container 차원에서의 페이지 이동만 가능
- **현재 실행 중인 페이지와 forward에 의해 호출될 페이지는 request, response 객체를 공유**
- 말 그대로 forward(건네주기)

## 2. Redirect

![image-20200406223525299](Forward_vs_Redirect.assets/image-20200406223525299.png)

- Web Container는 redirect 명령이 들어오면 웹 브라우저에게 다른 페이지로 이동 명령 내림
- 웹 브라우저는 URL을 지시된 주소로 바꾸고 그 주소로 이동
- 다른 Web Container에 있는 주소로 이동 가능
- **새로운 페이지에서는 request, response 객체가 새롭게 생성**

## 3. Rewrite

- 웹 서버에서 URL 재작성 규칙을 정의하여 클라이언트가 요청한 URL을 다른 URL로 내부적으로 매핑
- 클라이언트는 요청한 URL이 변경되었음을 알지 못함
- URL 구조를 깔끔하게 유지하거나 SEO를 개선하기 위해 사용
- 동일한 서버 내에서 다른 경로로 내부적으로 요청을 전달
- 예: 사용자 친화적 URL을 유지하면서 내부적으로 복잡한 경로를 처리

## 4. 정리

- **Forward** : 변화 X, 재사용 O
  - 시스템에 변화가 생기지 않는 단순 조회(리스트, 검색)
  - 클라이언트는 URL 변경을 알지 못함
  - 서버 내부에서 요청과 응답 객체를 공유
  - 예: 로그 파일 작성, 내부 서비스 호출
- **Redirect** : 변화 O, 재사용 X
  - 시스템(Session, DB)에 변화가 생기는 요청(로그인, 회원가입, 글쓰기)
  - 클라이언트는 URL 변경을 인식
  - 새로운 요청과 응답 객체를 생성
  - 예: 사용자 입력 처리 후 결과 페이지로 이동, 다른 도메인으로 이동
- **Rewrite**
  - 클라이언트가 요청한 URL을 내부적으로 다른 URL로 매핑
  - 클라이언트는 URL 변경을 알지 못함
  - 서버 측에서 URL 구조를 단순화하거나 SEO를 개선
  - 예: `/about` 요청을 `/about-us`로 매핑, `/user/123` 요청을 내부적으로 `/profile?id=123`로 처리