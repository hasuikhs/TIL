# 3. Start Project

## 3.1 Project Init

- package.json 생성

  ```bash
  $ npm init --y
  ```

  - TypeScript 개발할 때는 `ts-node`를 사용하지만, 개발이 완료되면 ES5 JavaScript 코드로 변환해 node로 실행해야하므로 `package.json`파일을 수정해야 함

    ```json
    {
        ...
        "scripts": {
            "dev": "ts-node src",		// 개발 중 src 디렉토리의 ts 파일 실행
            "build": "tsc && node dist"	// 개발 후 배포를 위해 dist 디렉토리에 ES5 js 파일 컴파일
        }
    }
    ```

- TypeScript Project는 `tsconfig.json` 파일이 있어야함

  ```bash
  $ tsc --init
  ```

  - 아래와 같이 디렉토리 옵션 변경

    ```json
    {
    	"compilerOptions": {
    		"outDir": "dist",
    		"baseUrl": ".",
    		"paths": { "*": ["node_modules/*"] },
    		...
    	},
    	"include": ["src/**/*"]
    }
    
    ```

- src 디렉터리와 소스 파일 만들기

  ```bash
  $ mkdir -p src/utils
  
  $ touch src/index.ts src/utils/makePerson.ts
  ```

## 3.2 Module




