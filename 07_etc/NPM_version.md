# NPM version

- `npm version` 명령어는 npm 버전 번호를 업데이트하는 데 사용
  - Semantic Versioning 규칙을 따르며, 버전 번호는 `major.minor.patch` 형식으로 구성
  - 각각 주요 변경사항, 부가 기능 추가, 버그 수정을 나타냄

#### 사용법

- `npm version` 명령어는 다양한 방식으로 사용
  - 버전 업데이트
    - `major`
      - 현재 버전의 `major` 수치를 1 증가시키고, `minor` 및 `patch` 수치를 0으로 초기화

        ```bash
        $ npm version major
        # 1.1.1 -> 2.0.0
        ```

    - `minor`
      - 현재 버전의 `minor` 수치를 1 증가시키고, `patch` 수치를 0으로 초기화

        ```bash
        $ npm version minor
        # 1.0.1 -> 1.1.0
        ```

    - `patch`
      - 현재 버전의 `patch` 수치를 1증가

        ```bash
        $ npm version patch
        # 1.0.0 -> 1.0.1
        ```

    - 직접 지정도 가능

      ```bash
      $ npm version 1.2.3
      ```

#### Git 태그 버전 관리

- `npm version`을 실행하면 **버전 번호와 같은 이름의 Git tag 생성**
- Git 태그는 프로젝트의 특정 커밋을 표시하는데 사용되는데, 특정 버전의 코드로 쉽게 돌아갈 수 있음
  - 필요한 버전으로 손쉽게 전환 가능하여 프로젝트 관리가 체계적이고 효율적으로 이루어질 수 있음
- 로컬에서 태그 생성 후에는 원격 저장소에 `push` 해야함

  ```bash
  $ git push
  # 새버전 정보와 태그들을 원격에 모두 푸시
  $ git push --tags
  ```

- 태그 삭제하기

  ```bash
  # local에서 삭제
  $ git tag -d v1.0.0

  # 원격 저장소에서 삭제
  $ git push origin :v1.0.0
  ```
