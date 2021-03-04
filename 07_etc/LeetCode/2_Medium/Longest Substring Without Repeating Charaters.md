# Longest Substring Without Repeating Charaters

- 문자열에서 중복되지 않은 문자가 있는 가장 긴 문자열을 반환

```javascript
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    var longStr = '';
    var curStr = '';
    
    for (var i = 0; i < s.length; i++) {
        if (curStr.includes(s[i])) {
            if (curStr.length > longStr.length) {
                longStr = curStr;
            }
            curStr = curStr.substring(curStr.indexOf(s[i]) + 1) + s[i];
        } else {
            curStr += s[i];
        }
    }

    if (curStr.length > longStr.length) {
        longStr = curStr;
    }

    return longStr.length;
};
```

