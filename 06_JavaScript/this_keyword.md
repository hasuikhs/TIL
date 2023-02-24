# this_keyword

- `this` 의 값은 `this`를 사용하는 해당 함수를 어떻게 실행(호출)하느냐에 따라 다름

```javascript
// 1
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

// 2
var name = "foo";

var obj = {
    logName: function() {
        console.log(this.name);
    },
    name: "bar"
};

var log = obj.logName;

log();          // 'foo'
obj.logName();  // 'bar'
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

- 화살표 함수의 경우

```javascript
var name = "foo";

var obj = {
    logName:  () => {
        console.log(this.name);
    },
    name: "bar"
};

var log = obj.logName;

log();          // 'foo'
obj.logName();  // 'foo'
```

