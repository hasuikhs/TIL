# this_keyword

> https://yuddomack.tistory.com/entry/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-this%EC%9D%98-4%EA%B0%80%EC%A7%80-%EB%8F%99%EC%9E%91-%EB%B0%A9%EC%8B%9D

- `this` 의 값은 `this`를 사용하는 해당 함수를 어떻게 실행하느냐에 따라 다름

```javascript
var name = 'foo';

function log() {
    console.log(this.name);
}

var obj = {
    name : 'bar',
    logName : log
};

log();			// 'foo'
obj.logName();	// 'bar' 
```

- 일반적으로 그냥 함수를 호출한다면 글로벌 값을 가져옴
- 앞에 객체가 있다면 해당 객체가 가지고 있는 값을 가져옴

```javascript
var age = 100;

function foo () {
  var age = 99;
  bar();
}

function bar() {
  console.log(this.age);
}

foo();		// 100 출력 foo() 함수를 살펴보면 bar() 함수가 그냥 실행
```

