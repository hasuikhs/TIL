# Iterable

- 반복 가능한(iterable) 객체는 배열을 일반화한 객체
- iterable 이라는 개념을 사용하면 어떤 객체에든 `for...of`  반복문 적용 가능
  - 대표적으로 배열, 문자열
- 배열이 아닌 객체가 있는데, 이 객체가 어떤 것들의 켈력션을 나타내고 있는 경우 `for..of` 문법 적용하여 유용하게 사용 가능

## 1. Symbol.iterator

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
  // 
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

  