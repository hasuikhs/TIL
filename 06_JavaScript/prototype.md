# Prototype

## 1. Prototype 기반 언어?

- JavaScript 는 **Prototype 기반 언어**라고 불림

- **프로토타입 객체(Prototype Object)**

  - 모든 객체들이 메소드와 속성들을 상속 받기 위한 템플릿
  
- **프로토타입 체인(Prototype Chain)**

  - 프로토타입 객체도 또 다시 상위 프로토타입 객체로부터 메소드와 속성을 받을 수 있고 그 상위도 같음
  - 이를 프로토타입 체인이라 부르며 다른 객체에 정의된 메소드와 속성을 한 객체에서 사용 가능토록 하는 근간

- JavaScript에서는 프로토타입 체인으로 인해 연결을 따라 프로토타입 체인을 타고 올라가며 속성과 메소드를 탐색

  - 즉, 해당 상속한 객체의 부모의 부모의 부모의... 속성 탐색

  ```javascript
  function Person(name, age, gender) {
      if (!(this instanceof Person)) {
          return new Person(name, age, gender);
      }
      
      this.name	= name;
      this.age	= age;
      this.gender = gender;
  }
  
  var person1 = Person('kim', '30', 'male');
  
  // person1.name, person1.age, person1.gender Person 객체 접근 가능
  // 더 상위 객체인 Object에 정의된 속성도 접근 가능
  // hasOwnProperty, isPrototypeOf, valueOf 함수 등 Person.prototype으로 사용 가능한 속성 확인
  
  Person.prototype.isPrototypeOf(person1); // true
  Object.prototype.isPrototypeOf(person1); // true
  ```

  

