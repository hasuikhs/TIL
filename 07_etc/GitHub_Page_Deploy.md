# GitHub Page Deploy

- GitHub에서 React 페이지 배포하기

### 1. CRA

- npm으로 진행해도 무방

  ```bash
  $ npm i -g yarn
  ```

- React 프로젝트를 생성할 디렉토리 위치에서

  ```bash
  $ create-react-app {project_name} --typescript
  ```

- React 실행 확인

  ```bash
  $ cd {project_name}/
  
  $ yarn start
  ```

- **localhost:3000**에서 확인

### 2. GitHub에서

- 새  public **repository 생성**

### 3. 다시 local측

- React 프로젝트가 있는 디렉토리 위치에서 **gh-pages** 모듈 설치

  ```bash
  $ yarn add gh-pages
  ```

- 아까 만든 GitHub repository에 프로젝트 push

  ```bash
  $ git add .
  
  $ git commit -m "First commit";
  
  $ git remote add origin https://github.com/{github_id}/{repository_name}
  
  $ git push -u origin master
  ```

### 4. 다시 GitHub

- 코드가 올라간 repository에서 **settings**에서 아래로 내려서 **GitHub Pages** source에서 master 선택 후 저장한 후
- 페이지가 바뀌면 다시 **GitHub Pages**로 내려와서 다음과 같이  할당된 주소 `https://{github_id}.github.io/{repository_name}`를 복사

### 5. 다시 local

- VS Code로 아까의 React project를 켜고 **package.json** 파일 수정

  ```bash
  $ code .
  ```

  ```json
  // package.json
  {
      "name": "{project_name}",
      "homepage": "https://{github_id}.github.io/{repository_name}", // 추가
  	//  ...
      "scripts": {
          // ...
          "predeploy": "yarn build",		// 추가
          "deploy": "gh-pages -d build"	// 추가
      }
  }
  ```

- 다시 터미널로 돌아와서

  ```bash
  $ git add .
  
  $ git commit -m "commit"
  
  $ yarn run deploy
  ```

### 6. 다시 GitHub

- 아까 repository에서 **settings**에서 아래로 내려서 **GitHub Pages** source에서 **gh-pages** 선택 후 저장한 후 잠시 기다린 후 아까 할당된 페이지 주소를 확인

- 이후 React 개발을 진행 한 후 

  ```bash
  $ yarn run deploy
  ```

  