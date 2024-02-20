# Binding

- `call`, `apply`, `bind`는 함수의 `this`를 명시적으로 바인딩하기 위해 사용
- `this`는 기본적으로 `window` 객체이기 때문에, 객체 내부, 객체 메서드 호출시, 생성자 `new` 호출시, 명시적 bind시 바뀜
  - `var`로 선언된 변수만 `this`로 접근 가능, `let`, `const`는 생각대로 동작이 안될 수 있음
- 즉, `this`를 개발자가 원하는 객체로 binding하는 것

```javascript
const obj = { name: 'Tom' };

function hello(address, job) {
  console.log(`Hello, my name is ${this.name}, I live in ${address} and my job is ${job}`);
}
```

## 1. call() & apply()

- `call`과 `apply`는 **함수를 호출하는 함수**

- 첫 번째 인자에 `this`의 대상이 되는 객체를 넘겨주어 실행

- **`call`**

  ```javascript
  // call
  
  hello.call(obj, 'seoul', 'developer');
  // Hello, my name is Tom, I live in seoul and my job is developer
  ```

  - `call`은 함수에 필요한 파라미터들을 순서대로 입력해줘야함

- **`apply`**

  ```javascript
  // apply
  
  hello.apply(obj, ['seoul', 'developer']);
  // Hello, my name is Tom, I live in seoul and my job is developer
  ```

  - `apply`는 함수에 필요한 파라미터들을 배열에 담아 전달
  - 인자를 배열로 전달해야하는 경우에 더 효율적
    - 인자의 개수가 가변적이거나 인자를 동적으로 생성하는 경우 유용

  ```javascript
  function foo(a, b, c) {
    return a + b + c;
  }

  const arr = [1, 2, 3];
  const result = foo.apply(null, arr); // result = 6
  ```

## 2. bind()

- `bind`가 `call`, `apply`와 다른 점은 함수를 호출하지 않고, 새로운 함수를 리턴 해줌
  - 나중에 호출될 때 원본 함수와 동일한 본문과 스코프를 가지되, `this` 값이 `bind`에 첫 번째 인자로 전달된 값으로 고정
  - **이벤트 헨들러나 비동기 콜백에서 `this`의 컨텍스트를 유지하고자 할 때 유용**
- 즉, 원본 함수를 수정하지 않고도 새로운 함수를 만들어 사용 가능

- **`bind`**

  ```javascript
  // bind
  
  let introduce = hello.bind(obj, 'seoul', 'developer'); // 실행되지 않음
  
  introduce(); // Hello, my name is Tom, I live in seoul and my job is developer
  ```
