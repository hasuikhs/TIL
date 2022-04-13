# Spread & Rest

## 1. Spread

- 객체 혹은 배열을 펼칠 수 있음

- **객체**

  ```javascript
  const obj1 = {
      one: 1
  };
  
  const obj2 = {
      ...obj1,
      two: 2
  };
  
  const obj3 = {
      ...obj2,
      three: 3
  }
  
  console.log(obj1);	// { one: 1 }
  console.log(obj2);	// { one: 1, two: 2 }
  console.log(obj3);	// { one: 1, two: 2, three: 3 }
  ```

- **배열**

  ```javascript
  const arr1 = [ 1, 2, 3, 4 ];
  const arr2 = [...arr1, 5];
  
  console.log(arr1);	// [1, 2, 3, 4];
  console.log(arr2);	// [1, 2, 3, 4, 5]
  ```

## 2. Rest

- rest는 spread와 비슷하지만 역할이 다름

- rest는 객체, 배열, 그리고 함수의 파라미터에서 사용 가능

- **객체**

  ```javascript
  const obj1 = {
      one: 1,
      two: 2,
      three: 3
  };
  
  const { one, ...rest } = obj1;
  console.log(one);	// 1
  console.log(rest);	// { two: 2, three: 3 }
  ```

- **배열**

  ```javascript
  const arr = [1, 2, 3, 4, 5];
  
  const [one, ...rest] = arr;
  
  console.log(one);	// 1
  console.log(rest);	// [2, 3, 4, 5]
  ```


## 3. 함수에서

- **함수(rest)**

  - 함수의 파라미터가 몇개가 될지 모르는 상황에서 rest는 매우 유용

  ```javascript
  function test(...rest) {
      return rest;
  }
  
  console.log(test(1, 2, 3, 4, 5));
  ```

  - **함수에서 받아온 파라미터들을 배열로 만들어줌**

- **함수(spread)**

  ```javascript
  function test(...rest) {
    return rest;
  }
  
  let arr = [1, 2, 3, 4, 5];
  
  console.log(test(arr));  // [[1, 2, 3, 4, 5]]
  ```

  ```javascript
  function test(...rest) {
    return rest;
  }
  
  let arr = [1, 2, 3, 4, 5];
  
  console.log(test(...arr));  // [1, 2, 3, 4, 5]
  ```