# Sort

## 1. 문자 정렬

```javascript
var fruit = ['orange', 'apple', 'banana'];

fruit.sort();
```

## 2. 숫자 정렬

- **`.sort()`는 기본적으로 문자열을 위한 정렬할 때 사용하는 함수!!! 숫자는 문자처럼 `.sort()`로 할 수 없음!!!**

  - 숫자 크기로 정렬이 되는것이 아닌 ascii 코드로 정렬
- **정렬은 기본적으로 오름차순 정렬이지만 compareFunction인`(a, b) => a - b`를 꼭! 붙여야 함**
  - compareFunciton을 사용하지 않으면 유니코드 포인트 순서로 **문자열을 비교**하여 정렬하기 때문에 생각지 못한 테스트에서 오류가 날 가능성이 존재
  
  ```javascript
  var score = [4, 11, 2, 10, 3, 1];
  
  score.sort();
  // 1, 10, 11, 2, 3, 4
  
  score.sort(function(a, b) {
      return a - b;	// 오름차순
  });
  // 1, 2, 3, 4, 10, 11
  
  score.sort(function(a, b) {
      return b - a;	// 내림차순
  });
  // 11, 10, 4, 3, 2, 1
  ```

## 3. 객체 정렬

```javascript
var arr = [
    { name : "user1", score : 80},
    { name : "user2", score : 70},
    { name : "user3", score : 75},
    { name : "user4", score : 65},
    { name : "user5", score : 85},
];

arr.sort(function(a, b) { // 오름차순
    return a.name < b.name ? -1 : a.name > b.name ? 1: 0;
});

arr.sort(function(a, b) { // 내림차순
    return a.name > b.name ? -1 : a.name <b.name ? 1: 0;
});

arr.sort(function(a, b) {
    return a.score - b.score;
});

arr.sort(function(a, b) {
    return b.score - a.score;
});
```

```javascript
class Column {
  constructor(name) {
    this.name = name;
  }
}

const no = new Column('no');
const id = new Column('id');
const test = new Column('test');

const arr = [no, id, test];

const sort = ['test', 'no'];

// 'sort' 배열의 순서에 따라 'arr' 배열을 정렬
arr.sort((a, b) => {
  const aIndex = sort.indexOf(a.name);
  const bIndex = sort.indexOf(b.name);
  
  // 'sort' 배열에 없는 요소는 가장 뒤로 보냄
  if (aIndex === -1) {
    return 1;
  }
  if (bIndex === -1) {
    return -1;
  }
  
  // 'sort' 배열에 있는 요소의 순서에 따라 정렬
  return aIndex - bIndex;
});

console.log(arr);
```