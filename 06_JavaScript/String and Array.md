# String and Array

## 1. String

### 1.1 `substr()` vs `substring()` vs `slice()`

- 모두 문자열을 잘라주는 역할을 하지만 조금씩 다름

- `substr(start, ?length)`

  - 입력받은 start index 부터 length 만큼을 잘라내어 반환

    ```javascript
    let str = 'string';
    
    str.substr(0, 2);	// str
    str.substr(1, 2);	// tr
    ```

- `substring(start, ?end)`

  - 잘라내고 싶은 start index와 last index를 받아서 잘라내 반한

    ```javascript
    let str = 'string';
    
    str.substring(0, 2);	// st
    str.substring(1, 2);	// t
    ```

- `slice(start, ?end)`

  - `substring` 과 같음

- `substring()` vs `slice()`

  - start > end 일 경우

    ```javascript
    let str = 'string';
    
    str.substring(1, 0);	// s
    str.slice(1, 0);		// 빈값
    ```

    - `substring()` 은 start값과 end 값을 바꾸어 처리

  - start 또는 end 값이 음수인 경우

    ```javascript
    // substring
    str.substring(2, -1);	// st
    str.substring(-1, 2);	// st
    ```

    - 음수의 경우 0으로 취급하여 처리

    ```javascript
    // slice
    str.slice(2, -1);	// rin	// 2에서 길이의 -1 번째 인덱스까지 자름 즉 slice(2, 5)로 처리
    str.slice(-2, 5);	// n	// slice(4, 5)로 처리
    ```

## 2. 공통점

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

## 3. 차이점

```javascript
list[2] = 'conf';
console.log(list);	// ['js', 'py', 'conf', 'css']

str[2] = '8';
console.log(str);	// 'hello'
```

- 배열은 변환 가능하지만 문자열은 변환되지 않음

