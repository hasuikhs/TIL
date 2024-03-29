# Dependency Injection in JS

## 0. Dependency?

```javascript
const User = require('./User');

async function addUser(userData) {
    const user = new User(userData);
}
```

- `addUser()` 메서드는 User에 의존성을 가짐 
- 의존성이 발생하면 긴밀한 결합(tight coupling)이 생기므로, User 모듈이 변경이 되면 addUser 함수도 변경이 됨
- 의존성이 높아질 경우
  - 코드 재사용성 감소
  - 유지보수 비용 증가
  - 테스트 코드 작성 어려움

## 1. Dependency Injection ?

- Dependency Injection(DI, 의존성 주입)은 하나의 패턴

- 아래 물음에 한 가지라도 "예"라면 직접 인스턴스화하지말고 **주입하는 방향으로 생각을 전환**하자

  - 객체 또는 의존성 중 어느 하나라도 DB, 설정 파일, HTTP, 기타 인프라 등의 외부 자원에 의존하는가 ?

  - 객체 내부에서 발생할지 모를 에러를 테스트에서 고려해야 하나 ?

  - 특정한 방향으로 객체를 작동시켜야 할 테스트가 있는가 ?

  - 서드파티 제공 객체가 아니라 온전히 내가 소유한 객체인가 ?

- 의존성들을 인자들로 전달해준다면, 모듈 안에서 의존성들을 불러오거나 새로 만드는 것을 피할 수 있음
- 모듈을 완전히 독립적으로 만들 수 있음

```javascript
// 간단한 DB에 접근하는 Service Module

const User = require('./User');
const UsersRepository = require('./users-repository');

async function getUsers() {
    return UsersRepository.findAll();
}

async function addUser(userData) {
    const user = new User(userData);
    
    return UsersRepository.addUser(user);
}
```
   - 위 코드는 다른 repository로 바꾸고싶다면, 위의 코드를 모두 바꿔야함, 즉 **확장성이 부족함**

   - 위 코드를 DI를 이용하여 고치면 다음과 같음

     ```javascript
     const User = require('./User');
     
     function UsersService(usersRepository) {
         async function getUsers() {
             return usersRepository.findAll();
         }
         
         async function addUser(userData) {
             const user = new User(userData);
             
             return usersRepository.addUser(user);
         }
     }
     ```

     - 위 코드를 쓰면서 service와 repository를 decoupling되면서 repository 변경이 용이해짐

## 2. DI in Node.js

- 의존성은 class에서만 사용할 수 있는게 아님
- 의존성을 주입할 때 개별 의존성을 하나 하나 인자로 전달하는 것보다 **객체로 감싸서 한번에 주는게 좋음**
  - 개인적으로 객체로 감싸서 주는 것이 파라미터의 순서를 생각을 안해도 되는 이점도 있는 것 같음

```javascript
function UsersService({ usersRepository }) {
    this.usersRepository = usersRepository;
    
    this.getUsers = async () => {
        //...
    }
}
```

