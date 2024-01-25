# `null` vs `undefined`
## 1. null
- 변수를 선언하고 빈 값을 할당한 상태
- `null`은 원시 자료형(Primitive Type) 중 하나로, **값이 의도적으로 비어있음**을 표현
- `undefined`는 값이 지정되지 않은 경우지만, `null`은 해당 변수가 어떤 객체도 가리키고 있지 않다는 것을 의미
- `typeof` 확인 시 `object`
  - 자바스크립트 초기 설계 결함으로, 실제로는 `null`이 객체가 아니라 원시 타입
  ```javascript
    typeof null // 'object'
  ```
## 2. undefined
- 변수를 선언하고 값을 할당하지 않은 상태
- `undefined`는 원시 자료형(Primitive Type)으로, 선언 후에 값을 할당하지않은 변수나 값이 주어지지 않은 인자에 자동으로 할당
  - 값을 할당하지 않은 변수
  - 메서드와 선언에서 인자가 할당받지 않은 경우
  - 함수가 값을 반환하지 않을 경우
- `typeof` 확인 시 `undefined`
  ```javascript
    typeof undefined // 'undefined'
  ```

### 추가적인 차이점
#### 값의 의도와 사용 시나리오
- `null`은 개발자가 명시적으로 '값이 없음'을 설정할 때 사용
  - `null`을 사용하면 "이 변수는 값이 있을 수 있지만 현재는 없다"라고 명시적으로 표현 가능
- `undefined`는 값이 아직 주어지지 않았음을 나타내는 시스템 수준의 기본값
  - 변수가 선언되었지만 값이 할당되지 않은 경우에 자동으로 `undefined`가 할당
#### 수학 연산과 형변환
- `null`을 수학 연산에 사용하면 0으로 변환되지만, `undefined`를 사용하면 NaN

```javascript
console.log(null + 1); // 1
console.log(undefined + 1); // NaN
```

#### 비교 연산
- `null`과 `undefined`는 `==` (동등 비교)를 사용하여 비교할 때 서로 같다고 하지만, `===` (엄격한 비교)를 사용하면 다름

```javascript
console.log(null == undefined); // true
console.log(null === undefined); // false
```
