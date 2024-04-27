# `Object.is`

- JavaScript에서 제공하는 비교 연산은 기본적으로 `==`, `===` 이 있지만, ES6에서 추가된 `Object.is` 와 총 3가지가 존재

- `Object.is`는 엣지케이스에서 `===` 보다 정확한 비교가 가능

- 일반적인 비교보다 더 정확한 결과가 필요한 경우에 사용 가능
- 그러나, 대부분의 일상적인 비교에서는 `===` 연산자가 더 적합하고 성능상의 이점이 있으므로, `Object.is`의 사용은 그 특수한 특성이 필요한 경우에 한정되어야 함

### 1. `NaN`
- `NaN`과 `NaN`의 비교에서 JavaScript에서는 `false`를 반환
- `Object.is`는 `NaN`이 다른 `NaN`과 같다고 간주하고 `true`를 반환

```javascript
console.log(NaN === NaN);         // false
console.log(Object.is(NaN, NaN)); // true
```

### 2. `+0`, `-0`
- `+0`과 `-0`은 `===` 연산자를 사용할 때 `true`를 반환
- `Object.is`는 `+0`과 `-0`을 명확히 구분하여 `false`를 반환

```javascript
console.log(+0 === -0);         // true
console.log(Object.is(+0, -0)); // false
```

### 3. 기타
- 위에 언급된 두가지 경우를 제외하고는 `===`와 같은 결과값을 반환
