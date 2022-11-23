// 재귀함수를 사용하면 함수의 호출이 스택에 쌓이게 되고, 위에서부터 차례대로 값을 반환하기 전에는 메모리를 계속 차지
// 그렇기에 호출 스택이 커지면 메모리를 많이 사용 가능하므로, 재귀보다는 반복문을 사용했을때 성능이 더 좋음, 상황에 따라 골라야 함

// 최대 공약수
// 유클리드 호제법
// a, b (a > b) a를 b로 나눈 나머지가 r일때 GCD(a, b) = GCD(b, r)를 반복하고 r이 0이면 그때 b가 최대공약수
function GCD(a, b) {
  return b === 0 ? a : GCD(b, a % b);
}

// 최소 공배수
function LCD(a, b) {
  return a * b / GCD(a, b);
}

// 팩토리얼
function factorial(n) {
  // 팩토리얼이 30만 넘어가도 숫자 범위를 넘으므로 n을 붙여 BigInt형으로 변경
  let result = 1n;

  for (let i = 2n; i <= n; i++) result *= i;

  return result;
  // return n === 1 ? 1 : n * factorial(n - 1);
}

module.exports = {
  GCD: GCD,
  LCD: LCD
};