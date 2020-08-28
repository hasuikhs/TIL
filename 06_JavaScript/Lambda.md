# Lambda식 주의점

https://trustyoo86.github.io/javascript/2019/08/27/js-optimization.html

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
    
    function printParam = () => {
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