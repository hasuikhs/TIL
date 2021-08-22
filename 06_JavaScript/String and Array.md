# String and Array

## 1. 공통점

```javascript
let list = ['js', 'py', 'html', 'css'];
console.log(list[3]);	// css

let str = 'hello';
console.log(str[3]);	// l
```

- JavaScript에서 String은 Array처럼 `[n]`을 사용하면 해당하는 순서의 글자를 반환
- `.length` 사용 가능

```javascript
function func1(a, b, c, d) {
	console.log(a);
    console.log(b);
    console.log(c);
    console.log(d);
}

func1(...list); // list 순서 반환
func1(...str); 	// str 문자열을 뿌림
```

- 문자열과 배열은 iterator 속성이 있어서 `for ... of`과 `spread operator` 사용 가능

  ```javascript
  let list = [1, 2, 3, 4];
  let str  = 'hello';
  let obj  = {};
  
  console.log(list[Symbol.iterator]);	// ƒ values() { [native code] }
  console.log(str[Symbol.iterator]);  // ƒ [Symbol.iterator]() { [native code] }
  console.log(obj[Symbol.iterator]);	// undefined
  ```

## 2. 차이점

```javascript
list[2] = 'conf';
console.log(list);	// ['js', 'py', 'conf', 'css']

str[2] = '8';
console.log(str);	// 'hello'
```

- 배열은 변환 가능하지만 문자열은 변환되지 않음

