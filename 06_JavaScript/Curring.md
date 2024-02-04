# Curring

- 함수형 프로그래밍에서 자주 사용되는 개념
- 하나의 함수에 여러개 의 인자를 한 번에 전달하는 대신, 각 인자를 하나씩 전달하고 각 단계에서 새로운 함수를 반환하는 방식
- 커링을 통해 생성된 함수들은 부분적으로 적용 가능
  - 모든 인자를 한 번에 전달하지 않고, 일부 인자만 먼저 적용한 후 나머지 인자를 나중에 적용 가능
- **함수의 재사용성과 구성성을 높일 수 있음**
  - 커링을 사용하면 함수의 일부 인자를 고정시킨 새로운 함수 생성 가능

```javascript
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    } else {
      return function(...args2) {
        return curried.apply(this, args.concat(args2));
      };
    }
  };
}
```

```javascript
function sum(a, b, c) {
  return a + b + c;
}

const curriedSum = curry(sum);

console.log(curriedSum(1)(2)(3)); // 6
console.log(curriedSum(1, 2)(3)); // 6
console.log(curriedSum(1)(2, 3)); // 6
```