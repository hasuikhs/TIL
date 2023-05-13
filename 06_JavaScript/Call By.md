# Call By...

- **변수나 객체 등이 인자로 들어와 매개변수로 전달되는 방식**

## 1. Call By Value

- **복사된 값을 인자로 넘겨서** 원본에는 영향을 미치지 않는 형태
- JavaScript에서 원시형(primitive type) 의 경우에 해당

```javascript
let increaseNum = (num) => {
    console.log(++num);
}

let num = 5;

increaseNum(num);	// 6
console.log(num);	// 5
```

- call by value는 복사된 값을 인자로 넘길때 유효하지만, 인자로 넘기지 않을경우 closure를 통해 유효하지 않음

  ```javascript
  let num = 1;

  function fun() {
    num += 1;
  }

  console.log(num); // 1
  fun();
  console.log(num); // 2
  ```

  ```javascript
  let num = 1;
  
  function fun(num) {
    num += 1;
    return num;
  }

  console.log(num); // 1
  fun();
  console.log(num); // 1
  ```

## 2. Call By Reference

- 실제 **원본 데이터가 존재하는 주소를 가리키는 주소값을 인자로 넘겨** 매개변수로 전달
- JavaScript에서 객체형(Object, Array, function 등)에 해당되며 이를 참조 변수(reference variable)이라 불림

```javascript
let pushElement = (arr, num) => {
    arr.push(num);
    console.log(arr)
}

let arr = [1, 2, 3];

pushElement(arr, 4);	// [1, 2, 3, 4]
console.log(arr);		// [1, 2, 3, 4]
```

## :warning: 그러나

- **JavaScript에서는 무조건 Call By Value로 작동** 
- 참조 타입으로 넘겨도 값이 변하지 않음
- 참조 타입을 인자로 넘기면 참조 값에 대한 복사본이 넘어감

```javascript
let test = (obj2) => {
  obj2 = 10;
  console.log(obj2);	
}

let obj1 = { a: 5, b: 8 };

test(obj1); // 10
// 1. obj1이 인자로 넘어가서 매개변수로 전달될 때, 
//    obj1이 가리키고 있는 주소값과 동일한 주소값을 가진 obj2가 복사되어 전달
// 2. test 함수 내부의 obj2 = 10;에서 obj2의 주소값이 10이 저장된 위치의 주소값으로 변경 <- obj2의 주소값이 변경
console.log(obj1); // { a: 5, b: 8 }
```

- 이 때문에 JavaScript는 Call By Sharing이라고도 함

## 3. Call By Sharing

- 값에 대한 복사가 이루어지는 것처럼 보이지마, 사실 참조 타입에서 메모리의 주소를 전달하는 것과 유사한 방식
- Call By Value와 Call By Reference 의 특징을 종합하여 Call By Sharing이라고 함(이도 저도 아닌...)
- Python, Java, Ruby, JavaScript가 이에 해당
- 인자로 전달되는 **변수가 원시값일 경우에는 Call By Value로 평가되고, 아니라면 메모리 주소만 전달**

##### 참고

https://velog.io/@leo-xee/JS-Call-by-value-reference