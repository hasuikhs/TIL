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

```javascript
// babel.config.js
module.exports = {
  presets: [
    ['@babel/preset-env', {
      targets: {
        chrome: '58',
        ie: '11'
      },
      // 폴리필 사용 방식 지정
      useBuiltIns: 'usage',
      // 폴리필 버전 지정
      corejs: {
        version: 3
      }
    }]
  ]
};
```
## 2. Webpack

- JavaScript 코드가 많아지면서, 하나의 파일로 관리하는데 한계가 있음
  - 그렇다고 여러개 파일을 브라우저에서 로딩하는 것은 그만큼 네트워크 비용을 치뤄야야 하는 단점 존재
  - 뿐만 아니라 각 파일은 서로의 스코프를 침범하지 않아야 하지만 잘못 작성할 경우 변수 충돌 위험성도 존재
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
    mode: 'development',	// 운영 환경에서는 production
    entry: {
        main: './src/app.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
      // ...
    },
    plugins: [
      // ...
    ]
}
```

- `webpack.config.js`는 모던 JS 파일이 아니라서, import를 쓸 수 없음

- `package.json` 의 script에 build 명령어로 webpack을 추가 `npm run build`를 실행 output에 설정된 이름으로 결과물 생성

  ```bash
  $ npm run build
  
  # 또는
  
  $ webpack --config webpack.config.js
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
    - JS가 로딩하는 모듈이 많아질수록 모듈간의 의존성은 증가
    - 의존성 그래프의 시작점을 Webpack에서는 엔트리라고 함
      - Webpack이 빌드될 때 최초의 진입점
    - 엔트리를 통해서 필요한 모듈을 로딩하고 하나의 파일로 묶음

  - **아웃풋(Output)**

    ```javascript
    // dist 폴더의 [name].js 파일로 결과를 저장
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    }
    ```

    - 엔트리에서 설정한 JS 파일을 시작으로 의존되어 있는 모든 모듈을 하나로 묶고 결과물은 output에 기록

  - **로더(Loader)**
    - JS 파일이 아닌 애플리케이션의 정적인 요소들을 번들링할 때 사용
    - 여러 타입의 파일을 처리하고, 애플리케이션에서 사용하게 변환하고, 의존성 그래프에 추가

    ```bash
    # css 모듈을 파싱하는 과정에는 적절한 로더가 필요
    $ npm i -D css-loader
    
    # css-loader로 처리하면 JS 코드로만 적용될 뿐 DOM에는 적용되지 않으므로 style-loader를 사용하여 적용시킴
    # 따라서, style-loader를 이용하면 JS로 변경된 스타일시트를 동적으로 DOM에 추가 가능
    $ npm i -D style-loader
    
    # 모던 JS 적용
    $ npm i -D babel-loader @babel/core @babel/preset-env
    ```
  
    ```javascript
    // 로더는 오른쪽에서 왼쪽 순(또는 아래에서 위쪽)으로 적용됨
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /=.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    }
    ```
  
    - Webpack이 웹 애플리케이션을 해석할 때 JS 파일이 아닌 것들을 변환 가능하도록 도움
    - 파일을 다른 언어에서 JS로 변환하거나 인라인 이미지를 데이터 URL로 로드 가능
    - JS 모듈에서 직접 CSS 파일을 import 가능해짐
  
  - **플러그인(Plugin)**
  
    - Webpack의 기본적인 동작에 추가(확장)적인 기능을 제공하는 속성
    - Loader는 파일을 해석하고 변환하는 과정에 관여하고, 플러그인은 해당 결과물의 형태를 바꾸는 역할을 함
    - 플러그인은 클래스 형태로 정의하고 `apply`라는 메서드를 정의하며, event hook을 `tap`안에 지정
      - `apply` 메서드는 플러그인을 설치할 때 Webpack 컴파일러에 의해 딱 한 번 호출
    - 로더는 모든 파일에 대해서 검증을 거쳐 파일 단위로 실행되지만, **플러그인은 모든 번들링 작업이 끝나고 난 뒤 한 번만 실행**
  
      ```javascript
      // ConsoleLogOnBuildWebpackPlugin.js
      const pluginName = 'ConsoleLogOnBuildWebpackPlugin';
      
      class ConsoleLogOnBuildWebpackPlugin {
        apply(compiler) {
          compiler.hooks.run.tap(pluginName, (compilation) => {
            console.log('The webpack build process is starting!');
          });
        }
      }
      
      module.exports = ConsoleLogOnBuildWebpackPlugin;
      ```
  
    - 플러그인 사용은 `webpack.config.js`의 plugins **배열**에 생성자 함수로 생성한 객체 인스턴스 포함
  
      ```javascript
      ...
      const ConsoleLogOnBuildWebpackPlugin = require('./ConsoleLogOnBuildWebpackPlugin');
      const webpack = require('webpack');
      
      module.exports = {
          ...
          plugins: [
              new ConsoleLogOnBuildWebpackPlugin(),
              new webpack.BannerPlugin({
                  banner: () => `빌드 날짜: ${ new Date().toLocaleString() }`
              })
          ]
      }
      ```

  - **optimization**
    - Webpack 최적화 옵션
    ```javascript
    module.exports = {
      ...
      optimization: {
        ...
      }
    }
    ```
    - `splitChunks`
      - 중복되는 요소를 하나의 chunk로 분리해주어, 중복되는 요소를 줄여 번들 사이즈 최적화 가능
      - Webpack 4부터 지원
      ```javascript
      module.exports = {
        ...
        optimization: {
          splitChunks: {
            // all: 권장, 모든 코드의 중복 요소 확인하여 분리
            // initial: 기본
            // async: 비동기 호출 요소 분리
            chunks: 'all | initial | async'
          }
        }
      }
      ```
    - `minimize` & `minimizer`
      - 번들 파일 압축 `minify`
      ```javascript
      const TerserPlugin = require('terser-webpack-plugin');

      module.exports = {
        ...
        optimization: {
          // 기본값 true
          minimize: true,
          minimizer: [
            new TerserPlugin({
              terserOptions: {
                compress: {
                  // 이 옵션은 컴파일시에 console.log를 모두 없애줌
                  drop_console: true
                }
              }
            })
          ]
        }
      }
      ```