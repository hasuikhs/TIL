# npm vs yarn

## 1. 비교

- npm과 yarn은 패키지의 설치, 업데이트, 수정, 삭제를 안전하고 편리하게 관리해주는 툴, **패키지 매니저**
- npm의 일관성, 보안, 빌드시 성능 등의 문제를 해결하기 위해 Facebook이 yarn 개발
- **npm은 패키지들이 코드를 자동적으로 즉시 실행하는 것을 허용할 뿐 아니라, 의존성들도 즉시 자동적 실행**
  - 이 특징이 편리함을 제공하지만, **보안성(패키지 등록 정책에서 심사가 필요없는 부분)에 문제**
- yarn은 오직 `yarn.lock` 혹은 `package.json`으로부터 설치
  - `yarn.lock`은 모든 장치들이 같은 패키지들을 설치하는 것을 보증하여 **패키지 차이로부터 발생하는 버그 확률 감소**

## 2. 사용법

- **package.json 생성**

  ```bash
  # npm
  $ npm init
  
  # yarn
  $ yarn init
  ```

- **package.json 패키지 설치**

  - `package.json` 에 들어있는 모든 package를 설치

    ```bash
    # npm
    $ npm i # 또는 npm install
    
    # yarn
    $ yarn install
    ```

  - package 전역 설치

    ```bash
    # npm
    $ npm i -g (package-name)
    
    # yarn
    $ yarn add global (package-name)
    ```

  - devDependancy에 설치

    ```bash
    # npm
    $ npm i (package-name) --save-dev
    
    # yarn
    $ yarn add (package-name) --dev
    ```

- 모든 라이브러리를 최신 버전으로 업데이트

  ```bash
  # npm
  $ rm -rf node_modules && npm install
  
  # yarn
  $ yarn upgrade
  ```

  

  