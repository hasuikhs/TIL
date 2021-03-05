# Add Binary

- 두개의 이진수를 더하는 값
- 일반적은 Number를 사용하면 2^53 이상의 숫자를 해결할 수 없음
- 그래서 사용되는 것이 `BigInt`를 사용

```javascript
/**
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
var addBinary = function(a, b) {
    return (BigInt(`0b${a}`) + BigInt(`0b${b}`)).toString(2);
};
```

