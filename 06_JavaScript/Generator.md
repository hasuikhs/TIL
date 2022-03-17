# Generator

- Generator Function은 사용자의 요구에 따라 다른 시간 간격으로 여러 값을 반환 가능
- 내부 상태 관리가 가능한 함수
- 단 한 번의 실행으로 함수의 끝까지 실행이 완료되는 일반 함수와는 달리, 사용자의 요구에 따라 (`yield`와 `next()`를 통해) 일시적으로 정지될 수 있고, 다시 시작 될 수 있음
- Generator와 Iterable객체를 함께 사용하면 손쉽게 데이터 스트림을 만들 수 있음
  - Generator는 Iterator이자 Iterable을 생성하는 함수

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


## 2. Generator and Iterable

- `for...of` 반복문 사용 가능

  ```javascript
  function* generateSequence() {
    yield 1;
    yield 2;
    return 3;	// yield 3;
  }
  
  let generator = generateSequence();
  
  for(let value of generator) {
    alert(value); // 1, 2가 출력됨
  }
  ```

  - `for...of` Iteration이 `done: true`일 때, 즉 `return`이면 마지막 `value`를 무시하기 때문에 마지막 3이 출력되지 않음
  - `for...of`를 사용했을 때 모든 값이 출력되길 원하면 `yield`로 값을 반한해야 함

- `Symbol.iterator` 대신 Generator를 사용한 코드

  ```javascript
  let range = {
      from: 1,
      to: 5,
      
      *[Symbol.iterator]() {	// [Symbol.iterator]: function*() 을 줄인 것
          for (let value = this.from; value <= this.to; value++) {
              yield value;
          }
      }
  };
  
  alert([...range]);	// 1, 2, 3, 4, 5
  ```

- Generator는 Iterator를 어떻게 하면 쉽게 구현할지를 염두에 두며 JavaScript에 추가됨

- Iterator와는 다르게 `next()` 에 매개변수를 Generator에 전달 가능

  ```javascript
  function* gen() {
    while (true) {
      let value = yield null;
      console.log(value);
    }
  }
  
  const g = gen();
  g.next(1);
  // "{값 : null, 완료 : false}"
  g.next(2);
  // 2
  // "{값 : null, 완료 : false}"
  ```

## 3. Generator Composition

- Generator 안에 Generator를 embedding 할 수 있게 해주는 Generator의 특별 기능

- 즉, Generator 안에 Generator를 할당

- `yield*`을 사용하여 사용 가능

  ```javascript
  function* generateSequence(start, end) {
    for (let i = start; i <= end; i++) yield i;
  }
  
  function* generatePasswordCodes() {
  
    // 0..9
    yield* generateSequence(48, 57);
  
    // A..Z
    yield* generateSequence(65, 90);
  
    // a..z
    yield* generateSequence(97, 122);
  
  }
  
  let str = '';
  
  for(let code of generatePasswordCodes()) {
    str += String.fromCharCode(code);
  }
  
  alert(str); // 0..9A..Za..z
  ```

  - `yield*` 지시자는 실행을 다른 Generator에 위임

- Generator Composition을 사용하면 한 Generator의 흐름을 자연스럽게 다른 Generator에 삽입 가능

- **Generator Composition을 사용하면 중간 결과 저장 용도의 추가 메모리가 필요하지 않음**

## 4. demo

```javascript
function Test() {
  
  this.test = 'test';
  
  this.init = () => {
    console.log('init');
  }
  
  this.render = () => {
    console.log('render');
  }

  this.test = function* test() {
    yield this.init();
    yield this.render();
  }
  
  this.gen = this.test();
  this.gen.next();
}

const te = new Test();

setTimeout(() => {
  te.gen.next();
}, 1_000);
```

- 처음과 두번째에만 실행되는 함수
