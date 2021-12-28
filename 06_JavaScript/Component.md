# Component

## 0. 컴포넌트 형태

```javascript
// 기본 코드 형태

function Component({domId}) {
    if (!new.target) {
        throw new Error('Create object using new operator.');
    }
    
    this.$target = document.querySelector(`#${domId}`);
    
    this.state = [];
    
    this.setState = nextState => {
        this.state = nextState;
        
        this.render();
    }
    
    this.setEvent = () => {
        // event code
    }
    
    this.render = () => {
        // render code
        
        this.setEvent();
    }
    
    this.render();
}
```

## 1. 선언적 프로그래밍과 컴포넌트 추상화

- DOM 접근하는 부분을 최소화하고, 선언적인 프로그래밍 방식으로 접근

  - **선언적 프로그래밍**

    - 필요한 것을 달성하는 과정을 하나하나 기술하는 것보다 **필요한 것이 어떤 것인지 기술하는데 방점**을 두고 애플리케이션의 구조를 세워나가는 프로그래밍 스타일

    ```javascript
    let str = 'this is string';
    let newStr = str.replace(/ /g, '-');
    ```

    - 선언적 프로그래밍은 **코드 자체가 어떤 일이 벌어진건지 설명**하기 때문에 추론하기 쉬움
    - 추론하기 쉬우면 애플리케이션의 규모를 확장하는 것도 더욱 용이함

  - **명령형 프로그래밍**

    - 코드로 **원하는 결과를 달성해 나가는 과정에만 관심**을 두는 프로그래밍 스타일

    ```javascript
    let str = 'this is string';
    let newStr = '';
    
    for (let i = 0; i < str.length; i++) {
        if (str[i] == ' ') {
            newStr += '-';
        } else {
            newStr += str[i];
        }
    }
    ```

    - 명령형 프로그래밍은 코드 안의 내용을 읽는 사람의 이해를 위해 주석을 많이 달아주어야 함

- 기존의 레거시 코딩을 한다면, 

  1. DOM에 접근하고 업데이트하는 시점에 대한 명확한 기준이 없음
  2. **코드와 UI의 업데이트가 많아질 경우 어느 지점, 어느 시점에 DOM을 업데이트 했는지를 추적하기가 점점 힘들어짐**

- 때문에 **0. 컴포넌트 형태**를 참고하여, 어떠한 상태(state)를 기준으로 렌더링하는 방식으로 코딩

  - `render()`
    - 해당 컴포넌트의 state를 기준으로 element에 렌더링
    - 자신의 상태(state)를 기준으로 렌더링해야하기 때문에, **별도의 파라미터를 받지 않아야 함**
  - `setState(nextState)`
    - 해당 컴포넌트의 state를 업데이트
    - state를 업데이트하고 `render` 함수를 부르도록 함으로써 업데이트된 상태를 화면에 반영

  - 이런식으로 작성시, 실제 **DOM을 직접 제어하는 부분을 컴포넌트가 인스턴스화 되는 시점, `render` 함수가 다시 호출 되는 시점으로 제한 가능**

  

  



