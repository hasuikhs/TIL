# Symbol

## 1. Symbol?

- **ES6에서 추가**된 7번째 타입으로 변경 불가능한 Primitive Type

- 주로 이름의 충돌 위험이 없는 **유일한 객체의 프로퍼티 키를 만들기 위해 사용**
- **등장 배경**
  - 프로그래머의 실수 등으로 존재하는 객체의 key 값이 변경 가능한 이슈 존재
  - 즉, **이미 존재하는 메소드나 키 값이 오버라이드 되는 것을 방지**

## 2. 생성

- Symbol은 `String`, `Number`, `Boolean`과 다르게 `new `연산자를 사용하지 않음
- Symbol() 함수는 호출될 때마다 Symbol 값을 생성

```javascript
let sym = Symbol();

console.log(sym);	// Symbol()
```

- Symbol() 함수에는 문자열을 인자로 전달 가능하고, 오직 **Symbol에 대한 설명으로 디버깅 용도로만 사용**

```javascript
let sym = Symbol('test');
console.log(sym === Symnbol('test')) // false
```

## 3. 사용

- Symbol 값을 객체의 프로퍼티 키로 사용 가능
- **Symbol 값은 유일한 값이므로 Symbol 값을 키로 갖는 프로퍼티는 다른 어떠한 프로퍼티와도 충돌하지 않음**

```javascript
const obj = {};

const sym = Symbol('sym');
obj[sym] = 123;

console.log(obj); // { Symbol(sym): 123 }
```

- 설명이 동일한 여러 개 만들어도 각 Symbol값은 다름

```javascript
let sym1 = Symbol('sym');
let sym2 = Symbol('sym');

console.log(sym1 == sym2);	// false

let test = {}

test[sym1] = 'sym1';
test[sym2] = 'sym2';
console.log(test);	// { Symbol(sym): "sym1", Symbol(sym): "sym2" }
```

- Key가 Symbol이면 `for...in` 문에서 제외

```javascript
// 위의 test 객체에서
for (let key in test) console.log(key);	// undefined

test['test'] = 'test';
for (let key in test) console.log(key);	// test
```

### 4. 메서드

```javascript
console.dir(Symbol)
```

- 위의 코드를 브라우저에서 쳐보면 Symbol 객체는 프로퍼티와 메서드를 가짐
- Symbol 객체의 프로퍼티 중에 length와 prototype을 제외한 프로퍼티를 `Well-Known Symbol`이라 부름
  - `Well-Known Symbol`은 Javascript 엔진이 디폴트로 처리하는 알고리즘 유형

### 4.1 `Symbol.iterator`

- `Well-Known Symbol`은 Javascript 엔진에 상수로 존재하며 `Well-Known Symbol`을 참조하여 일정한 처리를 함
- `Array`, `String`, `Map`, `Set`, `DOM data structures`, `arguments` 객체들은 iterator 프로토콜을 준수하며 반환

```javascript
// 이터러블
// Symbol.iterator를 프로퍼티 key로 사용한 메소드를 구현하여야 한다.
// 배열에는 Array.prototype[Symbol.iterator] 메소드가 구현되어 있다.
const iterable = ['a', 'b', 'c'];

// 이터레이터
// 이터러블의 Symbol.iterator를 프로퍼티 key로 사용한 메소드는 이터레이터를 반환한다.
const iterator = iterable[Symbol.iterator]();

// 이터레이터는 순회 가능한 자료 구조인 이터러블의 요소를 탐색하기 위한 포인터로서 value, done 프로퍼티를 갖는 객체를 반환하는 next() 함수를 메소드로 갖는 객체이다. 이터레이터의 next() 메소드를 통해 이터러블 객체를 순회할 수 있다.
console.log(iterator.next()); // { value: 'a', done: false }
console.log(iterator.next()); // { value: 'b', done: false }
console.log(iterator.next()); // { value: 'c', done: false }
console.log(iterator.next()); // { value: undefined, done: true }
```

### 4.2 `Symbol.for`

- 인자로 전달받은 문자열을 키로 사용하여 Symbol 값들이 저장되어 있는 전역 Symbol 레지스트리에서 검색
- 검색에 성공하면 검색된 Symbol 값을 반환, 검색에 실패하면 새로운 Symbol 값을 생성 및 저장 후 반환

```javascript
// 전역 Symbol 레지스트리에 foo라는 키로 저장된 Symbol이 없으면 새로운 Symbol 생성
const s1 = Symbol.for('foo');
// 전역 Symbol 레지스트리에 foo라는 키로 저장된 Symbol이 있으면 해당 Symbol을 반환
const s2 = Symbol.for('foo');

console.log(s1 === s2); // true
```

- Symbol 함수는 매번 다른 Symbol 값을 생성하는 것에 반해, **`Symbol.for`는 여러 모듈이 키를 통해 같은 Symbol을 공유 가능**