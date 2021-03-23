# Pascal's triangle

![](https://upload.wikimedia.org/wikipedia/commons/0/0d/PascalTriangleAnimated2.gif)

```javascript
/**
 * @param {number} numRows
 * @return {number[][]}
 */
var generate = function(numRows) {
    var result = [];
    
    for(var i = 0; i < numRows; i++) {
        if (i == 0) {
            result.push([1]);
        } else if (i == 1) {
            result.push([1, 1]);
        } else {
            var tmpArr = [];
            
            var prevArr = result[i - 1];
            for (var j = 0; j <= i; j++) {
                if (j == 0 || j == i) {
                    tmpArr[j] = 1
                } else {
                    tmpArr[j] = prevArr[j - 1] + prevArr[j];
                }
            }
            result.push(tmpArr);
        }
    }
    
    return result;
};
```

