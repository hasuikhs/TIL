# TypeScript

- JavaScript의 대체 언어의 하나로 ES5의 상위 확장

- ES6의 새로운 기능들을 사용하기 위해 Babel과 같은 별도 Transpiler를 사용하지 않아도 사용 가능

## 1. 장점 

### 1.1 정적 타입

- 기존 JavaScript의 사용자 함수를 만들 때 개발자의 의도와는 다른 데이터 타입이 들어올 경우 방지

- 아래와 같은 타입을 지정해주어 Compile 단계에서 오류를 쉽게 잡을 수 있음

- **명시적인 정적 타입 지정은 개발자의 의도를 명확하게 코드로 기술 가능하여, 코드의 가독성을 높이고 디버깅을 용이하게 함**

  ```javascript
  // JavaScript
  function sum(a, b) {
      return a+ b;
  }
  
  sum('x', 'y');	// 'xy'
  ```

  ```typescript
  // TypeScript
  function sum(a: number, b:number) {
      return a + b;
  }
  
  sum('x', 'y');	// error
  ```

### 1.2 도구의 지원

- IDE를 포함한 다양한 도구의 지원을 받을 수 있음
- IDE 등에 타입 정보를 제공함으로써 높은 수준의 IntelliSense, 코드 어시스트, 타입 체크, 리팩토링 등을 지원 받을 수 있음

### 1.3 강력한 OOP 지원

- Interface, Generic 등과 같은 강력한 OOP 지원은 크고 복잡한 프로젝트의 코드 기반을 쉽게 구성 가능
- OOP에 익숙한 개발자가  JavaScript 프로젝트를 수행하는데 진입 장벽을 낮출 수 있음

### 1.4 ES6+ 지원

## 2. 시작하기

### 2.1 TypeScript 설치

```bash
$ npm install -g typescript
```

### 2.2 실행

- `Hello Word!`  출력

  ```typescript
  // helloworld.ts
  console.log('Hello World!');
  ```

- TypeScript를 JavaScript로 컴파일 하려면

  - **브라우저는 TypeScript를 지원하지 않으므로, TypeScript로 작성된 소스 코드는 지원되는 JavaScript로 재작성 필요**

  ```bash
  $ tsc helloworld.ts		# Generates file helloworld.js
  ```

- 실행은 `node` 명령어 사용

  ```bash
  $ node helloworld.ts
  ```

  

