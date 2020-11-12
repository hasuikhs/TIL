# VS Code - SSH

- vs code로 ssh를 사용하는데 port가 기본 22가 아닌 경우 window 계정으로 사용되는 경우 존재

- 그 때에 ssh configure 설정을 다음과 같이 바꿈

  ```
  Host id@host
    HostName host
    Port portNo
    User id
  ```

  