# Excel Sheet Column Title

- 주어진 숫자를 엑셀 컬럼과 같이 알파벳으로 변경

```javascript
/**
 * @param {number} columnNumber
 * @return {string}
 */
var convertToTitle = function(n) {
    if (n == 0) return null;
    let result = '';
    while (n > 0) {
        let r = n % 26;
        let d = parseInt(n / 26);
        if (r == 0) {
            r = 26;
            d = d - 1;
        }
        result += String.fromCharCode (64 + r);
        n = d;
    }
    return result.split('').reverse().join("");
};
```

