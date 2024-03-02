# Generator

- Generator Function은 사용자의 요구에 따라 다른 시간 간격으로 여러 값을 반환 가능
  - 실행을 일시 중단하고 재개 가능한 함수
- 내부 상태 관리가 가능한 함수
- 단 한 번의 실행으로 함수의 끝까지 실행이 완료되는 일반 함수와는 달리, 사용자의 요구에 따라 (`yield`와 `next()`를 통해) 일시적으로 정지될 수 있고, 다시 시작 될 수 있음
  - 함수 내부에서 `yield` 키워드를 사용하면 실행을 일시 중단하고 해당 값을 반환
    - 호출될 때 함수의 실행을 시작하며, 값을 반환하거나 `yield` 키워드를 만날 때까지 실행을 계속함
  - Generator가 있기 전에는 일시 정지 가능한 유일한 방법은 alert, confirm, prompt를 사용하는 것
    - 하지만, 사용자가 시스템 대화 상자에 응답하지 않으면 프로세스를 이어갈 수 없었음

- Generator와 Iterable객체를 함께 사용하면 손쉽게 데이터 스트림을 만들 수 있음
  - Generator는 Iterator이자 Iterable을 생성하는 함수
- Generator Function의 반환으로는 Generator가 반환됨

- 사용예
  - 비동기처리
    - AJAX 요청을 보내고 결과를 반환하는 함수를 작성할 때 generator를 사용하여 비동기성 처리가능
  - 대용량 데이터 처리
    - 대용량 데이터를 처리할 때는 한 번에 모든 데이터를 가져오는 것이 아닌, 필요할때마다 일부씩 가져오는 것이 효율적
  - 무한한 데이터 집합 생성
    - 무한한 데이터 집합을 생성해야 할ㄷ 때 generator 사용 가능
    - 자연수나 피보나치 수열과 같은 무한한 수열을 생성하는 것이 가능
    ```javascript
    function* generateNaturalNumbers() {
    let number = 1;

      while (true) {
        yield number;
        number++;
      }
    }

    const numbers = generateNaturalNumbers();

    for (let i = 0; i < 10; i++) {
      console.log(numbers.next().value);
    }
    // 출력 결과: 1 2 3 4 5 6 7 8 9 10
    ```
  - 코드의 간결성
    - generator를 사용하면 코드의 가독성이 높아지며, 코드를 더 쉽게 유지보수 가능
    ```javascript
    // generator로 무한 홀수 만들기
    function* generateOddNumbers() {
      let n = 1;
      while (true) {
        yield n;
        n += 2;
      }
    }

    const oddNumbers = generateOddNumbers();

    for (let i = 0; i < 10; i++) {
      console.log(oddNumbers.next().value);
    }

    // 일반적인 함수
    function getOddNumber(n) {
      return 2 * n + 1;
    }

    for (let i = 0; i < 10; i++) {
      console.log(getOddNumber(i));
    }
    ```
    - generator 함수는 실행 흐름을 일시 중단하고 재개 가능하지만, 일반 함수는 계산을 한번에 수행
      - 필요한 만큼의 값을 가져오고, 나머지 계산은 중단된 상태에서 유지
    - generator는 필요한 만큼의 데이터만 생성하고 반환하므로 **메모리 사용이 효율적**
    - generator 함수는 반복 가능한 객체(Iterable)를 반환하므로 `for ...of` 루프나 `Array.from()` 등과 같은 **반복 구문과 함께 사용하기 간편**
      - **일반적인 함수를 사용하는 방식은 유한한 데이터 집합이나 특정 계산에 대해서는 더 간단하고 직관적**
## 1. Generator Function

- Generator를 만들려면 특별한 문법 구조 `function*`이 필요
  - 화살표 함수로는 정의할 수 없음

  ```javascript
  function* generatorFunction() {
      yield 1;
      yield 2;
      return 3;
  }

  // error
  const gen = ()* => {

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

- 처음과 두번째에만 실행되는 함수

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

- `Promise`를 이용해서 비동기 처리를 하는 예시

  ```javascript
  function* asyncFunction() {
    try {
      const result = yield new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve('Async result');
        }, 1_000);
      });
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

  const generator = asyncFunction();
  const promise = generator.next().value;
  promise.then(
    (result) => {
      generator.next(result);
    },
    (error) => {
      generator.throw(error);
    }
  )
  ```
