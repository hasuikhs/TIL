# Babel & Webpack

## 1. Babel

- **Babel**은 JavaScript 컴파일러
- JavaScript로 결과물을 만들어주는 트랜스파일러라고도 함
- ESNext 문법을 지원하지 않는 환경에서도 최신 문법을 사용 가능하게 해줌
- 리액트에서는 JSX 문법으로 작성된 코드를 `createElement` 함수를 호출하는 코드로 변환해줌
- Babel만을 사용한다고 최신 함수를 사용할 수 있는건 아님
  - **pollyfill**을 추가하여 프로그램이 처음에 시작될 때 지원하지 않는 **기능**(Promise, Map, Set 등)들을 추가
  - 즉, Babel은 컴파일시 실행되고 pollyfill은 런타임에 실행


## 2. Webpack

- **Webpack**은 JavaScript로 만든 프로그램을 배포하기 좋은 형태로 묶어주는 도구

- ESM(ES6 모듈)과 commonJS를 모두 지원

  