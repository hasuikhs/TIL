# JavaScript_01

## 0. 권장하지 않는 코드 작성법

- **코드 짧게 쓰기**

  - 조건이 많아질 경우에는 삼항연산자를 중첩하기 보다 `if else` 로 읽기 쉽게 작성하기

- **변수 명을 글자 하나로 짓기**

  - `x`, `y` 등
  - 예외로 `for` 문에서 `i`, `j` 등은 예외로 인정

- **약어 사용하기**

  - Ex. List -> lst, userAgent -> ua

- **포괄적인 명사 사용하기**

  - data, value, obj, item 과 같은 다양한 명사를 말함
  - 똑같은 data라고 해도 이 data가 가지고 있는 데이터의 종류를 확인시켜주어야 함
  - str, num과 같이 자료형과 연관된 변수명을 사용하지 않기
  - data1, item2 와 같이 숫자를 붙여쓰지 않기

- **철자가 유사한 단어 사용하기**

  - date, data와 같이 유사한 철자를 가진 단어를 조합해 사용하지 않기 (ex. dateData)

- **동의어 사용하기**

  - display, show, print, render, paint

- **이름 재사용하기**

  ```javascript
  function func(elem) {
    elem = clone(elem);
  }
  ```

  - 파라미터 변수와 함수 내에서 사용하는 변수의 이름이 같으면 구분하기 매우 힘들어짐

- **재미로 언더스코어 사용하기**

  - 코드 길이가 늘어나 가독성이 떨어지고, 동료 개발자들은 언더스코어의 의미를 파악하는데 노력과 시간이 많이 듬

- **과장 형용사 사용하기**

  - superElement, niceElement와 같이 의미 없는 형용사를 붙이면, 동료 개발자들은 의미를 찾는데 노력과 시간을 들일 수 있음

- **외부 변수 덮어쓰기**

  ```javascript
  let user = authenticateUser();
  
  function render() {
    let user = anotherValue();
    ...
    ...함수 길이가 긺...
    ...
    ... // <-- 개발자는 user와 관련된 이 부분의 코드를 수정해야 함
    ...
  }
  ```

  - 함수 render가 긴 상황에서 user와 관련된 함수 하단부 로직만 수정해야 하는 상황에서
  - 개발자는 코드를 처음부터 읽지 않고 해당 로직이 있는 부분부터 읽을 확률이 높은데, 그럼 첫 줄에서 user가 다시 정의되었다는 것을 놓치게 됨
  - 함수 내부에서 변수 user를 다시 정의했음에도 불구하고, 개발자는 user가 외부 변수(authenticateUser()의 호출 결과)인지 착각하며 작업을 진행하게 됨

- **함수 하나에 여러가지 기능을 넣기**

  - 코드 재사용이 불가능해짐

## 1. Variable

- 의미를 부여하여 변수 이름을 작성, 이를 시맨틱(Sementic)이라 함

  - 시맨틱은 코드 조각을 나타냄
  - 시맨틱 웹이란 웹에 존재하는 수많은 웹 페이지들에 메타데이터(Metadata)를 부여하여, 기존의 잡다한 데이터 집합이었던 웹페이지를 '의미'와 '관련성'을 가지는 거대한 데이터베이스로 구축하고자 하는 발상

- 즉, 변수명과 변수에 할당될 값의 의미가 같아야 함

  ```javascript
  var book = 1;					// X
  var book = 'javascirpt start';	// O
  ```

  - **개발자가 의도한 의미를 명확히 하여, 코드의 가독성을 높이고 유지보수를 용이하게 함**

### 1.1 var(변수)

- 변수를 재선언 가능한 키워드

- 코드량이 많아지면 값이 바뀔 우려 존재

- ES6 이후 추천하지 않음

  ```javascript
  var x = 2
  
  var x = 3	// 가능 여기서 log를 찍으면 3 출력
  
  x = 1 		// 가능
  
  if (x == 1) {
      var x = 2
      console.log(X)	// 2
  }
  
  console.log(x)		// 2
  ```

### 1.2 let(변수)

- 값을 재할당 할 수 있는 변수를 선언하는 키워드

- 변수 선언은 한 번만 가능

  - 하지만, 할당은 여러번 가능

  ```javascript
  let x = 2
  
  // let x = 3	// 불가능 여기서 log를 찍으면 2 출력
  
  x = 1			// 가능
  
  console.log(x)	// 1
  if (x == 1) {
      // if문 만큼의 유효범위를 가짐
      // 벗어나면 접근 불가능
      let x = 2
      console.log(x)	// 2
  }
  
  console.log(x)		// 1
  ```

- 블록 유효 범위(`Block Scope`)를 갖는 지역 변수

### 1.3 const(상수)

- 값이 변하지 않는 상수를 선언하는 키워드
  - 상수의 값은 재할당을 통해 바뀔 수 없고, 재선언도 불가능
- let과 동일하게 `Block Scope`를 가짐
- 웬만하면 모든 선언에는 상수를 써야함
  - 일단 상수를 사용하고, 값이 바뀌는게 자연스러운 상황에 변수(let)로 바궈서 사용하는 것을 권장

### 1.4 `var` vs `let` vs `const`

|         |  할당  |  선언  |   Scope    |
| :-----: | :----: | :----: | :--------: |
|  `var`  |  자유  |  자유  | `Function` |
|  `let`  |  자유  | 한번만 |  `Block`   |
| `const` | 한번만 | 한번만 |  `Block`   |

- `var`는 호이스팅과 같은 문제를 야기하므로, `let`과 `const`를 권장
- `const`는 상수값이며 재할당과 재선언을 할 수 없음
  - 하지만 배열과 객체는 요소를 추가, 삭제 가능
    - 배열과 객체는 변수에 주소를 할당하는 참조값이므로, `const`에 주소만 할당되어 주소값이 변경되지 않음

####  1.4.1 Hoisting

#####   1.4.1.1 Hoisting?

- 컴파일 단계에서, 코드가 실행되기 직전에 변수와 함수의 선언부들을 스캔 후, 선언부들을 **Lexical Environment**로 불리는 JS 자료구조 메모리 상에 추가
- JavaScript 함수는 실행되기 전에 함수 안에 필요한 변수값들을 모두 모아서 유효 범위의 최상단에 선언
- 즉, 함수 내에서 아래쪽에 존재하는 내용 중 필요한 값들을 끌어올리는 것
  - 실제 코드가 끌어올려지는 건 아니며, JavaScript Parser 내부적으로 끌어올려 처리
  - 실제 메모리 변화 없음

#####  1.4.1.2 대상

- 변수와 함수의 **선언부**(`var`, `let`, `const`, `function`, `class`)에 발생
  - `var`는 `undefined`로 초기화되자만 `let`/`const`/`class`는 `uninitialized`로 초기화
    - `let`/`const`/`class` 값은 실제 할당이 이루어진 지점에 도달해야 할당, **실제 할당 지점 이전에는 변수에 접근 불가능**
    - 이처럼 변수의 선언과 초기화 사이의 변수에 접근 불가 지점을 TDZ(Temporal Dead Zone: 일시적 사각지대)
    - `let`/`const`/`class`는 컴파일 단계에서 어떠한 값으로도 초기화되지 않기때문에 `ReferenceError`가 발생
      ```javascript
      // 컴파일 전 a를 lexical envirionment에 저장하지만 let이므로 어떠한 값으로도 초기화하지 않음
      // 실행 후 JS엔진이 변수 선언부에 도달하여, 값을 가져오려고 하지만 a가 어떠한 값으로도 할당되지 않아 undefined를 할당
      let a;
      console.log(a); // 'undefined'
      a = 5;
      ```
      - 즉, 선언만 호이스팅되며, 할당은 호이스팅되지 않음
- `function`은 식 자체가 통째로 끌어올려짐
- `class`는 호이스팅은 되지만 다만 `uninitialized` 상태이므로 `ReferenceError` 발생

  ```javascript
  const test1 = new Test1();
  const test2 = new Test2();	// ReferenceError: Cannot access 'Test2' before initialization
  
  function Test1() {
      this.name = 'test1';
  }
  
  class Test2 {
      constructor() {
          this.name = 'test2';
      }
  }
  ```

- 함수 표현식은 호이스팅되지 않음
  ```javascript
  sayHi(); // TypeError
  var sayHi = function() {
    console.log('hi');
  }
  ```
  - 함수 표현식을 사용할 때는 함수를 호출하기 전에 선언하는 것을 추천

## 2. 배열(Array)

- `for ... of ` 사용 가능

### 2.1 배열 기초

```javascript
const numbers = [1, 2, 3, 4, 5]
```

- 인덱싱

  ```javascript
  numbers[0]	// 1
  numbers[-1]	// undefined -> 명확한 양의 정수만 가능
  ```

- 길이 - `배열.length`

  ```javascript
  numbers.length	// 5
  ```

- 뒤집기 - `배열.reverse()`

  ```javascript
  numbers.reverse()	// [5, 4, 3, 2, 1]
  ```

  -  원본을 변경하므로 주의 필요

- 원소 추가 - `배열.push(원소)`

  ```javascript
  numbers.push('a')	// [1, 2, 3, 4, 5, "a"]
  ```

- 마지막 요소 제거 - `배열.pop()`

  ```javascript
  numbers.pop()	// [1, 2, 3, 4, 5]
  ```

- 배열 앞에 요소 추가 - `배열.unshift(원소)`

  ```javascript
  numbers.unshift('a')	// ['a', 1, 2, 3, 4, 5]
  ```

- 배열 앞의 요소 제거 - `배열.shift()`

  ```javascript
  numbers.shift()		// [1, 2, 3, 4, 5]
  ```

- 배열의 요소 찾기 - `배열.indexOf(요소값)`

  ```javascript
  numbers.indexOf(1) // 0
  
  numbers.push(1)
  numbers.indexOf(1)	// 0, 요소 중복시에는 처음 찾은 요소 index 반환
  
  numbers.indexOf(6)	// 찾는 요소가 없다면 -1 반환
  ```

- 배열을 문자열로 - `배열.join(delimiter)`

  ```javascript
  numbers.join()		// "1,2,3,4,5"	// 없다면 기본 ,(콤마)
  numbers.join('-')	// "1-2-3-4-5"
  numbers.join('')	// "12345"
  ```

### 2.2 Array Helper Method

- Helper란 자주 사용하는 로직을 재활용할 수 있게 만든 일종의 Library

- ES6부터 본격적으로 사용

#### 2.2.1 `forEach`

- `arr.forEach(callback(element, index, array))`

- 주어진 callback을 배열에 있는 각 요소에 대해 한번씩 실행

- ES5

  ```javascript
  var fruits = ['사과', '바나나', '딸기']
  
  for (var i = 0; i < fruits.length; i++) {
      console.log(fruits[i])
  }
  ```

- ES6+

  ```javascript
  const fruits = ['사과', '바나나', '딸기']
  
  fruits.forEach(function(fruit) {
      console.log(fruit)
  })
  
  // 한줄로 가능
  fruits.forEach(fruit => console.log(fruit))
  ```

#### 2.2.2 `map`

- `arr.map(callback(element))`

- 배열 내의 모든 요소에 대하여 주어진 콜백 함수를 호출한 결과를 모아 새로운 배열 반환

- `map`,`filter` 둘 다 사본을 반환하며, 원본은 건들지 않음

- 만약 return을 적지 않는다면 undefined가 배열에 담김

- ES5

  ```javascript
  var numbers = [1, 2, 3]
  var doubleNumbers = []
  
  for (var i = 0; i < numbers.length; i++) {
      doubleNumbers.push(numbers[i] * 2)
  }
  
  console.log(doubleNumbers)
  console.log(numbers)
  ```

- ES6+

  ```javascript
  const NUMBERS = [1, 2, 3]
  const DOUBLE_NUMBERS = NUMBERS.map(function(number) {
      return number * 2
  })
  
  console.log(DOUBLE_NUMBERS)
  
  // 한 줄로
  console.log(NUMBERS.map(number => number * 2))
  ```

#### 2.2.3 `filter`

- `arr.filter(callback(element))`

- 주어진 콜백 함수의 테스트를 통과하는 모든 요소를 모아서 새로운 배열로 반환

- ES5

  ```javascript
  var fruits = [
      { name: 'value01', type: 'a' },
      { name: 'value02', type: 'b' },
      { name: 'value03', type: 'a' },
      { name: 'value04', type: 'b' }
  ]
  
  var aFruit = []
  
  for (var i = 0; i < fruits.length; i++) {
      if (fruits[i].type == 'a') {
          aFruit.push(fruits[i])
      }
  }
  
  console.log(fruits)
  console.log(aFruit)
  console.log(fruits[1].name)
  ```

- ES6+

  ```javascript
  const fruits = [
      { name: 'value01', type: 'a' },
      { name: 'value02', type: 'b' },
      { name: 'value03', type: 'a' },
      { name: 'value04', type: 'b' }
  ]
  
  const aFruit = fruits.filter(fruit => fruit.type == 'b')
  
  console.log(fruits)
  console.log(aFruit)
  console.log(fruits[1].name)
  ```

#### 2.2.4 `reduce`

- `arr.reduce(callback(acc, element, index))`
  - 첫 번째 매개변수 : 누적값 (전 단계의 결과물)
  - 두 번째 매개변수 : 현재 배열 요소
  - 세 번째 매개변수 : 배열 순서 (인덱스 번호)
- 배열의 각 요소에 대해 주어진 콜백 함수를 실행하고 하나의 결과 값 반환
  - **배열 내의 숫자 총합, 평균 계산을 하나로 줄이는 동작을 함**
- `map`은 배열의 각 요소를 변형, `reduce`는 배열 자체를 변형
- `map`, `filter` 등 여러 멧드들의 동작을 대부분 대체 가능

```javascript
const tests = [80, 85, 77, 13, 58]

// const sum = tests.reduce(function(total, score) {
//     return total += score
// })
const sum = tests.reduce( (total, score) => total += score)

console.log(sum)
```

#### 2.2.5 `find`

- `arr.find(callback(element, index, array))`
- 주어진 판별 함수를 만족하는 첫번째 요소의 값을 반환
  
  - 값이 없으면 `undefined`
- 조건에 맞는 인덱스가 아니라 요소 자체를 원할 때 사용

- ES5

  ```javascript
  var students = [
      { name: '갑', age: 25 },
      { name: '을', age: 24 },
      { name: '병', age: 24 },
      { name: '정', age: 25 },
      { name: '무', age: 27 },
  ]
  
  for (var i = 0; i < students.length; i++) {
      if (students[i].age == 27) {
          student = students[i]
          break // 원하는 조건 도달하면 loop 탈출
      }
  }
  
  console.log(student)
  ```

- ES6+

  ```javascript
  const student = students.find(student => sutdent.age == 27)
  
  console.log(student)
  ```

## 3. 조건문

```javascript
if ( 조건 1 ) {
    ...
} else if ( 조건 2 ) {
    ...
} else {
    ...
}
```

## 4 반복문

### 4.1 while

```javascript
let i = 0
while (i < 6){
    console.log(i)
    i++
}
```

### 4.2 for

- 기본 

  ```javascript
  for (let i = 0; i < 6; i++){
      console.log(i)
  }
  ```

- `for ... of` 문

  ```javascript
  const numbers = [1, 2, 3, 4, 5]
  
  for (let number of numbers) {
      console.log(number)
  }
  
  for (let number of [1, 2, 3, 4, 5]) {
      console.log(number)
  }
  ```

- `for ... in ` 문 - Object

  ```javascript
  let obj = {
      a: '가',
      b: '나',
      c: '다'
  }
  
  for (let key in obj) {
      console.log(key, obj[key])
  }
  ```

- `foreach`

  - 오로지 Array 객체에서만 사용 가능

  ```javascript
  var items  ['item1', 'item2', 'item3']
  
  items.forEach(item => {
      console.log(item)
  })
  ```

## 5. 함수

- 함수 선언식(statement) : 코드가 실행되기 전에 로드됨
- 함수 표현식(expression) : 인터프리터가 해당 코드에 도달했을 때 로드됨

### 5.1 선언식

```javascript
console.log(add (3, 2))	// 호이스팅
function add(num1, num2) {
    return num1 + num2
}
console.log(add(1,2))
```

### 5.2 표현식

```javascript
console.log(sub(2, 1))	// 실행 불가
const sub = function(num1, num2) {
    return num1 - num2
}
console.log(sub(2, 1))
```

### 5.3 화살표 함수(Arrow Function)

- ES6+
- function과 중괄호 숫자를 줄이려고 고안된 문법
  1. function 키워드 생략 가능
  2. 함수에 매개변수 하나 -> `()` 생략 가능
  3. 함수 바디에 표현식 하나 -> `{}`,`{return}` 생략 가능
- 화살표 함수의 경우 function 키워드로 정의한 함수와 100% 동일하지 않음
  - 화살표 함수는 호이스팅(Hoisting)이 되지 않음

- **화살표 함수는 항상 익명 함수**

```javascript
const f1 = function(name) {
    return `hello! ${name}`
}

// 1. function 키워드 삭제
const f2 = (name) => { return `hello! ${name}` }

// 2. () 생략 (함수 매개변수 하나일 경우)
const f3 = name => { return `hello! ${name}` }

// 3. {}, return 생략 (바디에 표현식 1개)
const f4 = name => `hello! ${name}`
```

## 6. 객체

- `for ... in` 문 사용 가능

```javascript
const person = {
    name :'홍길동',					// key가 한 단어일 때
    								  // 따옴표를 작성하지 않아도 문자열로 간주함
    'phone number' : '01012345678',   // key가 여러 단어일 때	  
    Products : {
        cup : 'cup',
        phone : 'phone'
    }
}

person.name				// "홍길동"
person['name']			// "홍길동"
person['phone number']	// "01012345678"
person.Products			// {cup : "cup", phone : "phone"}
person.Products.cup		// "cup"
person.title			// undefined
```

- ES6+

```javascript
let books = ['DOM 스크립트', '시스템 성능 구조']
let comics = {
    'DC' : ['Joker', 'Aquaman'],
    'Marvel' : ['Avengers', 'Spider man']
}

let magazins = null

const bookShop = {
    books,
    comics,
    magazines
}
```

## 7. 동기와 비동기

- javascript는 기본적으로 비동기식으로 실행
- 그러므로 1계산이 2계산 보다 빠르더라도 결과가 2계산이 빠르게 나올경우 2계산이 먼저 결과를 받아 볼 수 있음