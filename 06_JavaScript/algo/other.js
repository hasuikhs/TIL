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

// 지뢰 안전지대
// 1(지뢰) 기준으로 8방향이 위험지대
function getSafetyZoneCnt(board) {
  const len = board[0].length;
  let answer = 0;
  let dc = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 0], [0, 1], [1, -1], [1, 0], [1, 1]];

  for (let i = 0; i < len; i++) {
      for (let j = 0; j < len; j++) {
          let safety = true;

          for (let x of dc) {
              const dy = i + x[0];
              const dx = j + x[1];
              
              if (dy >= 0 && dy <= len - 1 && dx >= 0 && dx <= len - 1) {
                  if (board[dy][dx] === 1) {
                      safety = false;
                      break;
                  }
              }
          }

          if (safety) answer++;
      }
  }

  return answer;
}

// 점을 잇는 선들이 평행한지 확인
function isParallel(dots) {
  let tmpArr = [];

  for (let i = 0, len = dots.length; i < len; i++) {
      for (let j = i + 1; j < len; j++) {
          let gradient = Math.abs(dots[i][1] - dots[j][1]) / Math.abs(dots[i][0] - dots[j][0]);

          if (i === 0) {
              tmpArr.push(gradient);
          } else {
              if (tmpArr.includes(gradient)) return 1;
          }
      }
  }

  return 0;
}

/**
 * 현재 좌표에서 command (ex. GRGRGRB)가 입력되면 최종 위치를 반환
 * @param {*} command 
 * @returns 현재 좌표
 */
function getLocation(command) {
  let curLocation = [0, 0];
  let curRad = 90;

  const rad = { 'L': -90, 'R': 90 };
  const direction = [[-1, 0], [0, 1], [1, 0], [0, -1]];

  for (let x of command) {
    if (x === 'L' || x === 'R') {
      curRad += rad[x];

      if (curRad < 0) {
        curRad = 270;
      } else if (curRad === 360) {ß
        curRad = 0;
      }
    } else {
      let d = direction[x === 'G' ? curRad / 90 : (curRad / 90 + 2) % 4];

      curLocation = [curLocation[0] + d[0], curLocation[1] + d[1]];
    }
  }

  return curLocation;
}