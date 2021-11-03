# Class

## 1. Class 정의

- JavaScript에서 Class는 사실 함수
- class 문법도 class 표현식과 class 선언 두 가지 방법 제공

### 1.1 Class 선언

```javascript
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    
    speakName() {
        console.log(`my name is ${this.name}`);
    }
}
```

### 1.2 Class 표현식

