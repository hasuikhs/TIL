# Cron

## 1. Cron?

- 특정 시간, 특정 시간 마다 특정 작업을 자동으로 수행하게 하는 명령어
- 리눅스에만 존재하는 개념은 아님

## 2. 사용법

### 2.1 crontab

- 등록된 cron 확인

  ```bash
  $ crontab -l
  ```

- cron 등록하기

  ```bash
  $ crontab -e
  ```

### 2.2 cron 형식

- 분, 시, 일, 월, 요일 순서

  - 일요일은 0, 7에 해당 가능

- 들어올 수 있는 값

  | 표 기 |         설 명          |
  | :---: | :--------------------: |
  |   *   |        모든 값         |
  |   ,   | 지정한 모든 값(불규칙) |
  |   -   |   그 사이의 모든 값    |
  |   /   |    특정 주기로 나눔    |

- 예

  - 매일 2시 : `0 2 * * *`
  - 매일 2, 4시 : `0 2,4 * * *`
  - 매일 2시간 마다: `0 */2 * * *`


