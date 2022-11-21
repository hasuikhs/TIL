/**
 * 회문 문자열 (대소구분 X) 체크
 */
function checkStr(str) {
  str = str.toLowerCase();

  return str.split('').reverse().join('') === str ? 'YES' : 'NO';
}

console.log(checkStr('gooG'));

/**
 * 주어진 문자열에서 숫자만 뽑아 숫자로 반환
 * @param {*} str 
 * @returns 
 */
function getOnlyNumbers(str) {
  return str.replace(/[^0-9]/g, '') * 1;
}

console.log(getOnlyNumbers('targe02444'));

/**
 * 주어진 문자열과 문자 사이의 최소 거리 배열 출력
 * @param {*} str 
 * @param {*} c 
 */
function getDistance(str, c) {
  let answer = [];
  const arr = str.split(c);

  for (let i = 0, len = arr.length; i < len; i++) {
    const x = arr[i];

    for (let j = 0, le = x.length; j < le; j++) {
      if (arr[i + 1] !== undefined) {
        answer.push(Math.min(j + 1, le - j));
      } else {
        answer.push(j + 1);
      }
    }

    if (i !== len - 1) answer.push(0);
  }

  return answer;

  // let answer = [];
  // let p = 1_000;

  // for (let x of s) {
  //   if (x === t) {
  //     p = 0;
  //     answer.push(p);
  //   } else {
  //     p++;
  //     answer.push(p);
  //   }
  // }

  // p = 1_000;
  // for (let i = s.length - 1; i >= 0; i--) {
  //   if (s[i] === t) {
  //     p = 0;
  //   } else {
  //     p++;
  //     answer[i] = Math.min(answer[i], p);
  //   }
  // }

  // return answer;
}

console.log(getDistance('eteachermode', 'e'));