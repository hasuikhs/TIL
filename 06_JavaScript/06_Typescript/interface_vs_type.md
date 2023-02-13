# interface vs type

## 1. interface
- interface는 변수의 타입으로 사용 가능
- interface를 타입으로 선언한 변수는 해당 interface를 준수해야 함
  ```typescript
  interface Student {
    id: number;
    name: string;
  }

  let john: Student = { num: 1, name: 'john' };
  ```
- 함수에 객체를 전달할 때 복잡한 매개변수 체크가 필요없어 매우 유용
  ```typescript
  interface Add {
    (a: number, b: number): number;
  }

  const add: Add = function(a: number, b: number) {
    return a + b;
  }
  ```
- 일반적으로 interface의 프로퍼티는 반드시 구현되어야 함
- 하지만 선택적으로 필요한 경우에는 프로퍼티명 뒤에 `?`를 붙여 생략해도 됨
  ```typescript
  interface Student {
    id: number;
    name: string;
    address?: string; 
  }

  const john: Student ={ num: 1, name: 'john' };
  ```
- interfaces는 `extends`를 사용하여 interface 또는 class를 상속 가능
## 2. type alias
- 타입으로 사용 가능하다는 점에서 interface와 유사
  ```typescript
  type Student = {
    id: number,
    name: string,
    address?: string
  }
  ```
- interface는 `extends`나 `implements`를 사용 가능하지만, type alias는 사용 불가능
- **상속을 통해 확장이 필요하다면 interface가 유리**
- **interface로 표현 불가능하거나 유니온 또는 튜플을 사용해야한다면 type alias를 사용**
  ```typescript
  // 유니온 타입으로 타입 지정
  type Union = string | null;

  // 문자열 유니온 타입
  type Name = 'John' | 'Jane';

  // 숫자 유니온 타입
  type Num = 1 | 2 | 3;

  // 객체 유니온 타입
  type Obj = {a: 1} | {b: 2};

  // 함수 유니온 타입
  type Func = (() => string) | (() => void);

  // 튜플 타입
  // 튜플은 길이와 타입이 고정된 배열
  type Tuple = [string, boolean];
  ```