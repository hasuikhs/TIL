# 단축 평가 논리 계산법

- 기본적으로 논리 연산자는 다음과 같이 작용

  ```javascript
  true && true	// true
  true && false	// false
  true || false	// true
  false || true	// true
  ```

- 논리곱(&&)과 논리합(||) 연산자는 논리 연산의 결과를 결정하는 피연산자를 타입 변환하지 않고 대로 반환하는데, 이를 단축 평가

- **단축 평가는 표현식을 평가하는 도중에 평가 결과가 확정된 경우 나머지 평가 과정을 생략하는 것을 말함**

  ```javascript
  true || anything	// true
  false || anything	// anything
  true && anything	// anything
  false && anything	// false
  ```

- 어떤 조건이 true일 때 반환해야하는 무언가를 해야한다면 논리곱(&&) 연산자 표현식으로 if문 대체 가능

  ```javascript
  var done = true;
  var message = '';
  
  message = done && '완료';
  console.log(message);	// 완료
  ```

- 어떤 조건이 false일 때 반환해야하는 무언가를 해야한다면 논리합(||) 연산자 표현식으로 if문 대체 가능

  - false 종류(`false`, `undefined`, `null`, `0`, `-0`, `NaN`, `''`)

  ```javascript
  var done = false;
  var message = '';
  
  message = done || '미완료';
  console.log(message);	// 미완료
  ```

- 단축 평가가 유용하게 사용되는 경우

  - 객체 속성에 접근할 때 객체가 존재하는지를 확인하고 프로퍼티를 접근할 때

    ```javascript
    var elem = null;
    var value = elem.value;	// TypeError
    ```

    ```javascript
    var elem = null;
    var value = elem && elem.value;	// null
    ```

  - 함수 매개변수에 기본값을 설정할 때

    ```javascript
    function test(str) {
        str = str || '';
        return str.length;
    }
    
    // ES6+
    function test(str = '') {
        return str.length;
    }
    ```

    

