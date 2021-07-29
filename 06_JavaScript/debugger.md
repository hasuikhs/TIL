# debugger

- `debugger` 위치에서 실행을 멈춤
- 브라우저 개발자 도구 창이 열려있을 때만 멈춤
- ES5+ 이상 지원
- 일반 IDE에서 처럼 브라우저를 디버깅 가능하며, breakpoint도 설정할 수 있음
- `f11`로 다음 라인으로 이동, breakpoint를 지정하면 `f8`로 다음 breakpoint로 이동함

```javascript
var test = 'test';

debugger;

console.log(test);
```

