/**
 * 회문 문자열 (대소구분 X) 체크
 */
function checkStr(str) {
  str = str.toLowerCase();

  return str.split('').reverse().join('') === str ? 'YES' : 'NO';
}

console.log(checkStr('gooG'))