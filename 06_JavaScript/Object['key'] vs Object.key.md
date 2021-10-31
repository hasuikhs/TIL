#  Object['key'] vs Object.key

- JavaScript 객체의 property를 접근하는 방법에는 **`[]`을 사용하는 괄호 표기법과 `.` 점 표기법**을 사용하는 방법 존재

- 경우에 따라 `.`을 사용할 경우 property에 접근되지 않는 경우가 존재

- **점 표기법**

  - 괄호 표기법에 비해 간결하게 작성 가능해 **가독성** 측면에서 좋음

  ```javascript
  get = object.property;
  object.property = set;
  ```

- **괄호 표기법**

  - 바로바로 객체의 프로퍼티에 변수를 활용하여 접근 가능한 점  

  ```javascript
  get = object[property_name];
  object[property_name] = set;
  ```

  - 문자열로 접근할 경우 전부 접근 가능

- `[]` 표현은 변수로 접근 가능하지만, `.` 표현은 객체의 속성에 바로 접근

```javascript
var a = {
    a: 1,
    2: 2
};

console.log(a.a)	// 1
console.log(a['2'])	// 2
console.log(a.2)	// error
```

- 표현에 숫자가 먼자 나오거나, 숫자인 경우 error 발생``

```javascript
var obj = {
    one: '1',
    two: '2'
};

console.log(obj.one);	// 1
consoe.log(obj[one]);	// one is not defined

let one = 'one';
console.log(obj[one]);	// 1
```

