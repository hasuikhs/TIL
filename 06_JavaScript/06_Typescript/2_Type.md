# 2. Type

### 2.0 타입 추론

- **대입 연산자 `=` 오른쪽 값에 따라 변수의 타입을 지정하는 것을 타입 추론**이라 함

- 각 변수는 초깃값에 해당하는 타입으로 지정되어 **해당 타입으로 지정되므로 이후에 각 변수에는 해당 타입의 값만 저장 가능**

  ```javascript
  let n = 1;		// n의 타입을 number로 판단
  let b = true;	// b의 타입을 boolean으로 판단
  let s = 'hello'	// s의 타입을 string으로 판단
  let o = {}		// o의 타입을 object로 판단
  ```

### 2.1 정적 유형

- **타입 주석(Type Annotation)**

  - 변수 뒤에 `:` 으로 type을 지정해 주는 것

    ```typescript
    let num: number = 123;
    ```

- **타입 추론(Type Interface)**

  - TypeScript는 타입 주석을 생략 가능한데, 타입 주석이 생략되면 대입 연산자(`=`)의 오른쪽 값을 분석해 변수의 타입을 결정
  - 타입 추론은 JavaScript와 TypeScript 소스 코드 간의 호환성을 보장하기에 `.js` 파일을 `.ts` 파일로 확장자만 바꿔도 TypeScript에서 바로 동작함

  ```typescript
  let num = 123;
  ```

#### 2.1.1 기본 유형

- **Number**

  - number type을 정의

  ```typescript
  let num: number = 123;
  ```

- **String**

  - string type을 정의

  ```typescript
  let str: string = 'hello';
  ```

- **Boolean**

  - boolean type을 정의

  ```typescript
  let bool: boolean = false;
  ```

- **Void**

  - 반환되지 않는 함수르 나타내는 함수 유형에 사용

  ```typescript
  function aleartMsg(): void {
      aleart('This is aleart message!');
  }
  ```

  - **변수에 void type 사용은 `undefined` 또는 `null` 만 허용하므로 유용하지 않음**

- **Any**

  - 데이터의 타입을 동적 콘텐츠에 사용하는 것과같이 알수 없을 때 사용

  ```typescript
  let val: any = 'hello';
  val = 123;
  val = true;
  ```

#### 2.1.2 객체 타입

- **Array**

  - 배열 

  ```typescript
  var strArr: string[];	// 선언
  strArr = ['this', 'is', 'array'];	// 초기화
  
  var numArr: number[];
  numArr = [1, 2, 3];
  ```

- **Tuple**

  - 기본적으로 배열과 같지만, 저장되는 아이템의 데이터 타입이 모두 다름
  - 원소의 수와 각 원소의 타입이 정확히 지정된 배열의 타입을 정의 가능
  - **튜플 타입의 변수는 정확히 명시된 개수 만큼의 원소만을 가짐**

  ```typescript
  // 성공
  var tuple: [string, number] = ['str', 1];
  
  // 실패
  var tuple: [string, number] = [1, 'str'];
  ```

- **Interface**

  - 파생 클래스가 구현해야하는 속성, 메서드 및 이벤트를 정의

  ```typescript
  interface ICalc {
      add (first: number, second: number): any;
  }
  
  let Caluclator: ICalc = {
      add(first: number, second: number) {
          return first + second;
      }
  }
  ```

- **Class**

  - 개체를 만들기위한 템플릿

  ```typescript
  class Person {
      
      // 변수
      name: string;
      
      // 생성자
      constructor(name: string) {
          this.name = name;
      }
      
      // 메서드
      speakName(): void {
          console.log(`Name is : ${this.name}`);
      }
  }
  ```

- **Enum**

  - 데이터 셋을 만들기 위함
  - 숫자를 지정하지 않으면 0부터 시작

  ```typescript
  // 지정하지 않을때
  enum Color: {
      Red, 	// 0
      Green, 	// 1
      Blue	// 2
  }; 
  
  // 첫 숫자를 지정할 때
  enum Color: {
      Red = 1,	// 1
      Green, 		// 2
      Blue		// 3
  };
  
  // 모두 수동으로 문자도 가능
  enum Color: {
      Red = 0,
      Green = 'green',
      Blue = 'blue'
  }
  ```

- **Function**

  - **함수만** 가리키는 변수를 선언

  ```typescript
  let fun: Function = () => console.log('Hello');
  
  fun = 123; // Error
  ```

### 2.2 제네릭

- 컴파일시 타입 안정성을 보장
- 캐스팅 관련 코드 제거 가능

#### 2.2.1 기본 사용

```typescript
function throwBack<T> (arg: T) {	// T : type argument 다른 문자 사용해도 상관 없음
    return arg;
}

let outputStr = identity<string> ('myString');

let outputNum = identity<number> ( 100 );
```

#### 2.2.2 타입 상속 방법

- 타입을 제한하는 형태

```typescript
function add<T extends number> (a: T, b: T) {
    return a + b;
}
```

#### 2.2.3 오버로드 방법

```typescript
function add<T> (a: T, b: T): T;
function add<T> (a: any, b: any) {
    return a + b;
}
```

#### 2.2.4 2개 이상의 타입 변수 선언

```typescript
function set<T, T2>(a: T, b: T2): T;
function set(key: any, value: any) {
    return arr[key] = value;
}

set<string, string|number> ('1', 1);
```

### 2.3 데코레이터

- 데코레이터를 만들 때는 함수를 사용하므로,  **모든 데코레이터는 JavaScript 함수임을 아는 것이 중요**
- Java의 `@(Annotation)`과는 조금 다름

```typescript
function firstDecorator(arg: Function) {
    console.log(arg);
}

@firstDecorator
class Person {
    
}
```

### 2.4 Union Type

- TypeScript는 **여러 유형을 가질 수 있는 변수를 정의 가능한데 이를 Union Type** 이라 함
- JavaScript 코드에서 TypeScript 코드로 마이그레이션 할 때 일부 상황에 유리

```typescript
// string, number 유형 두개 가능
let myVar: string|number;

myVar = 100;	// OK
myVar = 'str';	// OK

myVar = true;	// Error
```

### 2.5 Literal Type

- 무한한 수의 잠재적 케이스에서 유한한 수의 잠재적 케이스로 좁힘

- 변수

  ```typescript
  type AppStatus = 'ACTIVE' | 'INACTIVE' | 'ONHOLD';
  
  let currStatus: AppStatus;
  
  currStatus = 'ACTIVE';	// OK
  currStatus = 'DELETED'; // ERROR
  ```

- 함수 인수

  ```typescript
  type AppStatus = 'ACTIVE' | 'INACTIVE' | 'ONHOLD';
  
  function showMe(currentStatus: AppStatus): void {
      console.log(currentStatus);
  }
  
  showMe('ACTIVE');	// OK
  showMe('DELETED');	// Error
  ```

  