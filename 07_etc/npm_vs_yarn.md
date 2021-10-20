# npm vs yarn

## 1. 비교

- npm과 yarn은 패키지의 설치, 업데이트, 수정, 삭제를 안전하고 편리하게 관리해주는 툴, **패키지 매니저**
- npm의 일관성, 보안, 빌드시 성능 등의 문제를 해결하기 위해 Facebook이 yarn 개발
- **npm은 패키지들이 코드를 자동적으로 즉시 실행하는 것을 허용할 뿐 아니라, 의존성들도 즉시 자동적 실행**
  - 이 특징이 편리함을 제공하지만, **보안성(패키지 등록 정책에서 심사가 필요없는 부분)에 문제**
- yarn은 오직 `yarn.lock` 혹은 `package.json`으로부터 설치
  - `yarn.lock`은 모든 장치들이 같은 패키지들을 설치하는 것을 보증하여 **패키지 차이로부터 발생하는 버그 확률 감소**

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

## NPX

- npm 5.2.0 버전 이상에서 사용가능한 도구
- npm을 좀 더 편하게 사용하기 위해서 npm에서 제공
- npx는 npm 레지스트리에 올라가있는 패키지를 쉽게 설치하고 관리가능케 도와주는 CLI 도구

