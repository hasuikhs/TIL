# Global Variable & Global Object

## 1. 전역 변수(Global Variable)

- 전역 스코프는 스코프 체인의 가장 바깥쪽에 있는 스코프

  ```javascript
  let foo = 'outer';	// 이 변수는 전역 스코프에서 선언
  {
      let foo = 'inner';	// 이 변수는 블록 스코프에서 선언
      console.log(foo);	// inner
  }
  console.log(foo);	// outer
  ```

  - 1번째 줄과 같이 **전역 스코프에서 선언된 변수를 전역 변수(Global Variable)**
  
- 변수를 전역 스코프에서 선언하지 않더라도, 안쪽 스코프에서 `let`, `const`, `var`를 붙여주지 않아도 전역 스코프에 변수가 만들어짐

  ```javascript
  function test() {
      variable = 'test';
  }
  
  test();
  console.log(variable);	// test
  ```

- 전역 변수는 코드의 아무대서나 제한 없이 접근하고 조작 가능

  - 이런 점이 편하고 좋아보이지만, 추천되는 방법은 아님
  - **어떤 언어에서든 전역 변수에 의존해서 프로그래밍을 하는 것은 금기 됨**
  - 프로그램의 크기가 커짐에 따라 변수가 어떻게 변경될지 알 수 없음 (협업시 문제)
  - 전역 변수를 통해 너무 많은 부분이 결합(coupling) 됨

- **변수를 선언할 때는 그 변수를 필요로 하는 스코프 내에서만 접근 가능하게 설계해야 함**

## 2. 전역 객체(Global Object)

- **JS 구동 환경은 모두 전역 객체(Global Object)라는 특별한 객체를 가짐**
- 전역 객체는 언어 자체나 호스트 환경에 기본 내장되어 있는 경우가 많음
  - 브라우저 환경에서는 전역 객체를 `window`, Node.js 환경에서는 `global`
- 전역 객체의 이름을 `globalThis`로 표준화하자는 내용이 최근 추가되었지만, Chromium 기반이 아니면 지원하지 않음

- 브라우저에서 `let`이나 `const`가 아닌 `var`로 선언한 전역 함수나 전역 변수는 전역 객체의 프로퍼티가 됨

  ```javascript
  var test = 1;
  
  console.log(window.test);	// 1
  ```

  ```javascript
  let test = 1;
  
  console.log(window.test);	// undefined
  ```

  