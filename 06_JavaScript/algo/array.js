/**
 * 각 행의 합, 열의 합, 대각선의 합 중 최대값을 구하기
 * @param A : 2중 배열
 * @returns 최대값
 */
function getMaxSum(A) {
  let answer = Number.MIN_SAFE_INTEGER;
  let rowSum = 0, colSum = 0, lDiagSum = 0, rDiagSum = 0;

  for (let i = 0, len = A.length; i < len; i++) {
    lDiagSum += A[i][i];
    rDiagSum += A[i][len - i - 1];

    for (let j = 0; j < len ; j++ ) {
      rowSum += A[i][j];
      colSum += A[j][i];
    }

    answer = Math.max(answer, rowSum, colSum);

    rowSum = colSum = 0;
  }

  return Math.max(answer, lDiagSum, rDiagSum);
}

console.log(getMaxSum([
  [10, 13, 10, 12, 15],
  [12, 39, 30, 23, 11],
  [11, 25, 50, 53, 15],
  [19, 27, 29, 37, 27],
  [19, 13, 30, 13, 19]
]));

/**
 * 주어진 배열의 점수를 등수 배열로 변환
 * @param {*} A 배열
 */
function getRankArr(A) {
  let answer = Array.from({length: A.length}, () => 1);

  for (let i = 0, len = A.length; i < len; i++) {
    for (let j = 0; j < len; j++) {
      if (A[j] > A[i]) answer[i]++;
    }
  }

  return answer;
}

console.log(getRankArr([87, 89, 92, 100, 76]));

/**
 * 4방향만 보는 봉우리
 * @param {*}
 */
function getMntTop(A) {
  let answer = 0;
  let dx = [-1, 0 , 1, 0];
  let dy = [0, 1, 0, -1];

  for (let i = 0, len = A.length; i < len; i++) {
    for (let j = 0; j < len; j++ ) {
      let flag = true;

      // 4방향 보기
      for (let k = 0; k < 4; k++) {
        let nx = i + dx[k];
        let ny = j + dy[k];

        if (nx >= 0 && nx < len && ny >= 0 && ny < len && A[nx][ny] >= A[i][j]) {
          flag = false;
          break;
        }
      }

      if (flag) answer++;
    }
  }

  return answer;
}

console.log(getMntTop([
  [5, 3, 7, 2, 3],
  [3, 7, 1, 6, 1],
  [7, 2, 5, 3, 4],
  [4, 3, 6, 4, 1],
  [8, 7, 3, 5, 2]
]));