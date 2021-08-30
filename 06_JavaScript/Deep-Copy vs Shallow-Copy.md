# Deep-Copy vs Shallow-Copy

- JavaScript에서 값은 원시값과 참조값으로 나뉨
- **원시값은 값을 복사할 때 복사된 값을 다른 메모리에 할당하기 때문에 원래의 값과 복사된 값이 서로에게 영향을 미치지 않음**
- **참조값(Object, Array)은 변수가 객체의 주소를 가리키는 값이기 때문에 복사된 값이 같은 값을 가리켜 영향을 미침**

 ## 1. Deep-Copy

- 원본과의 참조가 완전히 끊어진 복사

- 보통 **기본 자료형(Number, String, Boolean)의 값을 복사할 때 이루어지는 복사**

- 복사가 이루어지면 서로 독립적인 메모리에 변수가 할당되어, 서로 전혀 영향을 주지 못함

- Array와 Object에서 복사는 기본적으로 Shallow-Copy가 됨

  ```javascript
  var oiginArr = [1, 2, 3, 4];
  var copiedArr = OriginArr;
  
  console.log(originArr);	// [1, 2, 3, 4]
  console.log(copiedArr);	// [1, 2, 3, 4]
  
  // 요소 추가
  copiedArr.push(5);
  console.log(copiedArr);	// [1, 2, 3, 4, 5]
  console.log(originArr);	// [1, 2, 3, 4, 5]
  ```

  - 위와 같이 같은 Shallow-Copy가 일어나므로 Array와 Object 복사는 주의가 필요함

  - ES5와 ES6 이상에서는 다음과 같이 Deep-Copy가 가능함

    - Array

      ```javascript
      // ES5
      var originArr = [1, 2, 3];
      var copiedArr = originArr.slice();
      copiedArr.push(4);
      
      console.log(originArr);	// [1, 2, 3]
      console.log(copiedArr);	// [1, 2, 3, 4]
      ```

      ```javascript
      // ES6+
      let originArr = [1, 2, 3];
      let copiedArr = [...originArr, 4];	// 복사 후 인자 추가
      
      console.log(originArr);	// [1, 2, 3]
      console.log(copiedArr);	// [1, 2, 3, 4]
      ```

    - Object

      ```javascript
      // ES5
      var originObj = {no1: 1, no2: 2};
      var copiedObj = Object.assign({}, originObj, {no3: 3}); // 복사 후 인자 추가
      
      console.log(originObj);	// {no1: 1, no2: 2}
      console.log(copiedObj);	// {no1: 1, no2: 2, no3: 3}
      ```

      ```javascript
      // ES6+
      let originObj = {no1: 1, no2: 2};
      let copiedObj = {...originObj, ...{no3: 3}};	// 복사 후 인자 추가
      
      console.log(originObj);	// {no1: 1, no2: 2}
      console.log(copiedObj);	// {no1: 1, no2: 2, no3: 3}
      ```

### :warning: 2-depth 이상 Deep-Copy

- 2 depth 이상인 Array와 Object는 위의 방법으로 Deep-Copy가 되지 않음

  ```javascript
  let originArr = [1, [2,3]];
  let copiedArr = [...originArr];
  
  copiedArr[1].push(4);
  console.log(originArr);	// [1, [2, 3, 4]]
  console.log(copiedArr); // [1, [2, 3, 4]]
  ```

  ```javascript
  let originObj = {no1: {no2: 2};
  let copiedObj = {...originObj};
  
  copiedObj['no1']['no2'] = 100;
  console.log(originObj); // {no1: {no2: 100}}
  console.log(copiedObj);	// {no1: {no2: 100}}
  ```

## 2. Shallow-Copy

- 원래 값과 복사된 값이 같은 참조를 가리키고 있는 복사

- 객체에 변수를 저장하면, 실제 값을 저장하는 것이 아니라 객체의 참조를 저장

- 복사가 이루어지면 서로 다른 변수에 할당되지만,  서로 같은 메모리의 참조를 바라보게 되어 영향을 줄 수 있음