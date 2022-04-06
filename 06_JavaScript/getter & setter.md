# getter & setter

- JavaScript에서 객체의 프로퍼티는 두 종류로 나뉨
  - 데이터 프로퍼티
  - 접근자 프로퍼티(get, set)
    - 접근자 프로퍼티는 함수
    - 이 함수는 값을 get하거나 set하는 역할을 함

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

  