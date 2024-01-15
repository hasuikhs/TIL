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
  var originArr = [1, 2, 3, 4];
  var copiedArr = originArr;
  
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

      - ES5의 `slice()` 메서드나 ES6의 전개 연산자(`...`)는 배열의 첫 번째 레벨만 복사하며, 이는 중첩된 객체나 배열에는 적용되지 않음

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

- JSON 객체를 이용하는 방법도 존재
  - 단, 이 방법은 내부에 함수가 존재하면 문제가 발생 가능
  - 이는 `JSON.stringify()` 함수가 함수를 serialize하지 않기 때문
    - `JSON.parse(JSON.stringify(object))` 방법은 객체가 함수, `undefined`, 또는 순환 참조를 포함할 경우 부적합
    - 이 방법을 사용할 때, 객체 내부의 함수와 `undefined` 값은 무시되거나 제거
    - 순환 참조가 있는 경우, `JSON.stringify` 함수는 오류를 발생
  - 함수가 있는 객체를 serialize하려고 하면, 함수는 undefined로 반환
  - 그렇기 때문에 함수가 있는 객체를 deep copy하려면 lodash 라이브러리의 `cloneDeep()` 함수를 사용하거나 직접 재귀적으로 복사하는 방식으로 구현해야 함
  
  ```javascript
  const originalObj = { a: 1, b: { c: 2 } };
  const deepCopyObj = JSON.parse(JSON.stringify(originalObj));

  deepCopyObj.b.c = 3;

  console.log(originalObj); // { a: 1, b: { c: 2 } }
  console.log(deepCopyObj); // { a: 1, b: { c: 3 } }
  ```


## 2. Shallow-Copy

- 원래 값과 복사된 값이 같은 참조를 가리키고 있는 복사

- 객체에 변수를 저장하면, 실제 값을 저장하는 것이 아니라 객체의 참조를 저장

- 복사가 이루어지면 서로 다른 변수에 할당되지만, 서로 같은 메모리의 참조를 바라보게 되어 영향을 줄 수 있음
  - 얕은 복사(Shallow-Copy)에서는 복사된 객체의 최상위 프로퍼티들만 새로운 메모리 공간에 할당
  - 내부의 객체(중첩된 객체)나 배열은 원본 객체와 동일한 참조를 공유
  - 내부 객체 또는 배열을 수정할 경우 원본 객체에도 영향을 미칠 수 있다는 것을 의미
  - 따라서 복잡한 객체 구조를 다룰 때는 이러한 특성을 고려해야 함


- shallow copy를 구현하는 방법으로는 위에 언급되었다 시피
  - `Object.assign()` 메소드나 전개 연산자(`...`)를 사용 가능

  ```javascript
  // ex1
  const originalObj = { a: 1, b: { c: 2 } };
  const shallowCopyObj = Object.assign({}, originalObj);

  shallowCopyObj.b.c = 3;

  console.log(originalObj); // { a: 1, b: { c: 3 } }
  console.log(shallowCopyObj); // { a: 1, b: { c: 3 } }
  ```

  ```javascript
  // ex2
  const person = {
    name: 'John',
    age: 30,
    hobbies: ['reading', 'painting']
  };

  const copiedPerson = Object.assign({}, person);

  person.name = 'Jane';
  person.hobbies.push('swimming');

  console.log(person); // { name: "Jane", age: 30, hobbies: ["reading", "painting", "swimming"] }
  console.log(copiedPerson); // { name: "John", age: 30, hobbies: ["reading", "painting", "swimming"] }
  ```