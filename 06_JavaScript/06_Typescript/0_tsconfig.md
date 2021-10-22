# `tsconfig.json`

- `tsconfig.json` 파일은 TypeScript를 JavaScript로 변환할 때의 설정을 정의해놓은 파일
- 프로젝트에서 `tsc`라는 명령어를 치면 `tsconfig.json` 에 정의된 내용으로 변환

## 1. `tsc` 명령어

- `tsc` 명령어는 TypeScript를 JavaScript로 변환할 때 사용하는 명령어

  ```bash
  $ tsc app.ts
  ```

## 2. `tsconfig` 파일 인식 기준

- `tsc` 명령어를 대상 파일을 지정하지 않고 실행하면 현재 폴더에 있는 `tsconfig` 파일을 기준으로 변환 수행

## 3. `tsconfig` 파일 속성

- `files`

  - TypeScript 변환 명령어를 입력할 때마다 대상 파일의 경로를 지정하지 않고 미리 정의

  ```json
  {
      "files": ["app.ts"]
  }
  ```

- `include`

  - `files`와 같이 파일을 개별로 지정하지 않고 `include` 옵션으로 변환 폴더를 지정

  ```json
  {
      "include": ["src/**/*"]
  }
  ```

  - `*`: 해당 디렉토리의 모든 파일
  - `?`: 해당 디렉토리 안에 파일의 이름 중 한 글자라도 맞으면 해당
  - `**`: 하위 디렉토리를 재귀적으로 접근

- `exclude`

  - `include`와 ㅂ반대되는 속성으로 변환하지 않을 폴더 경로 지정
  - 설정하지 않으면 기본적으로 `node_modules`, `bower_components` 같은 폴더를 제외

  ```json
  {
      "exclude": ["node_modules"]
  }
  ```

- 우선 순위는 `files` > `include` = `exclude`

- TypeScript는 기본적으로 `node_modules`를 제외하지만 `@types` 폴더는 컴파일에 포함

- 나머지 옵션은 다음 블로그 참조

  https://geonlee.tistory.com/214