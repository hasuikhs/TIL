# 자동화를 위한 sh 파일

## 1. sh?

- sh파일은 shell script파일로 shell이 실행할수 있는 명령들을 모아놓은 파일
- shell 언어로 만든 파일을 shell program 혹은 shell script라 함

## 2. 생성

- 확장자를 sh로 하여 파일을 생성

- 첫 머리글을 다음과 같이 입력

  ```
  #!/bin/bash
  ```

  - 이 문구 뒤에 나오는 글자들은 이제 모두 bash 명령어로 인식

- 이 후에 자신이 원하는 명령어들을 써줌

  ```
  git pull
  ```

- 비동기 실행을 원할 경우 명령어 뒤에 & 추가

  ```
  git pull &
  
  python.py
  ```

## 3. 실행

- sh 를 붙이고 파일명.sh 실행

  ```bash
  $ sh fileName.sh
  ```

  