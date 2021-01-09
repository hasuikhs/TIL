# Type Coercion(타입 변환)

## 1. 타입 변환?

- JavaScript의 모든 값은 타입이 존재

- 값의 타입은 개발자에 의해 의도적으로 변환 가능할 수 있고, JavaScript  엔진에 의해 암묵적으로 자동 변환 가능

- **개발자의 의도적으로 값이 변환하는 것을 명시적 타입 변환(Explicit Coercion) 또는 타입 캐스팅(Type Casting)**

  ```javascript
  var x = 10;
  
  var str = x.toString();
  ```

- **암묵적으로 타입이 자동 변환하는 것을 암묵적 타입 변환(Implicit Coercion) 또는 타입 강제 변환(Type Coercion)**

  ```javascript
  var x = 10;
  
  var str = x + '';
  ```

- 의도적이든 암묵적이든 타입 변환이 기존의 값을 직접 변경하지는 않음

## 2. 암묵적 타입 변환(Implicit Coercion)

- JavaScript 엔진은 표현식을 평가할 때 문맥, 즉 Context에 고려하여 암묵적 타입 변환을 실행

- 이로 인해서 비교 연산자를 사용할 때 `==` 보다 `===` 을 사용하길 권장

  ```javascript
  10 == '10'	// true
  10 === '10'	// false
  ```

### 2.1 문자열 타입으로 변환

```javascript
// Number
0 + ''			// '0'
NaN + ''		// 'NaN'
Infinity + ''	// 'Infinity'

// Boolean
true + ''		// 'true'
false + ''		// 'false'

// null
null + ''		// 'null'

// undefined
undefined + ''	// 'undefined'
```

### 2.2 숫자 타입으로 변환

```javascript
1 - '1'			// 0
1 * '10'		// 10
1 / 'one'		// NaN
'1' > 0			// true
```

### 2.3 불리언 타입으로 변환

- **JavaScript 엔진은 불리언 타입이 아닌 값을 Truthy 값(참으로 인식할 값) 또는 Falsy 값(거짓으로 인식할 값)으로 구분**

- false로 평가되는 Falsy 값

  - false
  - undefined
  - null
  - 0, -0
  - NaN
  - '' (빈 문자열)

  ```javascript
  if (false) console.log('false');
  if (undefined) console.log('false');
  if (null) console.log('false');
  if (0) console.log('false');
  if (NaN) console.log('false');
  if ('') console.log('false');
  ```

## 3. 명시적 타입 변환(Explicit Coercion)

- 문자열 타입 변환

  ```javascript
  String(1);
  
  (1).toString();
  ```

- 숫자 타입 변환

  ```javascript
  Number('1');
  
  parseInt('1');
  
  parseFloat('1.23');
  ```

- 불리언 타입 변환

  ```javascript
  Boolean('x');
  ```

  