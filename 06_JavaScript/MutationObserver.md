## MutationObserver

- DOM의 변화를 감지하고 변화가 감지될 때 콜백함수를 발생시키는 JavaScript 내장 객체
- 단, 지나친 남용은 옵저버 간의 연쇄 작용을 심화시켜 디버깅을 매우 힘들게 할 수 있음

### 1. 생성자 - `MutationObserver()`

- DOM의 변화를 감시하는 인스턴스 생성

```javascript
new MutationObserver(
	// function callback
);
```

### 2. 메서드

#### 2.1 `observe()` 

- 특정 노드에서 DOM의 변화를 알려주는 메서드

```javascript
void observe(
	Node target,					// DOM의 변경을 감시할 노드
    MutationObserverInit options	// 어떤 변경을 감시할지를 지정
);
```

- MutaioinObserverInit 종류

  |         속 성         |     값     |                            설 명                             |
  | :-------------------: | :--------: | :----------------------------------------------------------: |
  |       childList       | true/false |         대상 노드의 하위 요소의 추가 및 제거를 감시          |
  |      attributes       | true/false |             대상 노드의 속성에 대한 변화를 감시              |
  |     characterData     | true/false |            대상 노드의 데이터에 대한 변화를 감시             |
  |        subtree        | true/false |        대상 노드의 자식 뿐아니라 하위 노드 모두 감시         |
  |   attributeOldValue   | true/false |        대상 노드의 속성 변경 전의 내용도 기록에 남김         |
  | characterDataOldValue | true/false |       대상 노드의 데이터 변경 전의 내용도 기록에 남김        |
  |    attributeFilter    | true/false | 모든 속성 변화를 관찰할 필요가 없는 경우 네임 슾이스 없이 속성 로컬 이름의 배열로 설정 |

#### 2.2 `disconnect()`

- DOM 변경 알림을 받는 것을 정지

```javascript
void disconnect();
```

#### 2.3 `takeRecords()`

- 해당 MutationObserver 인스턴스의 큐를 비우고 값을 반환

```javascript
Array takeRecords();
```

### 3. 사용

```javascript
// 1. 감시할 대상 선정
var target = document.getElementById('some-id');

// 2. 감지할 DOM의 변화 옵션 설정
var config = {
    attributes: true,
    childList: true,
    characterData: true
};

// 변경이 감지되었을 때 실행할 Callback 함수
const callback = (mutationsList, observer) => {
    for(let mutation of mutationsList) {
        if (mutation.type === 'childList') {
            // code
        } else if (mutaion.type === 'attributes') {
            // code
        }
    }
}

// 3. MutationObserver 인스턴스 생성
const observer = new MutationObserver(callback);

// 4. 실행
observer.observe(target, config);

// 5. 중단
observer.disconnect();
```



