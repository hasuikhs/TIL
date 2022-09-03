# Rendering
## 0. MPA vs SPA
- **MPA(Multi Page Application)**
  - 말 그대로 여러 개의 Page로 구성된 application이며 전통적인 개발 방식
  - 기본적으로 SSR을 따르며 새로운 **페이지를 요청할 때마다** 서버에서 정적 리소스(HTML, CSS, JS)가 받아짐
  - PHP, JSP 등
  - **장점**
    - SEO(Search Engine Optimiztion)에 유리
  - **단점**
    - 새로운 페이지 이동시 화면이 깜빡임
    - 프론트엔드(FE)와 백엔드(BE)의 관련이 깊어 개발이 복잡해 질수 있음
- **SPA(Single Page Application)**
  - 과거 웹 사이트는 문서 하나에 전달되는 파일의 용량이 작아서, 사용자의 요청에 따라 완전히 새로운 페이지를 서버에서 제공
  - 하지만 오늘날 웹 사이트가 복잡해짐에 따라 매번 새로운 페이지를 전달하는 것은 리소스를 많이 먹고 비효율적이게 됨
  - 이런 배경에 따라 **페이지 변경 없이 하나의 페이지 안에서 application이 구동되는 SPA가 등장**
  - React, Vue, Angular 등
  - **장점**
    - 페이지 요청시 일부만 업데이트하기에 전체적인 자원 관리에 효율적
    - 일부만 업데이트하기에 새로고침이 없어 화면 깜짝임이 없음
  - **단점**
    - application에 필요한 정적 리소스를 한번에 받기에 초기 구동속도가 느림(splitting을 따로해줘야 개선 가능)
    - html 파일의 내용이 아무것도 없기 때문에 SEO가 어려움
## 1. CSR(Client Side Rendering)
- Client에서 알아서 화면을 그리는 방식
- 최초 하나의 html 파일을 하나 받는데, 링크된 js파일을 같이 받아 정해진 로직에 따라 동적으로 html을 생성하여 화면을 보여줌
- 사이트 내에서 url을 이동하더라도 새로운 htmlf을 파일을 받지 않음
- **장점**
  - 화면 깜빡임이 없음
  - 초기 로딩 이후 속도가 빠름
  - 클라이언트의 자원을 사용하기에 서버에 부하가 적음
- **단점**
  - 프로젝트가 커질수록 코드량이 많아지면서 js 파일의 크기가 커지므로, 최초 로딩에 시간이 오래 걸림
  - SEO에 불리함
## 2. SSR(Server Side Rendering)
- Server에서 화면을 그려서 클라이언트에 제공하는 방식(html 파일을 만들어서 제공)
- **장점**
  - 초기 로딩 속도가 CSR보다 상대적으로 빠름
  - SEO에 유리함
- **단점**
  - 매 요청마다 서버의 자원을 사용하여 사용량이 많을 수록 서버에 부담
## 3. SSG(Static Site Generation)
## 4. ISR(Incremental Static Regeneration)