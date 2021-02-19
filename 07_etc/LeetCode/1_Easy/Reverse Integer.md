# Reverse Integer

- 주어진 숫자 뒤집고 2^31 -1 보다 크면 0, -2^31 보다 작으면 0

```javascript
var reverse = function(x) {
    
    let num = Number(String(Math.abs(x)).split('').reverse().join(''));
    if (x < 0) {
        num = -1 * num;
    }
    
    if (num > 2**31 -1 || num < -1 * 2**31) {
        num = 0;
    }
    
    return num;
};
```

