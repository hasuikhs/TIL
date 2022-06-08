# Babel & Webpack

## 1. Babel

- **Babel**은 JavaScript 컴파일러
  - ECMA 2015+ 코드를 최신, 옛날 브라우저와 같은 환경에서 호환되는 버전으로 변환하는데 주로 사용되는 도구

- JavaScript로 결과물을 만들어주는 트랜스파일러라고도 함
- ESNext 문법을 지원하지 않는 환경에서도 최신 문법을 사용 가능하게 해줌
  - 일부 최신 브라우저에서만 동작하는 기능을 옛날 브라우저에서 구현해야할 경우, 기능을 단순화하거나, 생략해야 함
  - 즉, 크로스 브라우징(Cross Browsing) 문제가 발생하여, 코드의 일관성을 망가트리고 혼란스럽게 함

- 리액트에서는 JSX 문법으로 작성된 코드를 `createElement` 함수를 호출하는 코드로 변환해줌
- Babel만을 사용한다고 최신 함수를 사용할 수 있는건 아님
  - **pollyfill**을 추가하여 프로그램이 처음에 시작될 때 지원하지 않는 **기능**(Promise, Map, Set 등)들을 추가
  - 즉, Babel은 컴파일시 실행되고 pollyfill은 런타임에 실행

- **바벨 빌드 순서**
  - 파싱(Parsing)
    - 코드를 읽고 추상 구문 트리(Abstract Syntax Tree: AST)로 변환하는 단계
  - 변환(Transforming)
    - 추상 구문 트리를 변경
    - 변환은 바벨이 아닌 바벨 플러그인(plugin)이 진행
    - **바벨 플러그인**은 바벨이 어떤 코드를 어떻게 변환할 지에 대한 규칙을 나타냄
  - 출력(Printing)
    - 변경된 결과물을 출력

## 2. Webpack

- JavaScript 코드가 많아지면서, 하나의 파일로 관리하는데 한계가 있음
  - 그렇다고 여러개 파일을 브라우저에서 로딩하는 것은 그만큼 네트워크 비용을 치뤄야야 하는 단점 존재
  - 뿐만 아니라 각 파일은 서로의 스코프를 침범하지 않아야 하지만 잘 못 작성할 경우 변수 충돌 위험성도 존재
  - 그래서 코드의 유지 보수가 쉽도록 코드를 모듈로 나누어 관리하는 모듈 시스템이 필요해짐
  - 이런 한계를 극복하려 여러 가지 도구를 활용하는데 그 도구 가운데 하나가 **Webpack**
- **Webpack**은 JavaScript로 만든 프로그램을 배포하기 좋은 형태로 묶어주는 도구
- ESM(ES6 모듈)과 commonJS를 모두 지원

### 2.1 설치

```bash
$ npm i -D webpack webpack-cli
```

### 2.2 `webpack.config.js`

```javascript
const path = require('path');

module.exports = {
    mode: 'development',
    entry: {
        main: './src/app.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve('./dist')
    }
}
```

- `webpack.config.js`는 모던 JS 파일이 아니라서, import를 쓸 수 없음

- `package.json` 의 script에 build 명령어로 webpack을 추가 `npm run build`를 실행 output에 설정된 이름으로 결과물 생성

  ```bash
  $ npm run build
  
  # 또는
  
  $ webpack
  ```

- Webpack은 주요 네 가지 개념으로 정리 가능

  - **엔트리(Entry)**

    ```javascript
    // 시작점이 src/app.js
    entry: {
        main: './src/app.js'
    }
    ```

    - Webpack에서 모든 것은 모듈, JS, CSS, img 등 모든 것을 JS 모듈로 로딩해서 사용
    - Js가 로딩하는 모듈이 많아질수록 모듈간의 의존성은 증가
    - 의존성 그래프의 시작점을 Webpack에서는 엔트리라고 함
    - 엔트리를 통해서 필요한 모듈을 로딩하고 하나의 파일로 묶음

  - **아웃풋(Output)**

    ```javascript
    // dist 폴더의 [name].js 파일로 결과를 저장
    output: {
        filename: '[name].js',
        path: path.resolve('./dist')
    }
    ```

    - 엔트리에서 설정한 JS 파일을 시작으로 의존되어 있는 모든 모듈을 하나로 묶고 결과물은 output에 기록

  - 로더

  - 플러그인

  