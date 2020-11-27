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