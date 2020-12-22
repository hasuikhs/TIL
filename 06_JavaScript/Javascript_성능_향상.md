# Javascript 성능 향상

>자바스크립트의 기본 요소인 반복문과 조건문, 문자열 연산과 함께 배열과 객체의 생성과 초기화, 문자열 연산, 정규 표현식, 변수 탐색 등을 어떻게 작성하느냐에 따라 자바스크립트의 실행 성능 가능

## 1. 객체의 생성, 초기화 성능

### 1.1 배열의 생성, 초기화 성능 비교

- 배열은 생성자 혹은 리터럴 형식([])을 사용해 객체 생성 가능

  ```javascript
  // 생성자를 사용한 배열 생성
  var arr = new Array();
  
  // 리터럴 형식을 사용한 배열 생성
  var arr = [];
  ```

  - 이 두 방법은 큰 차이는 없으나 리**터럴 형식을 사용한 경우 여러 브라우저에서 좀 더 좋은 성능**을 보여줌

  ![img](Javascript_성능_향상.assets/2307243A592CD80436)

- 배열에 데이터를 할당하는 방법

  ```javascript
  var arr = [];
  
  // 접근자를 이용한 데이터 할당
  for (var i = 0; i < 1000; i++) {
      arr[i] = i;
  }
  
  // push() 메서드를 사용한 데이터 할당
  for (var i = 0; i < 1000; i++) {
      arr.push(i);
  }
  ```

  - push() 메소드를 사용하는 방법보다 **접근자를 사용해 데이터를 할당하는 코드가 2배정도 빠름**

  ![img](Javascript_성능_향상.assets/24728650592CD9222C)

### 1.2 Object 객체의 생성, 초기화 성능 비교

- 객체도 생성자 혹은 리터럴 형식({})을 사용해 객체 생성 가능

  ```javascript
  // 생성자를 사용한 배열 생성
  var arr = new Object();
  
  // 리터럴 형식을 사용한 배열 생성
  var arr = {};
  ```

  - 리터럴 형식이 코드를 줄일 수 있는 방법이기 때문에 코드를 다운로드하는 시간 관점에서 성능에 더 좋음
  - 하지만 **성능 차이가 거의 없는 경우에는 성능보다는 개발과 유지 보수, 가독성까지 고려해서 코드 작성방식을 선택**
  
  ![img](Javascript_성능_향상.assets/2527F844592CDBAE09)

- 객체에 데이터를 할당하는 방법

  ```javascript
  var obj = {};
  
  // . 을 이요한 데이터 삽입
  obj.a = 1;
  obj.b = 2;
  
  // [] 연산자를 이용한 데이터 삽입
  obj['a'] = 1;
  obj['b'] = 2;
  ```

  - 객체의 초기화도 생성과 마찬가지로 어느 방식이 더 성능이 좋다고 판단 불가능
  - **작성하는 코드의 크기와 주요 대상 브라우저 및 코드의 가독성과 유지 보수를 감안해 적절한 방식 선택**

  ![img](Javascript_성능_향상.assets/216AAB47592CDE7A2D)

## 2. 스코프 체인 탐색과 성능

> 인터프리터 언어로서 자바스크립트는 JIT(Just-In-Time) 컴파일러 도입 등 자바스크립트의실행을 최적화하기 위한 여러가지 방법을 도입하고 있지만 개발자가 작성한 코드 자체의 성능이 런타임에도 많은 영향을 미침

### 2.1 스코프 체인 ?

- 자바스크립의 함수를 실행하면서 **어떤 속성(변수, 객체 등)에 접근**해야 할 때, 효율적으로 탐색하도록 속성을 일정한 객체 단위로 분류하고, 각 **객체에 접근하기 위한 객체의 참조를 저장하는 공간**
- **스코프 체인은 활성화 객체와 전역 객체로 구성**

#### 2.1.1 활성화 객체(Activation Object)

- 함수 내부에서만 접근 가능한 함수의 지역변수, `this`, `arguments` 객체
- 함수가 실행되는 동안에만 존재
- 모든 속성을 탐색할 경우 최우선으로 탬색하는 대상 객체가 됨

#### 2.1.2 전역 객체(Global Object)

- 함수 외부에서도 접근 가능한 `windows`, `document`, 전역함수, 전역변수
- 전역 객체는 자바스크립트 동작 시 어디서나 항상 **접근 가능한 데이터를 포함하기에 웹 페이지의 자바스크립트가 동작하는 모든 시간 동안 존재**
- 함수 실행 시 함수의 스코프 체인에서 전역 속성을 탐색하는데 사용

### 2.2 지역변수를 활용한 스코프 체인 탐색 성능 개선

- 첫 번째로 탐색하는 활성화 객체에 찾고자하는 속성이 있는 경우 추가로 발생 가능한 다른 활성화 객체, 전역 객체를 탐색하는 과정을 줄여 성능 향상 도모

- ##### 함수 내에서 전역 스코프 변수에 직접 접근하는 방식

  ```javascript
  window.htmlstring = [];
  
  function makeList() {
      htmlstring.push('<ul>');
      for (var i = 0; i < 100; i++) {
          htmlstring.push('<li>value : ' + i + '</li>');
      }
      htmlstring.push('</ul>');
  }
  makeList();
  ```

  - `makeList()` 함수가 실행되면 함수 내부에서 `htmlstring`, `i` 속성에 접근하기 위해 스코프 체인 탐색
  - `i` 변수는 실행 중인 함수의 지역 변수이므로 처음 탐색하는 활성화 객체에서 탐색 가능하지만, `htmlstring` 객체는 활성화 객체에 먼저 접근해서 탐색하지만 찾지 못하고, 다시 전역 객체를 탐색해야 함

- ##### 함수 지역변수로 참조해 전역 스코프 변수에 접근하는 방식

  ```javascript
  window.htmlstring = [];
  
  function makeList() {
      var htmlstr = htmlstring;
      htmlstr.push('<ul>');
      for (var i = 0; i < 100; i++) {
          htmlstr.push('<li>value : ' + i + '</li>');
      }
      htmlstr.push('</ul>');
  }
  ```

  - `var htmlstr = htmlstring;`이 성능 개선의 핵심
  - 전역 객체에 존재하는 `htmlstring` 속성을 `makeList()` 함수의 지역 변수에 할당하여 활성화 객체에서 바로 찾을 수 있게 한 것
  
- 실제 속도 측정

  ```javascript
  var start = new Date().getTime();
  // console.time('timer')
  for (var i = 0; i < 10000; i++) {
      // code
  }
  var elapsed = new Date().getTime() - start;
  // console.timeEnd('timer')
  ```

  - 위의 코드로 실행 시 기존 2172ms -> 2070ms 로 약 5% 더 빨라진 것을 확인 가능

### 2.3 프로토타입 체인

- 자바스크립트의 모든 객체의 인스턴스는 `new ` 연산자로 생성 가능하며, 생성된 인스턴스 객체는 생성자의 프로토타입(prototype)을 참조

  ```javascript
  var obj = new Object(); // obj - 인스턴스 객체, Object - 생성자 함수
  ```

- 이렇게 생성한 인스턴스 객체는 원본 객체 생성자 함수의 프로토타입 속성에 접근 가능

- **인스턴스 객체가 원본 객체 생성자 함수의 프로토타입 속성을 탐색할 때도 탐색을 위한 프로토타입 체인 생성**

- 프로토타입에 존재하는 속성을 사용할 때 스코프 체인에서와 마찬가지로 지역변수에 담아서 사용한다면 불필요한 탐색 과정을 줄여 성능 향상 가능

## 3. 반복문과 성능

- 자바스크립트의 반복분 for, for-in, while, do-while 구문에도 성능 차이 존재
- 결과적으로 for-in을 제외한 반복문의 성능은 비슷
  - for-in은 인자로 주어진 배열을 배열이 아닌 일반 객체로 취급하며, 반복 시점마다 객체의 모든 속성을 무작위로 탐색하기 때문에 배열 탐색에서 성능이 현저하게 저하
  - **선형적인 색인으로 접근 불가능한 객체의 속성을 탐색하는데만 사용**

- 반복문도 스코프 체인의 탐색 경로를 줄이고 자바스크립트의 성능을 최대화하기 위해 활성화 객체에 복사해 두고 사용

  ```javascript
  var arr = [...];
  for (var i = 0, len = arr.length; i < len; i++) {
      // code
  }
  ```

## 4. 문자열 연산과 성능

### 4.1 문자열 생성 성능

- String 객체 사용

  ```javascript
  var str = new String('String string string');
  ```

- 리터럴 사용

  ```javascript
  var str = 'String string string';
  ```

- 문자열 생성에는 리터럴을 사용하는 것이 좋음

### 4.2 문자열 연산 성능 비교

- `+=` 연산자를 이용한 문자열 병합

  ```javascript
  var str = '';
  for (var i = 0; i < 100; i++) {
      str += 'test';
  }
  ```

  - `+=` 연산자는 두  문자열을 합친 새로운 문자열을 만들고 새로운 메모리 위치에 저장함과 동시에 기존 문자열에 대한 참조를 변경하는 연산을 반복적 실행

- `Array.join()` 메서드를 이용한 문자열 병합

  ```javascript
  var arr = [];
  for (var i = 0; i < 100; i++) {
      arr[i] = 'test';
  }
  arr.join('');
  ```

  - **`Array.join()` 메서드를 사용하여 연산하면 비교적 메모리에 효율적으로 접근 가능한 배열 사용**
  - 배열에 저장된 문자열을 모두 합쳐 하나의 문자열을 생성하고 저장하므로 문자열이 병합될수록 점점 더 큰 문자열을 생성하고 저장해야 하는 **`+=` 연산에 비해 불필요한 문자열 참조 변경과 재생성 작업이 없음**

- **성능 측정 비교**

  ```javascript
  // += 연산
  var start = new Date().getTime();
  var plusStr = ''
  for (var i = 0; i < 1000000; i++) {
      plusStr += 'test'
  }
  var end = new Date().getTime() - start;
  // 1000번 테스트 평균 값 : 63.64 ms
  ```

  ```javascript
  // Array.join
  var start = new Date().getTime();
  var joinArr1 = [];
  for (var i = 0; i < 1000000; i++) {
      joinArr1.push('test');
  }
  joinArr1.join('');
  var end = new Date().getTime() - start;
  // 1000번 테스트 평균 값 : 38.49 ms
  ```

### 4.3 템플릿 리터럴

- 런타임 시점에 일반 자바스크립트 문자열로 처리/변환

- 프론트엔드에서는 HTML을 데이터와 결하배서 DOM을 다시 그려야 하느 일이 빈번

- 템플릿을 좀 더 쉽게 편집하고 작성해야할 필요 존재

- 백틱 (`)을 사용

- **jsp 파일에서는 사용할 수 없음**(EL(Expression Language)와 $ 표현식이 겹치고, jsp 서버에 들어가면 jsp EL로 변환되서 읽지 못함)

  ```javascript
  var a = 1;
  var b = 2;
  
  var ret = `a와 b를 더하면 ${a + b}이다.`;
  ```

  