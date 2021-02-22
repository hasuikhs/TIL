# Longest Common Prefix

- 주어진 문자 배열의 같은 접두어를 반환

```javascript
var longestCommonPrefix = (strs) => {
    let prefix = '';
    
    if (strs === null || strs.length === 0) return prefix;
    
    for (let i = 0; i < strs[0].length; i++) {
        for (let j = 1; j <strs.length; j++) {
            if (strs[0][i] != strs[j][i]) {
                return prefix;
            }
        }
        prefix += strs[0][i];
    }
    
    return prefix;
};
```

