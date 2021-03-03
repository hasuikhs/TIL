# Plus One

- 주어진 숫자배열을 하나의 숫자로 보고 1을 더한 숫자의 배열을 반환

##### 첫번째 시도

- 주어진 배열을 숫자로 바꾸고, 하나를 더한 후에, 다시 배열로 변환
- max_integer를 벗어나면 답이 되지 않음...

```javascript
var plusOne = function(digits) {
    return (Number.parseInt(digits.join('')) + 1).toString().split('');
};
```

##### 두번째 시도

- 배열을 뒤에서부터 하나씩 읽으면서 더하고 10이넘는 부분을 그다음 순번에 더함
- 마지막에 올림수가 남을경우 unshift를 이용해 맨 앞에 붙여줘야함

```javascript
/**
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne = function(digits) {
    
    var remains = 1;
    var val = 0;
    
    for (var i = digits.length - 1; i >= 0; i--) {
        
        val = digits[i] + remains;   
        remains = 0;
            
        if (val > 9) {
            digits[i] = val % 10;
            remains = 1;
        } else {
            digits[i] = val;
            remains = 0;
            
            break;
        }
    }
    
    if (remains > 0) {
        digits.unshift(1);
    }
    
    return digits;
};
```

