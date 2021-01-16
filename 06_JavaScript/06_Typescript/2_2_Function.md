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



