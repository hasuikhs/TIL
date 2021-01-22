# Array method

## 1. 원본 배열을 변경

### 1.1 `push()`

- 하나 이상의 요소를 배열의 마지막에 추가

```javascript
var arr = ['this', 'is', 'arr'];
arr.push('!!');			// ['this', 'is', 'arr', '!!']
```

### 1.2 `pop()`

- 배열 마지막 요소를 제거하고, 해당 요소를 반환

```javascript
var arr = ['this', 'is', 'arr', '!!'];
arr.pop();				// !!
```

### 1.3 `shift()`

- `pop()`과 반대로 배열 첫번째 요소를 제거하고, 해당 요소를 반환

```javascript
var arr = ['this', 'is', 'arr'];
arr.shift();			// this
```

### 1.4 `unshift()`

- 하나 이상의 요소를 배열의 가장 앞에 추가

```javascript
var arr = ['this', 'is', 'arr'];
arr.unshift('1', '2');	// ['1', '2', 'this', 'is', 'arr']
```

### 1.5 `reverse()`

- 배열 요소의 순서를 뒤집음

```javascript
var arr = ['this', 'is', 'arr'];
arr.reverse();			// ['arr', 'is', 'this']
```

### 1.6 `sort()`

- 해당 배열의 요소들을 문자 순서로 정렬
- 숫자로 정렬은 원하는대로 정렬이 잘못 되지 않을 수 있어 `compareFunction`을  지정해야 함

```javascript
var arr = ['가', '다', '나'];
arr.sort();				// ['가', '나', '다']
```

### 1.7 `splice()`

- 기존 배열의 요소를 제거하거나 새로운 배열 요소를 추가하여 배열의 내용을 변경
- 첫 번째 인수는 새로운 요소가 삽입될 인덱스, 두 번째 인수는 제거할 요소의 개수, 그 이후의 인수들은 모두 배열의 요소

```javascript
var arr = [1, true, "JavaScript", "자바스크립트"];

// 인덱스 1의 요소부터 2개의 요소를 제거한 후, false와 "C언어"를 그 자리에 삽입함.

var removedElement = arr.splice(1, 2, false, "C언어");

arr;            // [1,false,C언어,자바스크립트]
```

