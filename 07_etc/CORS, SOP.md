# CORS, SOP

## 1. CORS

### 1.1 CORS?

- Cross-Origin Resource Sharing(교차 출처 리소스 공유)

  - 출처는 `Protocol`, `Host`, `Port` 까지 모두 합친 것
  - 하지만 포트가 있더라도 이 케이스에 대한 명확한 정의가 표준으로 정해진 것은 아니기에 경우에 따라 다름

- 브라우저 간의 데이터를 주고 받는 과정에서, **도메인 이름이 서로 다른 사이트 간에 API 요청을 할 때, 공유를 설정하지 않았을시 발생하는 에러**

- 특정 도메인간(cross-domain) 요청, 특히 Ajax 요청은 동일-출처 보안정책(same-origin policy)에 의해 기본적으로 금지

- 브라우저 상에서 발생하는 것이므로 개발자 도구에서 네트워크 탭을 확인하면 200 응답으로 정상적인 반환이 일어졌음을 확인 가능

- JavaScript로 알아낼 수 있음

  ```javascript
  location.origin
  ```

### 1.2 해결 방법

#### 1.2.1 서버 측

- HTTP 응답헤더 `Access-Control-Allow-Origin: *` or `Access-Control-Allow-Origin: <허용 도메인>` 설정
- `Access-Control-Allow-Origin: *` 은 모든 보안에서 해제되므로 추천되지 않음
- 반드시 `Access-Control-Allow-Origin: <허용 도메인>` 을 사용하자

#### 1.2.2 클라이언트 측

- 리소스 요청하는 서버 사이에 **프록시 서버**를 하나 두고 요청, 응답 주고 받기

## 2. SOP

- SOP(Same-Origin Policy)

- 한 origin으로부터 로드된 document 또는 script가 다른 origin의 리소스와 상호작용 가능한 방법을 제한하는 브라우저 보안 모델

- same origin 예시

  ```
  https://www.example.com/path/page1.html
  https://www.example.com:443/path2/page2.html
  http://www.example.com/index.html
  https://test.example.com/index.html
  https://test.example.com:8443/test.html
  ```

  - https는 기본적으로 443 포트이므로 1번 2번만 same origin 

- 웹이 발전함에 따라 다른 서버에서 api를 요청하여 리소스를 받아와야하는 경우가 생기는일이 빈번해져서 CORS가 등장