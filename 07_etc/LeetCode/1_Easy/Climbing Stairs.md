# Climbing Stairs

- 주어진 숫자 n까지 가는데 1 또는 2 씩 증가할 수 있는데 그 경우의 수 구하기

```javascript
/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function(n) {
     let prev = 0;
    let cur = 1;
    let temp;
    
    for (let i = 0; i < n; i++) {
        temp = prev;
        prev = cur;
        cur += temp; 
    }
    return cur;
    
};
```

