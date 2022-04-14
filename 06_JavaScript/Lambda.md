# Lambda(화살표 함수) 주의점

- 화살표 함수는 단순히 함수를 **짧게** 쓰기 위한 용도로 사용되지 않음

- 일반 함수와 람다식 함수

  ```javascript
  // 일반 함수
  var normalfunc = function(x) {
      console.log(x);
  }
  
  // 람다식 함수
  var lamdafunc = (x) => {
      console.log(x);
  }
  ```

- **this 값 사용 차이**

  - 화살표 함수에는 **this**가 없음

  - 화살표 함수에서 this를 접근하면 외부에서 값을 가져옴
  
  - 일반 함수 사용시
  
    ```javascript
    var param = 'global param';
    
    function printParam() {
        console.log(this.param);
    }
    
    let object = {
        param: 'object param',
        func: printParam
    }
    
    let object2 = {
        param: 'object2 param',
        func: printParam
    }
    
    object.func();
    object2.func();
    ```
  
    ```
    object param
    object2 param
    ```
  
    - this 값은 함수를 호출한 곳에서 지정한 값을 출력
    - 함수를 선언한 시점에서 this의 값이 정해지지 않음
  
  - 람다식 함수 사용시
  
    ```javascript
    var param = 'global param';
    
    const printParam = () => {
        console.log(this.param);
    }
    
    let object = {
        param: 'object param',
        func: printParam
    }
    
    let object2 = {
        param: 'object2 param',
        func: printParam
    }
    
    object.func();
    object2.func();
    ```
  
    ```
    global param
    global param
    ```
  
    - 람다식 함수는 선언한 시점에서 this를 확보
    - **자바스크립트에서 람다식 함수는 선언 시 this를 고정하는 기능을 가짐**
  
- **prototype**

  - 화살표 함수는 `prototype`이 존재하지 않음
  - 화살표 함수로 선언된 함수를 `new`와 함께 호출하더라도, `prototype` 객체가 없기 때무에 자신의 인스턴스 객체가 만들어지지 않음

- **arguments**

  - 화살표 함수는 `arguments` 프로퍼티를 생성하지 않음
  - 화살표 함수 내부에서 `arguments`가 참조된다면 ReferenceError가 발생하거나, 상위 context가 있따면 scope 상의 arguments를 참조

  ```javascript
  function func() {
    console.log(arguments); // Arguments(3) [1, 2, 3, callee: ƒ, Symbol(Symbol.iterator): ƒ]
  }
  
  fun(1, 2, 3);
  ```

  ```javascript
  const func = () => {
    console.log(arguments); // Uncaught ReferenceError: arguments is not defined
  };
  
  fun(1, 2, 3);
  ```

  