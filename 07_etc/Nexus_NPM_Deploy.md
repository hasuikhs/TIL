# Nexus NPM Deploy

## 1. 웹팩 빌드

### 1.1 node.js 9 + react@15.6.2

- `src/index.js` react 컴포넌트 생성

  ```javascript
  import React, { Component } from 'react';

  class HsComponent extends Component {
    constructor() {
      super();
    }

    render() {
      return (
        <div>
          Hello! HsComponent.
        </div>
      );
    }
  }

  export default HsComponent;
  ```

- `package.json`

  ```json
  {
    "name": "hs-component",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1",
      "build": "npx webpack"
    },
    "author": "",
    "license": "ISC",
    "dependencies": {
      "react": "^15.6.2",
      "react-dom": "^15.6.2"
    },
    "devDependencies": {
      "@babel/core": "7.15.0",
      "@babel/preset-env": "7.15.0",
      "@babel/preset-react": "^7.14.5",
      "babel-loader": "^8.3.0",
      "webpack": "^4.46.0",
      "webpack-cli": "^4.7.2"
    },
    "peerDependencies": {
      "react": "^15.6.2",
      "react-dom": "^15.6.2"
    },
  }
  ```

- `.babelrc`
  
  ```json
  {
    "presets": ["@babel/preset-env", "@babel/preset-react"]
  }
  ```

- `webpack.config.js`
  
  ```javascript
  const path = require('path');

  module.exports = {
    mode: 'production',
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
      library: 'hs-component',
      libraryTarget: 'umd'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        }
      ]
    }
  }
  ```

  - `output.library`
    - 빌드한 코드를 전역 변수로 노출할 때 사용되는 변수명
    - 주로 라이브러리 번들링 시 다른 프로젝트나 환경에서 **해당 라이브러리를 사용할 때 필요한 이름**
  - `output.libraryTarget`
    - 라이브러리가 어떤 방식으로 노출될지를 정의
    - 일반적으로 브라우저나 Node.js에서 모듈 시스템을 사용하거나 전역 변수로 노출할 때의 설정을 지정 가능
      - `var` (기본값)
        - 라이브러리가 전역 변수로 노출
        - 브라우저에서 `window.MyLibrary` 와 같이 접근 가능
        - 일반적으로 브라우저에서 사용할 때 선택
      - `umd` (Universal Module Definition)
        - 라이브러리가 UMD 형태로 번들링되어 브라우저 및 Node.js 모듈 시스템에서 사용 가능
        - 브라우저에서는 전역 변수로 노출되며, Node.js에서는 CommonJS나 ES Modules를 사용하여 불러 올 수 있음
        - CommonJS와 AMD를 통합하기 위함
      - `commonjs`
        - 라이브러리가 CommonJS 모듈 시스템과 호환되는 방식
        - Node.js에서 주로 사용되며, `require`로 불러올 수 있음
      - `amd`
        - 라이브러리가 AMD 모듈 시스템과 호환되는 방식으로 노출
        - 비동기 모듈에 대한 표준안을 다루는 그룹, CommonJS가 서버쪽에서 장점이 많은 반면 AMD는 브라우저 쪽에서 더 큰 효과를 발휘

    ```javascript
    module.exports = {
      ...
      output: {
        ...
        library: 'MyLibrary',
        libraryTarget: 'umd'
      }
      ...
    }
    ```

    ```javascript
    // 브라우저
    <script src="./my-library.js"></script>
    <script>
      MyLibrary.someFunction();
    </script>

    // Node.js
    const MyLibrary = require('./my-library.js');
    MyLibrary.someFunction();
    ```

- `root`에 빌드된 파일을 연결하는 `index.js` 파일 추가
  
  ```javascript
  module.exports = require('./dist/bundle');
  ```

- `webpack` 빌드

  ```bash
  $ npm run build
  ```

### 1.1 + typescript

- `src/indes.tsx` react 컴포넌트 생성

  ```typescript
  import React, { Component } from 'react';

  interface TestProps {}

  class HsComponentTs extends Component<TestProps> {
    constructor(props: TestProps) {
      super(props);
    }

    render() {
      return (
        <div>
          test ts
        </div>
      );
    }
  }

  export default HsComponentTs;
  ```

- `package.json`

  ```json
  {
    "name": "@types/hs-component",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1",
      "build": "npx webpack"
    },
    "keywords": [],
    "author": "",
    "license": "ISC",
    "dependencies": {
      "react": "^15.6.2",
      "react-dom": "^15.6.2"
    },
    "devDependencies": {
      "@babel/core": "^7.15.0",
      "@babel/preset-env": "^7.15.0",
      "@babel/preset-react": "^7.14.5",
      "@types/react": "^15.6.2",
      "@types/react-dom": "^15.5.17",
      "babel-loader": "^8.3.0",
      "ts-loader": "^4.0.1",
      "typescript": "^2.9.2",
      "webpack": "^4.46.0",
      "webpack-cli": "^4.7.2"
    },
    "peerDependencies": {
      "react": "^15.6.2",
      "react-dom": "^15.6.2"
    }
  }
  ```

- `.babelrc`

  ```json
  {
    "presets": ["@babel/preset-env", "@babel/preset-react"]
  }
  ```

- `tsconfig.json`

  ```json
  {
    "compilerOptions": {
      "target": "ES6",
      "module": "CommonJS",
      "jsx": "react",
      "strict": true,
      "allowSyntheticDefaultImports": true,
      "esModuleInterop": true
    }
  }
  ```

- `webpack.config.js`

  ```javascript
  const path = require('path');

  module.exports = {
    mode: 'production',
    entry: './src/index.tsx',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
      library: '@types/hs-component',
      libraryTarget: 'umd'
    },
    module: {
      rules: [
        {
          test: /\.ts(x?)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
            },
            {
              loader: 'ts-loader'
            }
          ]
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
            }
          ]
        }
      ]
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js']
    }
  }
  ```

- `root`에 빌드된 파일을 연결하는 `index.js` 파일 추가
  
  ```javascript
  module.exports = require('./dist/bundle');
  ```

- `webpack` 빌드

  ```bash
  $ npm run build
  ```

## 2. Nexus 배포

### 2.1 설치

- [다운로드](https://help.sonatype.com/repomanager3/product-information/download)

#### 2.1.1 Windows

- 위에서 받은 압축 파일을 원하는 위치에 **압축해제**
- `cmd` 관리자 모드 실행

  ```bash
  $ cd {압축파일 해제 위치}/nexus-3.58.1-02/bin

  # 설치
  $ nexus.exe/install

  # 실행
  $ nexus.exe/run
  ```


#### 2.1.2 Mac

```bash
$ brew isntall nexus

# 중지
$ brew services stop nexus

# 시작
$ brew services start nexus
```

### 2.2 Nexus 설정

#### 2.2.1 로그인

- 위에서 설치된 Nexus의 **기본 포트는 8081**
  - `localhost:8081` 로 접속해서 확인

- 접속이 됐다면 우측 상단 `Sign in` 클릭
  - 로그인 창에 `username`, `password`를 입력
    - `username`은 `admin`
    - 입력 초기 `password`는 `{압축파일 해제 위치}/sonatype-work/nexus3/admin.password` 안의 값
    - 초기에는 비밀번호 재설정 창이 팝업

#### 2.2.2 npm repository 생성

- `Repositories` 탭의 `Create repository` 클릭
- `npm (hosted)` 클릭
  - `name`을 입력하고 `Create repository`를 클릭
  ![repo](./Nexus_NPM_Deploy.assets/cr.JPG)
- 생성 후 입력한 `name`을 클릭해서 찾아 **`URL`** 메모

#### 2.2.3 Roles 추가

- `Security` 탭의 `Roles` 클릭
- `Create Role` 클릭
  - `Role ID`, `Role name`, `Role Description`을 각각 입력
  - `Privileges`에서 
    - `nx-repository-view-npm-{위에서 생성한 repository name}-browse`, `nx-repository-view-npm-{위에서 생성한 repository name}-read`를 `read` 이름으로 생성
    - `nx-repository-view-npm-{위에서 생성한 repository name}-add`, `nx-repository-view-npm-{위에서 생성한 repository name}-edit`를 `write` 이름으로 생성
  ![roles](./Nexus_NPM_Deploy.assets/roles.JPG)

#### 2.2.4 Role 부여

- `Security` 탭의 `Users`
  - 생성한 Role 부여
  ![roles](./Nexus_NPM_Deploy.assets/grant.JPG)

#### 2.2.5 Realms

- `Security` 탭의 `Realms` 클릭
  - `npm Bearer Token Realm`을 `Active`로 이동
  ![realms](./Nexus_NPM_Deploy.assets/realms.JPG)

### 2.3 배포

- 1 에서 만든 라이브러리로 돌아옴
- `npm login`

  ```bash
  $ npm login --registry={위에서 메모해 놓은 nexus repository URL}

  $ Username: Nexus ID

  $ Password: Nexus password

  $ Email: email
  ```

- `package.json` 수정

  ```json
  {
    ...,
    "publishConfig": {
      "registry": {위에서 메모해 놓은 nexus repository URL}
    }
  }
  ```

- 배포

  ```bash
  $ npm publish
  ```

## 3. 패키지 사용

- 사용할 프로젝트에서
  ```bash
  $ npm --registry {위에서 메모해 놓은 nexus repository URL} install {package name}
  ```