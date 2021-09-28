# Generator

- Generator Function은 사용자의 요구에 따라 다른 시간 간격으로 여러 값을 반환 가능
- 내부 상태 관리가 가능한 함수
- 단 한 번의 실행으로 함수의 끝까지 실행이 완료되는 일반 함수와는 달리, 사용자의 요구에 따라 (`yield`와 `next()`를 통해) 일시적으로 정지될 수 있고, 다시 시작 될 수 있음
- Generator와 Iterable객체를 함께 사용하면 손쉽게 데이터 스트림을 만들 수 있음
- Generator Function의 반환으로는 Generator가 반환됨

## 1. Generator Function

- Generator를 만들려면 특별한 문법 구조 `function*`이 필요

  ```javascript
  function* generatorFunction() {
      yield 1;
      yield 2;
      return 3;
  }
  ```

- Generator 함수를 호출하면 코드가 실행되지 않고, 대신 실행을 처리하는 특별 객체, **Generator Object 반환**

  ```javascript
  // Generator Object 생성
  let generator = generatorFunction();
  alert(generator);	// [object Generator]
  ```

- `next()`는 Generator의 주요 메서드

  - `next()`를 호출하면 가장 가까운 `yield <value>`문을 만날 때까지 실행 됨(`<value>` 생략 가능, 이 경우 `undefined`)
  - `next()`는 항상 두 property를 가진 object를 반환
    - `value`: 산출 값
    - `done`: 함수 코드 실행이 끝났으면 `true`, 아니면 `false`

  ```javascript
  // 위 소스에 이어서
  
  generator.next(); // {value: 1, done: false}
  generator.next(); // {value: 2, done: false}
  generator.next(); // {value: 3, done: true}
  generator.next(); // {value: undefined, done: true}
  ```

  

