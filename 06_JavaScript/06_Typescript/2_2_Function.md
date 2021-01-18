# 2. Function

## 2.1 함수 선언

- 기본적인 함수 선언

  ```typescript
  function 함수명(변수1: 타입1, 변수2: 타입2) : 반환값 타입 {
      // 코드 작성
  }
  ```

- **JavaScript 처럼 매개변수와 반환값에 대한 타입 주석을 생략 가능하지만, 특히 함수는 구현 의도를 알기 어렵기 때문에 지양**

#### 2.1.1 void 타입

- 값을 반환하지 않는 ㅎ마수

```typescript
function myFunction(name: string, age: number): void {
    console.log(`name: ${name}, age: ${age}`);
}
```

#### 2.1.2 함수 시그니처(function signature)

- 변수에 타입이 있는 것처럼 **함수도 타입이 있는데 이를 함수 시그니처라 함**

  ```typescript
  (변수1 타입, 변수2 타입) => 반환값 타입
  ```

  ```typescript
  let myFunction: (string, number) => void = fnunction (name: string, age: number): void {
      // 코드 작성
  }
  ```

#### 2.1.3 type 키워드

- 기존에 존재하는 타입을 단순히 이름만 바꿔서 사용 가능케 함
- 이러한 기능을 타입 별칭(type alias)라고 함

```typescript
type 새로운 타입 = 기존 타입
```

- 함수의 시그니처를 명시하면 매개변수의 개수나 타입, 반환 타입이 다른 함수를 선언하는 잘못을 미연에 방지

```typescript
type strNumFunc = (string, number) => void;

let f: strNumFunc = function(a: string, b: number): void {};
```

#### 2.1.4 선택적 매개변수

- 함수의 매개변수에도 물음표(`?`)를 붙일 수 있음

```typescript
function myFunction(arg1: string, arg?: number): void{};
```

### 2.2 함수 표현식

- **함수 선언문에서 함수 이름을 제외한 코드를 함수 표현식(function expression)**

```typescript
let add = function(a, b) {return a + b};
```

#### 2.2.1 일등 함수(First-class Function)

- JavaScript와 TypeScript는 일등 함수 기능이 있으므로 함수형 프로그래밍 언어
- 일등 함수란 함수와 변수를 구분하지 않음

```typescript
// 변수 f에 a + b 의 함수 표현식을 저장
let f = function(a, b) {return a + b};

// f는 변수 이므로 a - b 의 함수 표현식도 저장 가능
f = function(a, b) {return a - b};
```

#### 2.2.2 계산법

- **조급한 계산법(Eager Evaluation) - 엄격한 계산법(Strict Evaluation)**

  - 수식이 변수에 접근하는 순간 계산
  - 메모리와 속도에서 이점이 있음

  ```javascript
  var x = 5 + 3 *(1 + 5);
  console.log(x)
  
  // 조급한 계산법에 따라 첫 줄에서 수식이 기억되지 않고 계산 결과만 저장되어 기억 공간 절약
  ```

- **느긋한 계산법(Lazy Evaluation)**

  - 계산의 결과값이 필요할 때까지 계산을 늦추는 기법
  - 필요없는 계산을 하지 않으므로 실행을 더 빠르게 할 수 있음
  - 일반적인 함수형 프로그래밍에서 사용

#### 2.2.3 함수 호출 연산자

- 어떤 변수가 함수 표현식을 담고 있다면, 변수 이름 뒤에 함수 호출 연산자(function call operation) `()`를 붙여 호출 가능

```typescript
let add = function(a, b) {return a + b};

add(1, 2); // 함수 호출 연산자
```

- 컴파일러는 함수 호출문을 만나면 지금까지 미뤄뒀던 함수 표현식에 대해 조급한 계산법을 적용(함수 표현식의 몸통 부분을 실행)해 함수 표현식을 값으로 바꿈