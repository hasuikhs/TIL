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


## 2. 기본 객체 프로토타입

```javascript
var chimp = {
    hasThumbs: true,
    swing: function() {
        return '나무에 매달려';
    }
}
```

- `toString`은 chimp 객체에 없는 함수지만, 실행해도 에러가 나지 않음

- `chimp.toString()`을 호출하면 JS 엔진은 chimp 객체에 해당 함수가 없다는 것을 알고 나서, chimp의 프로토타입인 Object.prototype을 찾아보고 여기에 정의된 `toString` 함수 프로퍼티를 발견하여 반환

- chimp에 `toString` 함수가 있다면, chimp의 프로토타입을 실행하지 않고 곧바로 chimp에서 실행

  ```javascript
  var chimp = {
  	// ...
      toString: function() {
          return '침팬지';
      }
  }
  ```

## 3. 프로토타입 상속

- 프로토타입 상속은 기본 프로토타입을 맞춤형 프로토타입으로 대체할 때 진가가 드러남

- 위의 코드에서 chimp 객체와 더불어 bonobo 객체를 생성한다면,  둘은 같은 유인원이므로 공유하는 프로퍼티가 적지 않음

- 이런 공통 프로퍼티를 ape 객체에 담앚두면 객체마다 프로퍼티를 반복할 필요 없음

- 즉, 두 객체를 ape에 연결해 ape를 **공유 프로토타입(Shared Prototype)**으로 둠

  ```javascript
  var ape = {
      hasThumbs: true,
      hasTail: false,
      swing: function() {
          return '나무에 매달려';
      }
  }
  
  var chimp = Object.create(ape);
  var bonobo = Object.create(ape);
  bonobo.habitat = '중앙 아프리카';
  
  console.log(bonobo.habitat);	// 중앙 아프리카 (bonobo 프로퍼티)
  console.log(bonobo.hasTail);	// false (ape 프로토타입)
  console.log(bonobo.swing());	// 나무에 매달려 (ape 프로토타입)
  ```

  - chimp와 bonobo 모두 ape에서 프로토타입을 물려받음
  - bonobo에 추가된 habitat 프로퍼티는 ape, chimp 그 누구와도 공유하지 않는 고유 프로퍼티
  - ape는 공유 프로퍼티라서 수정하면 chimp와 bonobo 모두에 즉시 영향을 미침

## 4. 프로토타입 체인

- 프로토 타입 체인이라는 다층 프로토타입을 이용하면 여러 계층의 상속 구현 가능

```javascript
var primate = {
    stereoscopicVision: true
};

var ape = Object.create(primate);
ape.hasThumbs = true;
ape.hasTail = false;
ape.swing = function() {
    return '나무에 매달려';
}

var chimp = Object.create(ape);

console.log(chimp.hasTail);	// false (ape 프로토타입)
console.log(chimp.stereoscopicVision);	// true (primate 프로토타입)
```

- chimp의 프로토타입 체인을 따라 ape까지 올라가 결국 primate에서 이 프로퍼티를 발견해 반환
- 만약 프로토타입 체인을 다 뒤져도 없으면 undefined를 반환함

