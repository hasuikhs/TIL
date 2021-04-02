# Excel Sheet Column Title

- 주어진 숫자를 엑셀 컬럼과 같이 알파벳으로 변경

```javascript
/**
 * @param {number} columnNumber
 * @return {string}
 */
var convertToTitle = function(columnNumber) {
    
    var trans = columnNumber.toString(26);
    var result = '';
    
    for (var i = 0; i < trans.length; i++) {
        var tmp = trans[i]
        console.log(tmp)
        if (tmp == '0') {
            result = result.substring(0, result.length - 1)
            result += 'Z'
        } else if (/^[0-9]$/.test(tmp)) {
            result += String.fromCharCode(tmp.charCodeAt(0) + 16)
        } else if (/^[a-z]$/.test(tmp)) {
            result += String.fromCharCode(tmp.charCodeAt(0) - 23)
        }
        console.log(result)
        
    }    
    
    return result;
};
```

