# 함수형 프로그래밍(Functional Programming, FP)

- 컴퓨터 프로그래밍의 한 패러다임으로, 계산을 수학적 함수의 평가로 취급, 상태 변경이나 변경 가능한 데이터를 피하는 것이 중점
- 함수들이 수학적 함수처럼 동작하며, 이들은 주어진 입력에 대해 항상 동일한 출력을 반환하고, 프로그램의 상태나 전역 변수를 변경하지 않음
- 이러한 특징들로 함수형 프로그래밍은 **예측 가능**하고, **테스트하기 쉬우**며, **병렬 처리**에 적합

## 특징

- **순수 함수 (Pure Functions)**
  - 같은 입력에 대해 항상 같은 출력을 반환하며, 외부 상태를 변경하지 않음

  ```javascript
  function add(a, b) {
    return a + b;
  }
  console.log(add(3, 5));
  ```

- **불변성 (Immutability)**
  - 데이터가 한 번 생성되면 그 이후로는 변경되지 않음
  - 데이터를 변경해야할 경우, 원본 데이터를 복사하여 새로운 데이터를 생성(원본 데이터는 불변)

  ```javascript
  const obj = Object.freeze({a: 1, b: 2});
  const newObj = { ...obj, b: 3 };
  console.log(obj); // {a: 1, b: 2}
  console.log(newObj); // {a: 1, b:3}
  ```

- **함수의 일급 객체 (First-class Functions)**
  - 함수를 일반 값처럼 변수에 할당하거나, 다른 함수의 인자로 전달하거나, 다른 함수의 결과로 반환 가능

  ```javascript
  const greet = function (name) {
    return `Hello, ${ name }`;
  };
  console.log(greet('Alice'));
  ```

- **고차 함수 (Higher-order Functions)**
  - 함수를 인자로 받거나, 함수를 결과로 반환하는 함수
  
  ```javascript
  function higherOrderFunction(fn) {
    return function (arg) {
      return `Result: ${ fn(arg) }`;
    };
  }

  const square = higherOrderFunction(x => x * x);
  console.log(square(4));
  ```

- **레이지 평가 (Lazy Evaluation)**
  - 필요할 때까지 값의 평가를 미룸
  - 이를 통해 성능을 최적화하고 무한 데이터 구조를 다룰 수 있음

  ```javascript
  function* generatorFunction() {
    yield 1;
    yield 2;
    yield 3;
  }
  const generator = generatorFunction();
  console.log(generator.next().value); // 1
  console.log(generator.next().value); // 2
  ```