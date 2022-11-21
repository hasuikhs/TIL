// 최대 공약수
// 유클리드 호제법
// a, b (a > b) a를 b로 나눈 나머지가 r일때 GCD(a, b) = GCD(b, r)를 반복하고 r이 0이면 그때 b가 최대공약수
function getGCD(a, b) {
  return b === 0 ? a : getGCD(b, a % b)
}

// 최소 공배수
function getLCD(a, b) {
  return a * b / getGCD(a, b);
}

// 팩토리얼
function factorial(n) {
  let result = 1n;

  for (let i = 2n; i <= n; i++) result *= i;

  return result;
  // return n === 1 ? 1 : n * factorial(n - 1);
}

console.log(factorial(25))