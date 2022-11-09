// 최대 공약수
// 유클리드 호제법
// a, b (a > b) a를 b로 나눈 나머지가 r일때 GCD(a, b) = GCD(b, r)를 반복하고 r이 0이면 그때 b가 최대공약수
function getGCD(a, b) {
  if (b === 0) return a;
  else return getGCD(b, a % b);
}

// 최소 공배수
function getLCD(a, b) {
  return a * b / getGCD(a, b);
}