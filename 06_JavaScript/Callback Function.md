# Callback Function

- 파라미터로 함수를 전달받아, 함수의 내부에서 실행하는 함수

  ```javascript
  let arr1 = [
      {
          no: 1,
          param: 'test1'
      },
      {
          no: 2,
          param: 'test2'
      }
  ];
  
  var arr2 = arr1.filter(item => item['no'] == 1); // arr2 = [{'no': 1, 'param': 'test1'}]
  ```

### 1. 사용 방법

- 콜백함수는 함수의 내부에서 실행되기 때문에 이름을 붙이지 않아도 됨

- 함수의 이름만 넘기기

  ```javascript
  function func1(param1, callback) {
      console.log('param1:', param1);
      callback();
  }
  
  function func2() {
      console.log('func2 init');
  }
  
  func1('test', func2);
  
  // param1: test
  // func2 init
  ```

  - Javascript는 `null`과 `undefined` 타입을 제외하고 모든 것을 객체로 다룸
  - 그렇기 때문에 함수를 변수처럼 사용 가능 즉, 다른 언어에서처럼 `()`를 붙일 필요 없음
  
- 비동기 코드 순서 맞추기

  ```javascript
  function f1(callback) {
      setTimeout(function() {
          console.log('A');
          callback();
      }, Math.random() * 1000);
  }
  function f2(callback) {
      setTimeout(function() {
          console.log('B');
          callback();
      }, Math.random() * 1000);
  }
  function f3(callback) {
      setTimeout(function() {
          console.log('C');
          callback();
      }, Math.random() * 1000);
  }
  function f4() {
      setTimeout(function() {
          console.log('D');
      }, Math.random() * 1000);
  }
  
  f1(function() {
      f2(function() {
          f3(function() {
              f4();
          });
      });
  });
  ```

  - 이를 콜백 지옥이라 한다...
  - 콜백 지옥을 해결하기 위해서는 `Promise`, `Generator`, `async/await`를 사용해서 해결

### 2. 주의점

- this를 사용한 콜백함수

  ```javascript
  let testObj = {
      no: 1,
      result: 'default',
      calResult: function(param1, param2) {
          this['result'] = param1 + param2;
      }
  }
  
  function getResult(param1, param2, callback) {
      callback(param1, param2)
  }
  
  getResult(1, 2, testObj.calResult);
  
  console.log(testObj['result']); // default
  ```

  - 기대하는 결과는 3이 나오길 기대했지만, `default`출력됨
  - 이것은 `calResult()` 함수가 실행되기 전의 `result` 값이 나오는데, 이것은 `getResult()`가 전역 함수이기 때문
  - 따라서 `this`를 보호 가능하도록 콜백함수를 만들어야 함

  #### :exclamation:`call()`과 `apply()`를 사용하여 `this`를 보호하도록 하자

  - `call()` : 첫 번째 인자로 `this `를 사용하고, 나머지 인자들은 `,`로 구분하여 입력

    ```javascript
    // 위의 코드에서 전역 함수인 getResult 변경
    function getResult(param1, param2, callback, obj) {
        callback.call(obj, param1, param2)
    }
    
    getResult(1, 2, testObj.calResult, testObj);
    
    console.log(testObj['result']);	// 3
    ```

  - `apply()`: 첫 번째 인자로 `this`를 사용하고, 나머지 인자들은 배열형태로 입력

    ```javascript
    function getResult(param1, param2, callback, obj) {
        callback.apply(obj, [param1, param2])
    }
    
    getResult(1, 2, testObj.calResult, testObj);
    
    console.log(testObj['result']);	// 3
    ```

  

