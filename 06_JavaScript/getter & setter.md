# getter & setter

- JavaScript에서 객체의 프로퍼티는 두 종류로 나뉨
  - 데이터 프로퍼티
  - 접근자 프로퍼티(get, set)
    - 접근자 프로퍼티는 함수
    - 이 함수는 값을 get하거나 set하는 역할을 함
    - **장점**
      - **계산 미루기**: getter는 프로퍼티에 접근하기 전까지 그 값을 계산하지 않음 
      - **캐싱**: getter가 호출될 때 처음 계산되며 캐싱됨, 이후에 다시 계산하지 않고 캐시값 반환
  
- **getter와 setter**

  - 접근자 프로퍼티는 getter와 setter 메서드로 표현

  ```javascript
  let obj = {
      get propName() {
          // getter, obj.propName을 실행할 때 실행되는 코드
      },
      set propName(value) {
          // setter, obj.propName = value를 실행할 때 실행되는 코드
      }
  };
  ```

- **외부 코드에서는 일반적인 프로퍼티처럼 보임**

  ```javascript
  let user = {
    name: 'John',
    surname: 'Smith',
  
    get fullName() {
      return `${this.name} ${this.surname}`;
    },
  
    set fullName(value) {
      [this.name, this.surname] = value.split(' ');
    },
  
    get reverseName() {
      return `${this.surname} ${this.name}`;
    }
  }
  
  console.log(Object.keys(user));	// [ 'name', 'surname', 'fullName', 'reverseName' ]
  ```

- 객체가 이미 존재한다면, `defineProperty` 메서드로 getter

  ```javascript
  let user = {
    name: 'John',
    surname: 'Smith'
  };
  
  Object.defineProperty(user, 'fullName', {
    get() {
      return `${this.name} ${this.surname}`;
    },
      
    set() {
      [this.name, this.surname] = value.split(' ');
    }
  });
  ```

  