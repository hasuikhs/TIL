# WeakMap & WeakSet

## 1. WeakMap

- `Map` 과 `WeakMap`의 차이는 `WeakMap`의 키가 반드시 객체여야 함

  ```javascript
  let weakMap = new WeakMap();
  
  let obj = {};
  
  weakMap.set(obj, 'ok'); // ok
  
  weakMap.set('test', 'no'); // error
  ```

  - `weakMap`의 키로 사용된 객체를 참조하는 것이 아무것도 없으면 해당 객체는 메모리와 `WeakMap`에서 자동 삭제

    ```javascript
    let john = { name: 'John' };
    
    let weakMap = new WeakMap();
    weakMap.set(john, '..');
    
    john = null; // 참조를 덮어 씌면 weakMap은 비워짐
    ```

    