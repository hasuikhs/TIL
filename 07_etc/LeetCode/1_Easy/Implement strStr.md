# Implement strStr

- 기준이 되는 문자열과 속할 문자열이 주어짐
- 속할 문자열이 기준이 되는 문자열에 속해 있다면, 해당 문자열이 시작되는 순번을 반환

```javascript
/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
var strStr = function(haystack, needle) {
    if (needle == '') return 0;
    
    var haystackLength  = haystack.length;
    var needleLength    = needle.length;
    
    for (var i = 0; i < haystack.length; i++) {
        if (haystack.substring(i, i + needleLength) == needle) {
            return i;
        }
    }
    
    return -1;
};
```

