# Promise와 Async, Await

> JavaScript 엔진은 **Single Thread**이다. 그래서 동시에 두 가지 이상의 작업을 할 수 없다. 그렇다면 여러 작업이 동시에 요청될 때 순서대로 작업이 완료될 때를 기다려야하므로, JavaScript는 비동기 처리가 가능하도록 설계되었다.

## 1. Promise

> JavaScript에서 **Promise는 비동기적으로 실행하는 작업의 결과(성공 or 실패)를 나타내는 객체**

### 1.1 Promise 생성자

- 생성자 함수와 동일하게 `new`로 `Promise` 객체를 만들 수 있음
- 이 때 인자로는 `Executor`가 들어가는데 `Excutor`는 `resolve`와 `reject` 라는 두 개의 함수를 매개변수로 받는 실행 함수
- **`Excutor`는 비동기 작업을 시작하고 모든 작업을 끝낸 후, 해당 작업이 성공적으로 이행 되면 `resolve` 함수를 호출하고, 중간에 오류가 발생한 경우 `reject` 함수를 호출**

- `Promise` 객체는 3가지 상태를 가짐
  - 대기(pending) : 아직 실행되지 않은 초기 상태
  - 이행(fulfilled) : 작업이 성공적으로 완료
  - 거부(rejected)  : 작업이 실패함

### 1.2 then() Method

- 작업이 성공적으로 이행되었거나, 실패 했을 때, 어떠한 작업을 해야 하는데 이 작업은 `then` 메소드에 의해 실행
- **`then` 메소드는 `Promise` 객체에 붙여서 사용**
- `then` 메소드는 `Promise` 객체를 리턴하고 두 개의 콜백 함수를 인수로 받음

```javascript
promise.then(successCallback, failureCallback)

promise.then(function(value) {
    // 성공 코드
}, function(reason) {
    // 실패 코드
})
```

- `then` 메소드는 `Promise` 객체를 리턴하고 인수로 받은 콜백 함수들의 리턴 값을 이어 받아 chaining이 가능

### 1.3 Callback Hell

- `Promise` 이전의 비동기 처리는 Callback 함수를 설정하는 방식으로 이루어짐
- 비동기가 완료되는 시점에 실행이 되는 callback 함수로 완료를 인지하고 그 다음 처리하게 됨
- **비동기 처리를 연속으로 해야하는 경우 Callback 함수에 Callback 함수가 들어가고 또 그 함수에 Callback 함수가 들어가는 현상을 Callback Hell 이라고 함**

```javascript
// 이전의 코드
a (function(resultA) {
    b(resultA, function(resultB) {
        c(resultB, function(resultC) {
            d(resultC, function(resultD) {
              // callback ...
            });
        });
    });
}
   
// then 이용 코드
promise.then(function(a) {
    
}).then(function(b) {
    
}).then(function(c) {
    
}).then(function(d) {
    
});
```

- 물론 `Promise`를 이용하여 Callback Hell을 완전히 탈출 가능한 것은 아니지만, Callback을 함수로 바로 넘겨받지 않고 객체에 이어서 사용 가능하게  되므로 훨씬 보기 쉬워짐

### 1.4 Promise.all()

- 순회 가능한 객체에 주어진 모든 Promise가 이행한 후,  혹은 Promise가 주어지지 않았을 때 이행하는 Promise 반환
- 주어진 Promise 중 하나가 거부하는 경우, 첫 번째로 거절한 프로미스의 이유를 사용해 자신도 거부
- **즉, 모든 Promise가 이행될 때까지 기다렸다가 그 결과값을 담은 배열을 반환**

```javascript
const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, 'foo');
});

Promise.all([promise1, promise2, promise3]).then((values) => {
  console.log(values);
});
// Array [3, 42, "foo"]
```

## 2. Async, Await

> `async`와 `await`는 JavaScript의 비동기 처리 패턴 중 가장 최근에 나온 문법이다. 기존의 비동기 처리 방식인 callback 함수와 `Promise`의 단점을 보완하고 개발자가 읽기 좋은 코드를 작성 가능케 함
>
> `yield` 대신 사용할 수 있음

### 2.1 기본 문법

```javascript
async function 함수명() {
    await 비동기_처리_메서드_명();
}
```

- 먼저 함수의 앞에 `async`라는 예약어를 붙이고, 함수의 내부 로직 중 HTTP 통신을 하는 비동기 처리 코드 앞에 `await`를 붙임

- **주의할 점은 비동기 처리 메서드가 꼭 `Promise` 객체를 반환해야 `await`가 의도대로 동작함**

- 일반적으로 `await`의 대상이 되는 비동기 처리 코드는 `Axios` 등 `Promise`를 반환하는 API 호출 함수

- 일반 함수에는 `await`는 사용 불가능

- `await`는 최상위 레벨 코드에는 사용 불가능

  ```javascript
  // 최상위 레벨 코드 
  let response = await fetch(url);
  
  // 익명 async 함수로 코드를 감싸면 사용 가능
  async () => {
      let response = await fetch(url);
  }
  ```

### 2.2 예외 처리

- `async`와 `await`에서 예외를 처리하는 방법은 `try` `catch`

  ```javascript
  async function asyncFunction() {
      try {
          var foo = await fetch();
      } catch (error) {
          console.log(error)
      }
  }
  ```

- 코드를 실행하다가 발생한 네트워크 통신 오류뿐 아니라, 간단한 타입의 오류 등의 일반적인 오류까지도 `catch`로 잡을 수 있음

- 발견된 에러는 `error` 객체에 담기기 때문에 에러의 유형에 맞게 에러 처리를 하면 됨