# JavaScript

## 0. 사전준비

### 0.1 `Node.js` 설치

- Node.js 발표와 동시에 JavaScript가 브라우저 종속적인 언어가 아니라 서버 구축까지 가능해지면서 핫한 언어로 급부상.

- Express.js(서버), React.js(프론트), Vue.js(프론트) 등 JavaScript 기반의 수 많은 프레임워크, 라이브러리들이 현대 웹 개발 트렌드를 주도하고 있음.

- [node.js 공식 홈페이지]( https://nodejs.org/ko/ )

  - LTS Version(안정적)
  - Windows Installer (.msi) 64bit

- 설치 확인

  ```bash
  $ node -v
  v12.13.0
  ```

### 0.2 VSCode Python & JavaScript 인덴팅 설정

```json
{
    ...
    "editor.tabSize" : 2,
    "[python]" : {
        "editor.tabSize" : 4,
    },
    ...
}
```

### 0.3 Naming Convention

- `lowerCamelCase`
  - 단봉낙타 표기법
  - JavaScript의 기본 표기법
- `UpperCamelCase`
  - 쌍봉낙타 표기법
- `snake_case`
- `kebob-case`

### 0.4 Extensions (추천)

- `auto close tag`
- `rainbow brackets`
- `indent-rainbow`

## 1. Variable

### 1.1 let(변수)

- 값을 재할당 할 수 있는 변수를 선언하는 키워드

- 변수 선언은 한 번만 할 수 있다.

  - 하지만, 할당은 여러번 할 수 있다.

  ```javascript
  let x = 2
  
  // let x = 3	// 불가능
  
  x = 1		// 가능
  console.log(x)	// 2
  if (x == 1){
      // if문 만큼의 유효범위를 가지고 있다.
      // 벗어나면 접근 불가능
      let x = 2
      console
  }
  ```

- 블록 유효 범위(`block Scope`)를 갖는 지역 변수

### 1.2 const(상수)

- 값이 변하지 않는 상수를 선언하는 키워드
  - 상수의 값은 재할당을 통해 바뀔 수 없고, 재선언도 불가능하다.
- let과 동일하게 `Block Scope`를 가진다.
- 웬만하면 모든 선언에서 상수를 써야 한다.
  - 일단 상수를 사용하고, 값이 바뀌는게 자연스러운 상황이면 그때 변수(let)로 바꿔서 사용하는 것을 권장한다.

- 변수와 상수는 어디에 써야 할까?
  - 어디에 변수를 쓰고, 어디에는 상수를 쓰고 하는 등의 결정은 프로그래머 몫
  - **파이 근사값**과 같은 값은 상수가 적절 (변할 일이 없는 값)
- **`var` vs `let` vs `const`**
  - `var` : 할당 및 선언 자유, 함수 스코프
  - `let` : 할당 자유, 선언은 한번만, 블록 스코프
  - `const` : 할당 한번만, 선언도 한번만, 블록 스코프
- var는 호이스팅과 같은 문제를 야기하기 때문에, 앞으로 let과 const를 사용해서 개발을 진행하자.

## 2. 조건문

### 2.1 `if`문

- 파이썬의`if`과 흡사! `elif`만 `else if`로 바꾸면 됨

```javascript
const userName = prompt('니 이름은 뭐니?')
```

![image-20191118171922359](C:%5CUsers%5Cstudent%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5Cimage-20191118171922359.png)

```javascript
if (userName == '도현'){
    message = '<h1>유단자... 까불지마요...</h1>'
} else if (userName == '혁진'){
    message = '<h1>감자... 감자합니다...</h1>'
} else{
    message = '<h1>${userName}.. 누구??</h1>'
}

document.write(message)
```

![image-20191118172017374](C:%5CUsers%5Cstudent%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5Cimage-20191118172017374.png)

## 3. 반복문

### 3.1 while

```javascript
let i = 0
while ( i < 6 ){
    console.log(i)
    i++
}
```

### 3.2 for

```javascript
// for문에서 사용할 변수 하나 정의하고, 그 변수가 특정 조건에 false 값이
// 될 때까지 계속 연산 - 반복
for (let j = 0; j < 6; j++){
    console.log(j)
}
// python의 for in 문법과 비슷하게 사용 가능!
const numbers = [1, 2, 3, 4, 5]
for (let number of numbers){
    console.log(number)
}
// number값 재할당 필요없으면 상수 사용 가능
for (let number of [1, 2, 3, 4, 5]){
    console.log(number)
}
```

## 4. 함수(function)

> 함수 선언식(statement) : 코드가 실행되기 전에 로드됨
>
> 함수 표현식(expression) : 인터프리터가 해당 코드에 도달했을 때 로드됨

### 4.1 선언식

```javascript
console.log(add (3, 2))	// 호이스팅
function add(num1, num2){
    return num1 + num2
}
console.log(add(1, 2))
```

### 4.2 표현식

```javascript
console.log(sub(2, 1))	// 실행 불가
const sub = function(num1, num2){
	return num1 - num2
}
console.log(sub(2, 1))
```

### 4.3 화살표 함수(Arrow function)

- ES6 이후
- function과 중괄호 숫자를 줄이려고 고안된 문법
  1. function 키워드 생략 가능
  2. 함수에 매개변수 하나 -> `()` 생략 가능
  3. 함수 바디에 표현식 하나 -> `{}`, `return` 생략 가능
- 화살표 함수의 경우 function 키워드로 정의한 함수와 100% 동일하지 않다.

- 화살표 함수는 항상 **익명 함수**

```javascript
const iot1 = function(name){
    return `hello! ${name}!!`
}

// 1. function 키워드 삭제
const iot2 = (name) => { return `hello! ${name}` }
// 2. () 생략 (함수 매개변수 하나일 경우)
const iot3 = name => { return `hello! ${name}` }
// 3. {}, return 생략 (바디에 표현식 1개)
const iot4 = name => `hello! ${name}`

console.log(iot1('이봐'))

// [실습] 3단계에 걸쳐 화살표 함수로 바꿔보기
let square1 = function(num){
    return num ** 2
}
// 1. function 키워드 삭제
let square2 = (num) => { return num ** 2 }
// 2. () 생략
let square3 = num => { return num ** 2 }
// 3. {}, return 생략
let square4 = num => num ** 2


let noArgs = () => `No args!!!!`

noArgs = _ => `No args`

// 5-1. object를 return
let returnObject = () => { return { key : `value`} }
console.log(returnObject())
console.log(typeof returnObject())

// 5-2. return을 적지 않으려면 괄호 붙이기
returnObject = () => ({ key : `value`})
console.log(returnObject())
console.log(typeof returnObject())

// 6. 기본 인자 부여하기 (Default Args)
// 인자 개수와 상관없이 반드시 괄호를 붙인다.
const sayHello = (name='혁진') => `hi! ${name}`
```

## 5. 기본 인자 부여하기 (Default Args)



**익명 / 1회용 함수 (Anonymous function)**

>JavaScript에서는 1회용으로 사용하는 함수는 이름을 짓지 않을 수 있다.
>
>일반적으로는 함수를 정의, 변수에 함수를 저장하는 과정 등을 거쳐서 실행한다. 하지만 `즉시실행함수`는 함수가 선언되자마자 즉시 실행된다.
>
>사용이유?
>
>**초기화**에 사용한다.
>
>- 즉시실행함수는 선언되자마자 실행되기 때문에, 같은 함수를 다시 호출할 수는 없다. 그래서 초기화 부분에 주로 사용된다.

```javascript
// JS에서는 1회용으로 사용할 함수는 이름을 짓지 않을 수 있다.
// function 키워드를 활용해서 함수를 선언할 때는, 이름을 지정하지 않으면 에러가 난다.
function (num) { return num ** 3 }

// 1. 기명함수로 만들기 (변수, 상수에 할당)
const cube = function (num) { return num ** 3 }
// 화살표 함수는 기본적으로 익명 함수지만, 변수 및 상수에 할당해서 기명함수처럼 사용 가능
const squareRoot = num => num ** 0.5

// 2. 익명함수 바로 실행시키기
console.log(
	(function (num) { return num ** 3 }) (2)
)
```

## 6. 배열(Array)

```javascript
const numbers = [1, 2, 3, 4, 5]

numbers[0]  // 1

numbers[-1] // undefined -> 명확한 양의 정수만 가능

numbers.length // 5

// 원본 파괴!
numbers.reverse()       // [5, 4, 3, 2, 1]
console.log(numbers)    // [5, 4, 3, 2, 1]
numbers.reverse()       // [1, 2, 3, 4, 5]
console.log(numbers)    // [5, 4, 3, 2, 1]

// push - 배열 길이 return
numbers.push('a')       // 6

numbers                 // [1, 2, 3, 4, 5, "a"]

// pop - 배열 가장 마지막 요소 제거 후 return
numbers.pop()           // "a"
numbers                 // [1, 2, 3, 4, 5]

// unshift - 배열 가장 앞에 요소 추가
numbers.unshift('a')    // 6 (배열의 새로운 length)
numbers                 // ['a', 1, 2, 3, 4, 5]

// shift - 배열의 가장 첫번째 요소 제거 후 return
numbers.shift()         // 'a'
numbers                 //[1, 2, 3, 4, 5]

numbers.push('a', 'b')
numbers                 // [1, 2, 3, 4, 5, 'a', 'b']
numbers.unshift('a')    // ['a', 1, 2, 3, 4, 5, 'a', 'b']

// 중복된 요소가 존재하는 경우 처음 찾은 요소의 index return!
numbers.indexOf('a')    // 0
numbers.indexOf('b')    // 8
numbers.indexOf('c')    // 찾는 요소가 없으면 -1

// join - 배열의 요소를 join 함수 인자를 기준으로 묶어서 문자열로 return!
numbers.join()          // "a,1,2,3,4,5,a,b"
numbers.join('-')       // "a-1-2-3-4-5-a-b"
numbers.join('')        // "a1234ab"
```

## 7. 객체(Object)

```javascript
const me = {
    name : '한석',   // key가 한 단어일 때
    'phone number' : '01012345678', // key가 여러 단어일 때
    Products : {
        cup : 'cup',
        phone : 'phone'
    }
}

me.name     //"한석"
me['name']  //"한석"
me['phone number']  // "01012345678"
me.Products     // {cup: "cup", phone: "phone"}
me.Products.cup // "cup"
```

- ES6+

```javascript
let books = ['자바스크립트 입문', '장고 웹 프로그래밍']
let comics = {
    'DC' : ['Aquaman', 'Joker'],
    'Marvel' : ['Avengers', 'Spider Man']
}

let magazines = null

const bookShop = {
    books,
    comics,
    magazines
}

console.log(bookShop)
/* 
{
  books: [ '자바스크립트 입문', '장고 웹 프로그래밍' ],
  comics: { DC: [ 'Aquaman', 'Joker' ], Marvel: [ 'Avengers', 'Spider Man' ] },
  magazines: null
}
*/
console.log(typeof bookShop)	// object
console.log(bookShop.books[0])	// 자바크스립트 입문
```

### JSON

>  JSON(JavaScript Object Notation - **JavaScript 객체 표기법)**

- **웹에서 데이터 주고받을 때 형식**으로 대표적으로 JSON, XML, YAML 등이 있다. **주로 JSON을 사용**한다.
- Key-Value 형태의 자료구조를 JavaScript Object와 유사한 모습으로 표현하는 표기법
- 하지만, JSON은 모습만 비슷할 뿐이고, 실제로 Object처럼 사용하려면 다른 언어들처럼 **Parsing(구문 분석)하는 작업이 필요**하다.

```javascript
// Object -> String
const jsonData = JSON.stringify({   // JSON -> String
    도현 : '합기도',
    혁진 : '감자',
})
console.log(jsonData)	// {"도현":"합기도","혁진":"감자"}
console.log(typeof jsonData)	// string

// String -> Object
const parseData = JSON.parse(jsonData)
console.log(parseData)	// { '도현': '합기도', '혁진': '감자' }
console.log(typeof parseData)	// object

/*
    [Object vs JSON 간단정리]
    - Object : JavaScript의 Key-Value 페어의 자료구조
    - JSON : 데이터를 표현하기 위한 단순 문자열(string)
*/
```

## 8. Array Helper Method

> Helper란 자주 사용하는 로직을 재활용할 수 있게 만든 일종의 Library
>
> ES6부터 본격적으로 사용되기 시작했다.

- 더욱 더 상세한 사용법 필요하면 `MDN` 문서 참고

### 8.1 `forEach`

- `arr.forEach(callback(element, index, array))`
- 주어진 callback을 배열에 있는 각 요소에 대해 한번씩 실행

```javascript
// ES5 for loop
var iot1 = ['도현', '혁진', '은애']
for (var i = 0; i < iot1.length; i++){
    console.log(iot1[i])
}

// ES6+
const IOT1 = ['수연', '승찬', '한석', '경희','영선']
IOT1.forEach(function(student){
    console.log(student)
})

// 한 줄로 리팩토링 가능
IOT1.forEach(student => console.log(student))

const result = IOT1.forEach( 
    student => console.log(student)
)
console.log(result) // undefined

// [실습] for를 forEach로 바꾸기!
function handleStudents(){
    const students = [
        { id : 1, name : '오은애', status : '응애?'},
        { id : 15, name : '서혁진', status : '기염'},
        { id : 28, name : '김영선', status : 'JS'},
    ]

    // for (let i = 0; i < students.length; i++){
    //     console.log(students[i])
    //     console.log(students[i].name)
    //     console.log(students[i].status)
    // }

    students.forEach(student => {
        console.log(student)
        console.log(student.name)
        console.log(student.status)
    })
}
handleStudents()

// [실습] images 배열 안에 있는 정보를 곱해 넓이를 구하여 areas 배열에 저장하세요.
const images = [
    { height : 30, width : 55 },
    { height : 50, width : 178 },
    { height : 81, width : 35},
]
const areas = []

// 정답 코드 (forEach 활용)

images.forEach(image => areas.push(image.height * image.width))

console.log(areas)
```



