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

## 2. bind()

- `bind`가 `call`, `apply`와 다른 점은 함수를 호출하지 않고, 새로운 함수를 리턴 해줌

- **`bind`**

  ```javascript
  // bind
  
  let introduce = hello.bind(obj, 'seoul', 'developer'); // 실행되지 않음
  
  introduce(); // Hello, my name is Tom, I live in seoul and my job is developer
  ```

  
