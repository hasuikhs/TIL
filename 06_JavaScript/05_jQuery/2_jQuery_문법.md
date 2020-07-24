# jQuery 문법

## 1. jQuery 문법

- jQuery를 사용하면 아주 간편하게 HTML 요소를 선택하고, 선택된 요소에 손쉽게 특정 동작 설정 가능

- 기본적인 문법은 다음과 같음

  ```javascript
  $(선택자).동작함수()
  ```

  - `$`기호는 jQuery를 의미하고, jQuery에 접근 가능하게 해주는 식별자
  - 선택자를 이용하여 원하는 HTML 요소를 선택하고, 동작 함수를 정의하여 선택된 요소에 원하는 동작을 설정

## 2. $() 함수

- `$()`함수는 선택된 HTML 요소를 jQuery에서 이용 가능한 형태로 생성
- `$()` 함수의 인수로는 HTML 태그 이름뿐만 아니라, CSS 선택자를 전달하여 특정 HTML 요소를 선택 가능
- 이러한 `$()` 함수를 통해 생성된 요소를 jQuery object라고 함

## 3. Document 객체의 ready() 메소드

- JavaScript 코드는 웹 브라우저가 문서의 모든 요소를 로드한 뒤 실행되어야 함

- 보통은 별다른 문제가 발생하지 않지만, 다음과 같은 경우에는 오류가 발생

  - 아직 생성되지 않은 HTML 요소에 속성을 추가하려고 할 경우
  - 아직 로드되지 않은 이미지의 크기를 얻으려고 할 경우

- 그래서 JavaScript에서는 Window 객체의 onload() 메소드를 이용하여 문서가 모두 로드된 뒤에 코드가 실행되도록 설정

  ```javascript
  window.onload = function() {
      // javascript code
  }
  ```

- 마찬가지로 jQuery에서는 Document 객체의 ready() 메소드를 이용하여 같은 결과 출력

  ```javascript
  $(document).ready(function() {
      // jQuery code
  })
  ```

- 더욱 짧은 문법

  ```javascript
  $(function() {
      // jQuery code
  })
  ```

  