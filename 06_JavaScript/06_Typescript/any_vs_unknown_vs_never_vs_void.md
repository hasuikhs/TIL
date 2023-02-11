# any vs unknown vs never vs void

## 1. any
  - 타입 검사를 항상 만족
  - 데이터의 타입을 동적 콘텐츠에 사용하는 것과 같이 알수 없을 때 사용
  - JavaScript로 작성된 모듈을 TypeScript로 변경할때 사용하면 별다른 작업없이 코드가 동작
    - 타입 검사를 항상 만족하므로 의도치 않은 형 변환이나 전혀 예상하지 못한 값이 대입되는 등 사이드 이펙트를 일으켜 안전성이 낮아지므로 주의
  ```typescript
    let a: any = 123;
    
    let str: string = a;

    a = 'string';
  ```

## 2. unknown
  - TypeScript에 존재하고, 존재 간으한 모든 타입들을 포함하여 어떤 값이든 가질 수 있음
  - 그로인해 모든 타입이 공통적으로 가능한 연산 외에는 가능한게 없음
  - 사용할 때에는 어떤 타입인지 다시 한번 명시를 해줘야함
  ```typescript
    let a: unknown = 123;

    // 재할당 가능
    a = 'string';

    // 오류 변수 타입이 다르므로 할당 불가능
    let str1: string = a;

    // unknown은 이렇게 할당 해야함
    let str2: string = (a as string);
  ```

## 3. never
  - 모든 타입의 하위 타입
  - 절대 발생 불가능한 타입을 나타냄
  - `never` 타입에는 할당 불가
    ```typescript
      let a: never = 42; // 에러
    ```
  - 에러를 발생시킬 때 사용
    ```typescript
      function error(msg: string): never {
        throw new Error(msg);
      }
    ```

### 4. void
  - 함수에서 반환 값이 없을 때 반환 타입을 표현하기 위해 사용