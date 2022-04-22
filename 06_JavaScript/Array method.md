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

## 2. 원본 배열을 변경하지 않음

### 2.1 `join()`

- 배열의 모든 요소를 하나의 문자열로 반환

```javascript
var arr = [1, true, "JavaScript"];

arr.join();      // 1,true,JavaScript
arr.join(' + '); // 1 + true + JavaScript
```

### 2.2 `slice()`

- 전달받은 시작 인덱스로부터 종료 인덱스 바로 앞까지의 모든 배열 요소를 추출하여 새로운 배열 반환
- 종료 인덱스가 없다면 마지막 배열 요소까지 모두 추출

```javascript
var arr = [1, true, "JavaScript", "자바스크립트"];

arr.slice(1, 3); // [true,JavaScript]
arr.slice(1);    // [true,JavaScript,자바스크립트 ]
```

### 2.3 `concat()`

- 해당 배열의 뒤에 인수로 전달받은 배열을 합쳐서 새로운 배열을 반환

```javascript
var arr = [1, true, "JavaScript"];

arr.concat([2, false, "문자열"]); // [1,true,JavaScript,2,false,문자열]
```

### 2.4 `toString()`

- 해당 배열의 모든 요소를 하나의 문자열로 반환
- 배열 요소의 사이에는 자동으로 쉼표(`,`)가 삽입

```javascript
var arr = [1, true, "JavaScript"];

arr.toString(); // '1,true,JavaScript'
```

## 3. 원본 배열을 반복적으로 참조

### 3.1 `forEach()`

- 해당 배열의 모든 요소에 대하여 반복적으로 명시된 콜백 함수 실행

```javascript
var arr = [1, true, "JavaScript"];

arr.forEach((value, index, array) => {
    console.log(value, index, array)
})
```

### 3.2 `map()`

- 해당 배열의 모든 요소에 대하여 반복적인 콜백  함수를 실행 후, 그 결과들을 새로운 배열에 담아 반환

```javascript
var arr = [1, -2, 3, -4];

var absoluteValues = arr.map(Math.abs);

absoluteValues; // [1,2,3,4]
```

```javascript
// map 구현
const map = (f, iter) => {
    let res = [];
    for (const a of iter) {
        res.push(f(a));
    }
    return res;
}
```

### 3.3 `filter()`

- 해당 배열의 모든 요소에 대하여 반복적인 콜백 함수를 실행 후, 그 결과값이 true인 요소들만 새로운 배열에 담아 반환

```javascript
var arr = [-10, 5, 100, -20, 40];

var overZero = arr.filter(value => value > 0);
overZero;	// [5, 100, 40]
```

```javascript
// filter 구현
// f 보조 함수에 평가 위임
const filter = (f, iter) => {
    let res = [];
    for (const a of iter) {
        if (f(a)) res.push(a);
    }
    return res;
}

let arr = [{
    num: 4
}, {
    num: 5
}];

console.log(filter(a => a.num < 5, arr));
```

### 3.4 `every()`

- 해당 배열의 모든 요소에 대하여 반복적인 콜백 함수를 실행 후,  그 결과값이 모두 true일 때에만 true 반환

```javascript
var arr = [-10, 5, -20, 4];

arr.every(value => value < 10); // true
```

### 3.5 `some()`

- 해당 배열의 모든 요소에 대하여 반복적인 콜백 함수를 실행 후,  그 결과값이 하나라도 true이면 true 반환

```javascript
var arr = [10, 25, -20, 14];

arr.some(value => value < 10);	// true
```

### 3.6 `reduce()`

- 해당 배열의 모든 요소를 하나의 값으로 줄이기 위해, 두 개의 인수를 전달받는 콜백 함수를 실행

```javascript
var arr = [1, 2, 3, 4];

arr.reduce((value1, value2) => value1 + value2, 0);	// 15
```

```javascript
const reduce = (f, acc, iter) => {
	if (!iter) {
        iter = acc[Symbol.iterator]();
        acc = iter.next().value;
    }
    for (const a of iter) {
        acc = f(acc, a);
    }
    return acc;
}
```

- 새로운 배열 만들어서 반환

  ```javascript
  const oddEven = arr.reduce((result, cur) => {
      result.push(cur % 2 ? '홀' : '짝');
      return result;
  }, []);
  
  console.log(oddEven);	// ['홀', '짝', '홀', '짝']
  ```

- 그룹핑하여 key: value로 반환

  ```javascript
  let arr = [
    { class: 1, name: 'one' },
    { class: 1, name: 'two' },
  
    { class: 2, name: 'three' }
  ];
  
  let cls = arr.reduce((result, cur) => {
    if (cur.class in result) {
      result[cur.class]++;
    } else {
      result[cur.class] = 1;
    }
  
    return result;
  }, {});
  
  console.log(cls);	// { '1': 2, '2': 1 }
  ```

### 3.7 `reduceRight()`

- `reduce()`와 같은 방식으로 실행되며, 배열의 마지막 요소부터 줄이기 시작

```javascript
var arr = [1, 2, 3, 4];

arr.reduceRight((value, value2) => value1 - value2, 0);	// -15
```

### 3.8 `entries()`

- 배열 요소별로 key-value 쌍으로 이루어진 배열 반복자 객체를 배열 형태로 반환

```javascript
var arr = [1, true, "JavaScript"];

var arrEntries = arr.entries();

for (var entry of arrEntries) {
    console.log(entry);
}
```

