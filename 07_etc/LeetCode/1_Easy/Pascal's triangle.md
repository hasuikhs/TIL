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
        result[i] =[];
        result[i][0] = 1;
        for (var j = 1; j <= i; j++) {
            result[i][j] = result[i - 1][j - 1] + result[i - 1][j];
        }
        result[i][i] = 1;
    }
    
    return result;
};
```

