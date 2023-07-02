# debugger

- `debugger` 위치에서 실행을 멈춤
- 브라우저 개발자 도구 창이 열려있을 때만 멈춤
- ES5+ 이상 지원
- 일반 IDE에서 처럼 브라우저를 디버깅 가능하며, breakpoint도 설정할 수 있음
  - breakpoint에서는 코드의 상태를 검사하고 변수의 값을 확인 가능
  - 이를 통해 코드의 실행 흐름을 추적하고 예상치 못한 문제를 파악 가능
- `f11`로 다음 라인으로 이동, breakpoint를 지정하면 `f8`로 다음 breakpoint로 이동함
- 주의할 점
  - 디버깅 목적으로 사용하기 위해 코드에 추가되는 임시 문
  - 실제 프로덕션 코드에 debugger문을 ㄴ마겨두면 실행되는 동안 중단점이 계속 발생하여 원치 않는 동작 유발 가능
  - 디버깅이 완료되면 debugger문을 제거하거나 주석 처리해야 함

```javascript
var test = 'test';

debugger;

console.log(test);
```

