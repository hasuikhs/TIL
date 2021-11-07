# Dependency Injection in JS

### 1. Dependency Injection ?

- Dependency Injection(DI, 의존성 주입)은 하나의 패턴
- 의존성들을 인자들로 전달해준다면, 모듈 안에서 의존성들을 불러오거나 새로 만드는 것을 피할 수 있음

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



