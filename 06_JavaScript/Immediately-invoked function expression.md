# Immediately-invoked function expression

- 즉시실행함수(Immediately-invoked function Expression: IIFE)

- 이름 그대로 정의되자 마자 즉시 실행되는 함수

- 기본형

  ```javascript
  (function() {
    // code
  })();
  ```

- **외부에서 접근 불가능한 자체 scope를 가짐**

  - 즉시실행함수는 상위 scope에 접근 가능

  ```javascript
  let a = 1;
  
  (function () {
    let b = 2;
    console.log('a:', a);
    console.log('b:', b);
  })();
  
  console.log('a:', a);
  console.log('b:', b); // Uncaught ReferenceError: b is not defined
  ```

- 보편적으로 **전역 스코프를 오염 방지**를위해 사용

  - 글로벌 scope에 정의된 것은 코드 어느 부분에서든 접근 가능
  - 외부에 공유되면 안되는 속성, 함수 / 변수명 중복 등의 경우에 발생할 문제를 방지

  ```javascript
  let a = 1;
  console.log('prev iife a:', a); // 1
  
  (function($){
    let a = 2;
    console.log('iife a:', a);	  // 2
  })();
  
  console.log('next iife a:', a); // 1
  ```

- 사용상 가장 큰 목적은 **데이터 보호와 코드 모듈화**

  - IIFE 내부에서 정의된 변수는 외부 scope에서 접근 불가능

- **즉시실행함수는 런타임 시에 즉시 호출되며 한번 실행 후에는 다시 호출 불가능**

- 반복문 예제

  ```javascript
  let i;
  for (i = 0; i < 10; i++) {
    setTimeout(() => {
      console.log(i);	// 10만 10번 출력
    }, 1000);
  }
  
  // 전역 변수 i를 setTimeout에서 참조하므로, 이미 짧은 시간동안 i가 10까지 모두 증가한 상태
  ```

  ```javascript
  let i;
  for (i = 0; i < 10; i++) {
    (function (j) {
      setTimeout(() => {
        console.log(j);	// 0 ~ 10 순서대로 출력
      }, 1000);
    })(i)
  }
  
  // 전역 변수 i를 iife의 매개변수로 넘겨주어 증가 되는 i의 값을 순차적으로 들어감
  // 하지만 매개 변수 i를 빼고 console.log(i)로 고치면 이미 모두 증가된 10의 값이 10번 출력됨
  ```