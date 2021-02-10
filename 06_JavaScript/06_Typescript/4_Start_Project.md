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

- `export` 와 `import`를 사용하여 모듈화

- **`export`**

  - `export` 키워드는 `function`, `interface`, `class`, `type`, `let`, `const` 앞에 붙일 수 있음
  - TypeScript는 JavaScript와 호환하기 위해 `export default` 구문 제공
    - `export default`는 한 모듈이 내보내는 기능 중 오직 하나에만 붙일 수 있음
    - `export default`가 붙은 기능은 `import`문으로 중괄호 없이 사용 가능
    - `export` 가 있는 파일에서도 사용 가능

- **`import`**

  - `export` 키워드로 내보낸 심벌을 사용하려면 `import` 키워드로 불러와야 함

  - 기본 형태는 다음과 같음

    ```typescript
    import { 심벌 목록 } from '파일의 상대 경로';
    ```

  - `as`를 사용한 `import`

    ```typescript
    import * as 심벌 from '파일 상대 경로';
    ```

    - 예제

      ```typescript
      // export 
      export function myFunction() {};
      
      // import
      import * as U from 'export 파일 위치';
      
      U.myFunction();
      ```
