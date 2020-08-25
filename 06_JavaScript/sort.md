# Sort

## 1. 문자 정렬

```javascript
var fruit = ['orange', 'apple', 'banana'];

fruit.sort();
```

## 2. 숫자 정렬

- 숫자는 문자처럼 `.sort()`로 할 수 없음

  - 숫자 크기로 정렬이 되는것이 아닌 ascii 코드로 정렬

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
    return a.name >b.name ? -1 : a.name <b.name ? 1: 0;
});

arr.sort(function(a, b) {
    return a.score - b.score;
});

arr.sort(function(a, b) {
    return b.score - a.score;
});
```

