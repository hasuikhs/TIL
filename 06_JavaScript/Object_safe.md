# Obejct safe

- `Object.freeze()`, `Object.seal()`, `Object.preventExtensions()`은 모두 자바스크립트 객체의 속성 변경을 제한하는 데 사용
- 각 메서드는 객체에 대한 수정 가능성을 다르게 제한

## 1. `Object.freeze()`

- 객체를 완전히 얼려서 변경할 수 없게 함

- 세부 사항
  - 속성 추가/삭제 불가능
  - 속성 값 변경 불가능
  - 속성의 속성 기술자(예: writable, configurable) 변경 불가능

```javascript
const frozenObject = Object.freeze({ name: "Alice", age: 30 });

// 속성 변경 시도
frozenObject.age = 25; // 무시됨

// 속성 추가 시도
frozenObject.city = "New York"; // 무시됨

// 속성 삭제 시도
delete frozenObject.name; // 무시됨

console.log(frozenObject); // { name: "Alice", age: 30 }
```

#### `Object.isFrozen()`

- 객체 `Object.freeze()`로 얼려져서 변경 불가능한 상태인지 확인

```javascript
const frozen = Object.freeze({ name: "Alice", age: 30 });
const notFrozen = { name: "Bob", age: 25 };

console.log(Object.isFrozen(frozen));     // true
console.log(Object.isFrozen(notFrozen));  // false
```

## 2. `Object.seal()`

- 객체를 밀봉하여, 기존 속성의 값만 변경 가능

- 세부 사항
  - 속성 추가/삭제 불가능
  - 기존 속성 값 변경 가능
  - 속성의 속성 기술자 중 configurable은 모두 false로 설정됨

```javascript
const sealedObject = Object.seal({ name: "Bob", age: 25 });

// 속성 값 변경 가능
sealedObject.age = 30; // 변경됨

// 속성 추가 시도
sealedObject.city = "Los Angeles"; // 무시됨

// 속성 삭제 시도
delete sealedObject.name; // 무시됨

console.log(sealedObject); // { name: "Bob", age: 30 }
```

#### `Object.isSealed()`

- 객체가 `Object.seal()`로 밀봉되어 있는지 확인

```javascript
const sealed = Object.seal({ name: "Bob", age: 25 });
const notSealed = { name: "Charlie", age: 35 };

console.log(Object.isSealed(sealed));     // true
console.log(Object.isSealed(notSealed));  // false
```

## 3. `Object.preventExtensions()`

- 객체의 확장을 막아서, 새로운 속성을 추가 불가능
- 세부 사항
  - 속성 추가 불가능
  - 기존 속성 삭제 가능
  - 기존 속성 값 변경 가능

```javascript
const nonExtensibleObject = Object.preventExtensions({ name: "Charlie", age: 35 });

// 기존 속성 값 변경 가능
nonExtensibleObject.age = 40; // 변경됨

// 속성 추가 시도
nonExtensibleObject.city = "Chicago"; // 무시됨

// 속성 삭제 가능
delete nonExtensibleObject.name; // 삭제됨

console.log(nonExtensibleObject); // { age: 40 }
```

#### `Object.isExtensible()`

- 객체가 확장 가능한지 여부 확인

```javascript
const extensible = { name: "Dave", age: 40 };
const nonExtensible = Object.preventExtensions({ name: "Charlie", age: 35 });

console.log(Object.isExtensible(extensible));     // true
console.log(Object.isExtensible(nonExtensible));  // false
```