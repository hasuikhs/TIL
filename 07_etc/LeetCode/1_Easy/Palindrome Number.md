# Palindrome Number

- 주어진 숫자를 뒤집었을때 같은 숫자인 경우 true 반환
- 음수인 경우는 false

```javascript
var isPalindrome = function(x) {
    return x == Number(Math.abs(x).toString().split('').reverse().join(''));
};
```

