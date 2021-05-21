# Valid Palindrome

- 문장이 뒤집은 문장과 같은 문자열일 경우를 찾아내는 문제
- 정규식으로 숫자와 영문자만 골라냄 
- 특수문자, 공백 제외

```javascript
/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function(s) {
    var wordStr = s.replace(/[^a-z0-9]/gi, '');
    var reverseStr = wordStr.split('').reverse().join('');

    return wordStr.toLowerCase() == reverseStr.toLowerCase()
}
```

- 추가 문제

  - input: character array

  ```javascript
  // 기본적으로 그냥 어레이가 들어오므로 리버스만 하면 뒤집어짐
  var reverseString = function(s) {
      return s.reverse();
  }
  ```

  
