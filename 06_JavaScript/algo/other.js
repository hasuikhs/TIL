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

console.log(chkFiniteDecimal(7, 20));
console.log(chkFiniteDecimal(11, 22));
console.log(chkFiniteDecimal(12, 21));