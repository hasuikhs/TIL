# npm vs yarn

## 1. 비교

- npm과 yarn은 패키지의 설치, 업데이트, 수정, 삭제를 안전하고 편리하게 관리해주는 툴, **패키지 매니저**
- npm의 일관성, 보안, 빌드시 성능 등의 문제를 해결하기 위해 Facebook이 yarn 개발
- **npm은 패키지들이 코드를 자동적으로 즉시 실행하는 것을 허용할 뿐 아니라, 의존성들도 즉시 자동적 실행**
  - 이 특징이 편리함을 제공하지만, **보안성(패키지 등록 정책에서 심사가 필요없는 부분)에 문제**
- yarn은 오직 `yarn.lock` 혹은 `package.json`으로부터 설치
  - `yarn.lock`은 모든 장치들이 같은 패키지들을 설치하는 것을 보증하여 **패키지 차이로부터 발생하는 버그 확률 감소**
- **차이점**
  - **성능**
    - yarn은 초기에 npm보다 빠른 패키지 설치 및 의존성 해결을 제공하기 위해 설계
    - yarn은 패키지 설치 시 병렬로 패키지를 다운로드하고 의존성을 효율적으로 관리하는 데 중점
  - **보안**
    - yarn은 보안 측면에서 npm보다 더 엄격한 정책 적용
    - 패키지의 무결성을 검증하기 위한 서명 기능 제공
  - **자동 리셋**
    - yarn은 패키지 설치 후에도 `node_modules` 폴더를 리셋할 필요 없음
    - npm은 종종 `npm cache clean` 등의 명령을 사용하여 캐시를 클리어할 필요 있음
  - **안정성**
    - npm, yarn 모두 안정적 사용 가능하지만, 특정 프로젝트 또는 환경에 따라 더 선호되는 도구가 다를 수 있음

## 2. 사용법

### 2.1 npm, yarn

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

- 모듈 취약점 검사

  ```bash
  # 모듈 취약점 검사
  $ npm audit
  
  # 모듈 취약점 검사 후 호환되는 버전으로 자동 업데이트
  $ npm audit fix
  
  # audit 기능을 사용하지 않으려면 install 시 no-audit 옵션을 줘야 함
  $ npm install --no-audit
  ```

### 2.2 npm install options

- `npm install` or `npm i`는 `./node_modules` 폴더에 패키지를 다운받아 설치함
  - `package.json`의 `dependencies`에 있는 모든 패키지를 설치
  - npm 5버전 이상부터는 `--save` 옵션 사용하지 않아도 `dependencies`에 항목이 추가됨

| option                  | 설명                                                         |
| ----------------------- | ------------------------------------------------------------ |
| `-P`, `--save-prod`     | `package.json`의 `dependencies`에 패키지 등록 (기본값)       |
| `-D`, `--save-dev`      | `package.json`의 `devDependencies`에 패키지 등록             |
| `-O`, `--save-optional` | `package.json`의 `optionalDependencies`에 패키지 등록        |
| `--no-save`             | `dependencies`에 패키지를 등록하지 않음                      |
| `-g`, `-global`         | 패키지를 프로젝트가 아닌 시스템의 `node_module` 폴더에 설치<br>`package.json`의 `dependencies`에 등록되지 않음 |
| `--force`               | 패키지가 존재하더라도 무조건 강제로 다운받음                 |

- `dependencies`: 실제 코드에도 포함되며 앱 구동을 위해 필요한 의존성 파일들
- `devDependencies`:실제 코드에 포함되지 않으며 개발 단계에만 필요한 의존성 파일들

- 설치할 패키지 뒤에 `@`를 붙이면 특정 버전을 설치하는 것도 가능

  - 설치할 버전을 특정할 수 없다면 이렇게도 가능

    ```bash
    # 0.0.1 버전에서 0.2.0 중 일치하는 버전 설치
    $ npm i name@"0.0.1 < 0.2.0"
    ```

## NPX

- npm 5.2.0 버전 이상에서 사용가능한 도구

- npm을 좀 더 편하게 사용하기 위해서 npm에서 제공

- npx는 npm 레지스트리에 올라가있는 패키지를 쉽게 설치하고 관리가능케 도와주는 CLI 도구

- npx는 기존에 npm 설치 방법과는 다르게 일일이 설치, 실행, 제거를 할 필요 없이 일회성으로 원하는 패키지를 npm 레지스트리에 접근해서 실행시키고 설치

  ```bash
  # create-react-app
  $ which create-react-app
  create-react-app not found
  
  # npx를 사용하면 실행 가능
  $ npx create-react-app my-app
  ```
