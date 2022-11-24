const ba = require('./basic.js')

// 유한 소수 판별
// 유한 소수는 기약분수로 나타내었을 때, 분모의 소인수가 2와 5만 존재
function chkFiniteDecimal(a, b) {
  let answer = 1;
  b /= ba.GCD(a, b);

  while(b % 2 === 0) b /= 2;
  while(b % 5 === 0) b /= 5;

  return b === 1 ? 1 : 2;

  // let n = 2;
  // while (n <= b) {
  //   while (b % n === 0) {
  //     b /= n;

  //     if (![2, 5].includes(n)) {
  //       answer = 2;
  //       break;
  //     }
  //   }

  //   if (answer === 2) break;
  //   n++;
  // }

  // return answer;
}

// 문자열 밀어서 A와 B가 같아지는 밀기 횟수, 안된다면 -1 반환
function chkSameStr(A, B) {
  A = A.split('');
  B = B.split('');

  let answer = 0;
  while (A.join('') !== B.join('')) {
    A.unshift(A.pop());
    answer++;

    if (answer === A.length) {
      answer = -1;
      break;
    }
  }

  return answer;

  // return (B + B).indexOf(A);
}

// 문자열 수식 배열이 들어왔을 때 해당 값이 올바른지 확인
function calStr(quiz) {
  return quiz.map(v => {
    let s = v.split('=');

    return eval(s[0]) === s[1] * 1 ? 'O' : 'X';
  });
}

// 주어진 숫자 배열과 주어진 숫자와 가까운 순서대로 정렬 같다면 큰 숫자 먼저
function strangeSort(numlist, n) {
  return numlist.sort((a, b) => Math.abs(a - n) - Math.abs(b - n) || b - a);
}