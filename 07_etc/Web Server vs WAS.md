# Web Server vs WAS

## 1. Static Pages & Dynamic Pages

### 1.1 Static Pages

- Web Server는 파일 경로 이름을 받아 경로와 일치하는 file contents 반환
- 항상 동일한 Page 반환
- image, html, css, js 같은 컴퓨터에 저장되어 있는 파일

### 1.2 Dynamic Pages

- 인자의 내용에 맞게 동적인 Contents 반환
- 웹 서버에 의해서 실행되는 프로그램을 통해서 만들어진 결과물 위에서 돌아가는 프로그램

## 2. Web Server

- 다양한 기능을 하는 각가의 소프트웨어가 동작할 수 있는 환경이 되는 컴퓨터

- 웹 브라우저 클라이언트로부터 HTTP 요청을 받아 정적인 컨텐츠(html, jpg, css)를 제공
- HTTP 프로토콜을 기반으로 하여 클라이언트(브라우저 또는 크롤러)의 요처을 서비스하는 기능 담당
- Apache Server, Nginx, IIS

## 3. WAS(Web Application Server)

- 웹 서비스 자체가 돌아가는 서버

- DB 조회나 다양한 로직 처리를 요구하는 동적인 컨텐츠 제공을 위한 Application Server
- Web Server 기능들을 구조적으로 분리하여 처리하고자하는 목적으로 개발
- 현재 WAS가 가지고 있는 Web Server도 정적인 컨텐츠를 처리하는데 성능상 큰 차이 없음
- Tomcat, JBoss, Jeus, Web Sphere