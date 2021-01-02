# 2. Type

### 2.1 정적 유형

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

  

