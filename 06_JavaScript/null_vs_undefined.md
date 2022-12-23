# `null` vs `undefined`
## 1. null
- 변수를 선언하고 빈 값을 할당한 상태
- `null`은 원시 자료형(Primitive Type) 중 하나로, **값이 의도적으로 비어있음**을 표현
- `undefined`는 값이 지정되지 않은 경우지만, `null`은 해당 변수가 어떤 객체도 가리키고 있지 않다는 것을 의미
- `typeof` 확인 시 `object`
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