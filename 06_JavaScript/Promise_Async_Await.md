# Promise와 Async, Await

> JavaScript 엔진은 **Single Thread**이다. 그래서 동시에 두 가지 이상의 작업을 할 수 없다. 그렇다면 여러 작업이 동시에 요청될 때 순서대로 작업이 완료될 때를 기다려야하므로, JavaScript는 비동기 처리가 가능하도록 설계되었다.

## 1. Promise

> JavaScript에서 **`Promise`는 비동기적으로 실행하는 작업의 결과(성공 or 실패)를 나타내는 객체**

### 1.1 Promise 생성자

- 생성자 함수와 동일하게 `new`로 `Promise` 객체를 만들 수 있음
- 이 때 인자로는 `Executor`가 들어가는데 `Excutor`는 `resolve`와 `reject` 라는 두 개의 함수를 매개변수로 받는 실행 함수
- **`Excutor`는 비동기 작업을 시작하고 모든 작업을 끝낸 후, 해당 작업이 성공적으로 이행 되면 `resolve()` 함수를 호출하고, 중간에 오류가 발생한 경우 `reject()` 함수를 호출**

- `Promise` 객체는 3가지 상태를 가짐
  - 대기(`pending`) : 아직 실행되지 않은 초기 상태
  - 이행(`fulfilled`) : 작업이 성공적으로 완료
  - 거부(`rejected`)  : 작업이 실패함

#### 1.1.1 `then()`

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

#### 1.1.2 `catch()`

- `Promise`가 거부(reject) 됐을 때 실행할 콜백 함수 등록

```javascript
promise.catch(error => console.log('error', error));
```

#### 1.1.3 `finally()`

- `Promise`가 이행(resolve)되던, 거부(reject)되던 상관없이 항상 실행할 코드 지정
- 프로미스 체인에서 가장 마지막에 호출


```javascript
promise.finally(() => console.log('final'));
```

### 1.2 Callback Hell

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

### 1.3 `Promise.all()`

- 순회 가능한 객체에 주어진 모든 `Promise`가 이행한 후,  혹은 `Promise`가 주어지지 않았을 때 이행하는 `Promise` 반환
- 주어진 `Promise` 중 하나가 거부하는 경우, 첫 번째로 거절한 프로미스의 이유를 사용해 자신도 거부
- **즉, 모든 `Promise`가 이행될 때까지 기다렸다가 그 결과값을 담은 배열을 반환하거나, 처음으로 거부되는 때에 종료**

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

```javascript
// Promise.all 구현
function PromiseAll(args) {
  return new Promise((resolve, reject) => {
    let count = args.length;
    let result = [];

    args.forEach((ps, index) => {
      Promise.resolve(ps)
        .then(value => {
          result[index] = value;
          !--count && resolve(result);
        })
        .catch(reject);
    });
  });
}

PromiseAll([
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(1);
    }, 2000);
  }),
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(2);
    }, 500);
  }),
]).then((value) => {
  console.log(value); // [1, 2]
});
```

### 1.4 `Promise.allSettled()`

- `Promise.all()` 과 같은 역할을 함
- 하지만 하나가 실패하더라도 모든 `Promise`들의 결과를 받을 수 있음
  - status 값에 따라 처리해야 함

```javascript
Promise.allSettled([
  Promise.resolve(3),
  new Promise((resolve, reject) => {
    setTimeout(reject, 100, 'foo');
  })
]).then(results => {
  results.forEach(result => console.log(result));
});

// 결과
// Object { status: "fulfilled", value: 3 }
// Object { status: "rejected", reason: "foo" }
```

```javascript
// Promise.allSetteld 구현
function PromiseAllSettled(args) {
  return new Promise((resolve, reject) => {
    let count = args.length;
    let result = [];

    args.forEach((ps, index) => {
      Promise.resolve(ps)
        .then(value => {
          result[index] = { status: "fullfilled", value };
          count--;
        })
        .catch(e => {
          result[index] = { status: "rejected", reason: e };
          count--;
        })
        .finally(() => !count && resolve(result));
    });
  });
}

PromiseAllSettled([
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(1);
    }, 2000);
  }),
  Promise.reject(2),
]).then((value) => {
  console.log(value);
});
```

### 1.5 `Promise.race()`
- 여러 `Promise` 중에서 가장 먼저 이행되거나 거부된 프로미스의 결과 반환
- 가장 빨리 이행되는 `Promise`를 기반으로 처리할 때 유용

```javascript
const promises = [ promise1, promise2, promise3 ];

Promise.race(promises)
  .then(firstResult => console.log('First promise setteld:', firstResult));
```
## 2. `async`, `await`

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

  - `setTimeout`은 `Promise`를 반환하지 않음

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

### 2.3 예제

```javascript
function echo(str) {

    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            console.log(str)
            resolve();	// resolve
        }, 1000 * Math.random());
    })

}

async function aa() {
    await echo('라면 구입');
    await echo('냄비 준비');
    await echo('냄비에 물담기');
    await echo('끓이기');
    await echo('라면 스프 넣기');
    await echo('식사');
}

aa();
```

```javascript
async function aa() {
    console.log('A');
    let box = await new Promise(function(resolve, reject) {
        console.log('END');
        // await + Promise 조합에서 resolve()를 하지 않으면 다음 라인으로 넘어가지 않음 
        // await 가 없으면 그냥 넘어감
		// resolve(); 

    });
    console.log('B');
}

aa()
```

```javascript
async function aa() {

    let _resolve;
    let promise = new Promise((resolve, reject) => {
        _resolve = resolve;
    });
    setTimeout(_resolve, 2000);

    console.log('A');
    let box = await promise;
    console.log('B');
}

aa();
```

```javascript
async function showAvatar() {

  let response = await fetch('/article/promise-chaining/user.json');
  let user = await response.json();

  let githubResponse = await fetch(`https://api.github.com/users/${user.name}`);
  let githubUser = await githubResponse.json();

  let img = document.createElement('img');
  img.src = githubUser.avatar_url;
  img.className = "promise-avatar-example";
  document.body.append(img);

  // 3초 대기
  await new Promise((resolve, reject) => setTimeout(resolve, 3000));

  img.remove();

  return githubUser;
}

showAvatar();
```

## 3. `for await ... of`

- 반복문 내에서 일어나는 모든 비동기 구문을 기다려주는 구문

```javascript
// 공통으로 테스트할 함수
function fetchTest(param) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(param.c);
      resolve();
    }, param.num);
  });
}
```

- `forEach`에 `async`/`await`

  ```javascript
  let arr = [
    { c: 'a', num: 2000 },
    { c: 'b', num: 1000 },
    { c: 'c', num: 3000 },
    { c: 'd', num: 500 }
  ];
  
  arr.forEach(async (char) => {
      await fetchTest(char);
  });
  
  console.log('forEach 실행 완료');
  
  // forEach 실행 완료
  // d
  // b
  // a
  // c
  ```

  - **`forEach`에서는 비동기 작업이 끝나는걸 기다리지 않음**
  - 2초 뒤에 모든 a, b, c, d가 출력됨

- `for await ... of`

  ```javascript
  (async function test() {
    for await (let param of arr) {
      await fetchTest(param);
    };
  })();
  
  // a
  // b
  // c
  // d
  // for await 실행 완료
  ```

  - 이제야 의도한 대로 하나당 2초씩 총 8초에 걸쳐 출력된 후 최종적으로 실행 완료라고 출력함
  - 다만, `for await ... of` 라도 `fetchTest()` 함수 앞에 `await`를 빼면 위의 forEach와 같게 결과를 받을 수 있음

- `for`
  
  ```javascript
  (async function test() {
    for (let i = 0; i < arr.length; i++) {
      await fetchTest(arr[i]);
    }
  })();
  ```

  - `for `또한 `for await ... of` 와 같은 결과를 얻지만 `for await ... of` 가 더 코드가 간결하며, 비동기 작업을 다룰 때 자연스럽게 보임
  - 또한 인덱스를 직접 다룰 필요 없이 코드를 읽고 이해하기가 더 쉬움

## :information_source: 비교

|                                         | `forEach(async () => {})` | `await Promise.all` | `for await ... of` |
| --------------------------------------- | :-----------------------: | :-----------------: | :----------------: |
| 다수 비동기 작업 한번에 실행            |             O             |          O          |         X          |
| 다수 비동기 작업이 모두 끝나기를 기다림 |             X             |          O          |         O          |
