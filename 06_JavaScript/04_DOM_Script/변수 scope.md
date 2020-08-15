# Javascript 변수 scope

## 1. 함수 단위의 변수 관리

```javascript
var a = 1;

function f() {
    var c = 2;
    
    return c;
}
```

- Javascript는 다른 일반 언어처럼 중괄호가 아닌 함수 단위로 변수 관리
- var 없이 변수를 정의하면 파싱 단계가 아니라 런탕미에 전역 변수 scope에 정의
  - 코드가 복잡해지거나 독립적으로 재사용하기 위한 목적으로 라이브러리를 만드는 경우 코드가 정상적으로 실행되지 않는 잠재적 버그가 되므로 위험

