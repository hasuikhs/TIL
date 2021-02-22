# Roman to Integer

- 로마 숫자를 Integer로 변환하기

```javascript
var romanToInt = function(s) {
    var obj = {
        'I': 1,
        'V': 5,
        'X': 10,
        'L': 50,
        'C': 100,
        'D': 500,
        'M': 1000
    };

    var split = s.split('');
    var resultNum = 0;

    for (var i = 0; i < split.length; i++) {
        
        
        resultNum += obj[split[i]];
        
        if (i > 0 && split[i] != split[i - 1]) {
            
            if ((split[i] == 'V' || split[i] == 'X') && split[i - 1] == 'I') {
                resultNum -= obj[split[i - 1]] * 2;    
            }
            
            if ((split[i] == 'L' || split[i] == 'C') && split[i - 1] == 'X') {
                resultNum -= obj[split[i - 1]] * 2;    
            }
            
            if ((split[i] == 'D' || split[i] == 'M') && split[i - 1] == 'C') {
                resultNum -= obj[split[i - 1]] * 2;    
            }
            
        }
    }

    return resultNum;

};
```

