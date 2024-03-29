# Iterable

- 반복 가능한(iterable) 객체는 배열을 일반화한 객체
  - **iterable**: iterator를 리턴하는 `[Symbol.iterator]()`를 가진 값
  - **iterator**
    - `{ value, done }` 객체를 리턴하는 `next()`를 가진 값
    - `value` 는 현재 요소의 값, `done`은 이터레이션이 끝났는지의 여부의 bool 값
  - **iterator protocol**: iterable을 `for ...of`, 전개 연산자 등과 함께 동작하도록한 규약

- iterable 이라는 개념을 사용하면 어떤 객체에든 `for...of`  반복문 적용 가능
  - 대표적으로 배열, 문자열
- 배열이 아닌 객체가 있는데, 이 객체가 어떤 것들의 켈력션을 나타내고 있는 경우 `for..of` 문법 적용하여 유용하게 사용 가능

## 1. `[Symbol.iterator]()`
- iterator 객체 자체에 대한 이터레이터 반환하여 **반복 가능한(iterable)** 객체로 만듦

```javascript
let range = {
    from: 1,
    to: 5
}

for (let num of range) {
    console.log(num); // range is not iterable
}
```

- `for...of`는 itarable 객체에서만 사용 가능한데 위의 코드를 실행하면 `range is not iterable` 에러가 발생

- `for...of`가 동작하도록 하려면 객체에 `Symbol.iterator`라는 메서드를 추가

  ```javascript
  // 객체와 반복 대상 분리
  let range = {
      from: 1,
      to: 5
  }
  
  range[Symbol.iterator] = function() {
      return {
          current: this.from,
          last: this.to,
          
          next() {
              if (this.current <= this.last) {
                  return { done: false, value: this.current++ };
              } else {
                  return { done: true };
              }
          }
      }
  }
  
  for (let num of range) {
      console.log(num); // 1, 2, 3, 4, 5
  }
  ```

  - Iterator 객체와 반복 대상인 객체를 분리 가능

  ```javascript
  let range = {
  	from: 1,
  	to: 5,
  
  	[Symbol.iterator]() {
  		this.current = this.from;
  		return this;
      },
  
  	next() {
      	if (this.current <= this.to) {
  		    return { done: false, value: this.current++ };
  	    } else {
      		return { done: true };
  	    }
  	}
  };
  
  for (let num of range) {
  	alert(num); // 1, then 2, 3, 4, 5
  }
  ```

  - 이 코드의 단점은 `for...of` 반복문을 하나의 객체에 동시에 사용 불가능함


## 2. 문자열은 iterable

- 배열과 문자열은 가장 광범위하게 쓰이는 내장 iterable

- `for...of`는 문자열의 각 글자를 순회

  ```javascript
  for (let char of 'test') {
      alert(char);	// t, e, s, t가 차례대로 출력
  }
  ```

- 명시적으로 호출하기

  ```javascript
  let str = 'hello';
  
  let iterator = str[Symbol.iterator]();
  
  while (true) {
      let result = iterator.next();
      if (result.done) break;
      alert(result.value);
  }
  ```

  - Iterator를 명시적으로 호출하는 경우는 거의 없음
  - 하지만 이를 사용하면 `for...of`를 사용하는 것보다 과정 더 잘 통제 가능

## 3. Itarable과 유사 배열

- Iterable은 `Symbol.iterator`가 구현된 객체

- 유사 배열은 인덱스와 `length` 프로퍼티가 있어서 배열처럼 보이는 객체

  - Iterable과 유사 배열은 배열이 아니기 때문에 `push`, `pop` 등의 메서드를 지원하지 않음

- **`Array.from`**

  - `Array.from`은 iterable이나 유사 배열을 받아 얕은 복사를 하여 새로운 배열 객체를 만들어줌

  ```javascript
  let arrayLike = {
    0: "Hello",
    1: "World",
    length: 2
  };
  
  let arr = Array.from(arryLike);
  ```

  - 위에서 선언한 `arrayLike` 객체처럼 배열처럼 숫자를 키값으로 만들어야 함

  - `Array.from(obj[, mapFunc, thisArg])`로 매핑(mapping) 함수를 optional하게 줄 수 있음

    ```javascript
    let arr = Array.from(arrayLike, item => item + 'plus');
    ```

- **`Spread Syntax`**

  - ES6+ 의 문법으로 배열이나 문자열과 같이 반복가능한 객체를 하나씩 펼쳐서 반환

  ```javascript
  let str = 'hello';
  
  let arr = [...str];
  console.log(arr);	// ['h', 'e', 'l', 'l', 'o']
  ```

  

