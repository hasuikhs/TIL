# jQuery 적용

## 1. jQuery 적용

- jQuery는 자바스크립트 라이브러리이므로, jQuery 파일은 자바스크립

- 웹 페이지에서 jQuery를 사용하기 위해서는 jQuery 파일을 먼저 웹 페이지에 로드해야 함

### 1.1 파일을 받아 쓰는 방법

- [jQuery 다운로드](https://jquery.com/download/)

- 다운로드 받은 jQuery 파일을 서버에 저장하고, `<script>` 태그를 웹 페이지의 `<head>` 태그 내에 삽입

  ```html
  <head>
      <script src="/파일경로/jquery_파일명.js"></script>
  </head>
  ```

### 1.2 CDN을 이용하여 로드하는 방법

- CDN(Content Delivery Network)란 웹 사이트의 접속자가 서버에서 콘텐츠를 다운받아야할 때, 자동으로 가장 가까운 서버에서 다운 받도록 하는 기술

  ```html
  1. jQuery.com CDN : <script src="https://code.jquery.com/jquery-1.12.4.min.js"></script>
  
  2. 구글 CDN       : <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
  
  3. MS CDN         : <script src="http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.12.4.min.js"></script>
  
  4. CDNJS CDN      : <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
  
  5. jsDelivr CDN   : <script src="https://cdn.jsdelivr.net/jquery/1.12.4/jquery.min.js"></script>
  ```

  

