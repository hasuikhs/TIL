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

    - 즉, 도달할수 없어짐(GC 대상이 됨)
    
    ```javascript
    let john = { name: 'John' };
    
    let weakMap = new WeakMap();
    weakMap.set(john, '..');
    
    console.log(weakMap.get(john)); // '...'
    john = null; // 참조를 덮어 씌면 weakMap의 john의 키었던 것에 도달 불가능해짐
    
    console.log(weakMap.get({ name: 'john' })); // undefined
    ```
    

## 2. WeakSet

- `WeakSet`은 `Set`과 유사하지만, 객체만 저장 가능하다는 점이 다름
- `Set` 안의 객체는 도달 가능할 때만 메모리에서 유지