# Observer

- JavaScript에서는 지정된 DOM 객체들을 관찰하면서, 발생하는 어떤 변화에 대응해 특정 동작 수행 가능한 내장 객체를 지원
- JavaScript에서 지원하는 Observer는 5가지가 존재
  - MutationObserver
  - IntersectionObserver
  - PerformanceObserver
  - ReportingObserver
  - ResizeObserver

## 1. MutationObserver

- DOM의 변화를 감지하고 변화가 감지될 때 콜백함수를 발생시키는 JavaScript 내장 객체
- 단, 지나친 남용은 옵저버 간의 연쇄 작용을 심화시켜 디버깅을 매우 힘들게 할 수 있음
- IE 11 부터 지원

### 1.1 생성자 - `MutationObserver()`

- DOM의 변화를 감시하는 인스턴스 생성

```javascript
new MutationObserver(
	// function callback
);
```

### 1.2 메서드

#### 1.2.1 `observe()` 

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

#### 1.2.2 `disconnect()`

- DOM 변경 알림을 받는 것을 정지

```javascript
void disconnect();
```

#### 1.2.3 `takeRecords()`

- 해당 `MutationObserver` 인스턴스의 큐를 비우고 값을 반환

```javascript
Array takeRecords();
```

#### 1.2.4 `MutationRecords`

```javascript
MutationRecodrds = {
    addedNodes: [],				// 추가된 자식 노드
    attributeName: null,		// 변경된 속성명
    attributeNamespace: null,	// 변경된 속성네임스페이스
    nextSibling: null,			// 다음 형제 태그
    previousSibling: null,		// 이전 형제 태그
    oldValue: null,				// 변경전 값
    removeNodes: [],			// 제거된 자식 노드
    target: Element,			// 대상 태그
    type: 'attributes' || 'childList' || 'characterData'	// 변경된 종류
}
```

- childList 타입에서는 addedNodes를 이용해서 자식이 추가되는지 확인 가능
  - 하지만 일부 라이브러리에서는 제대로 작동하지 않는 경우가 존재하므로 직접 해당 태그를 query로 선택해서 처리하기를 추천함

### 1.3 사용

```javascript
// 1. 감시할 대상 선정
const target = document.querySelector('#some-id');

// 2. 감지할 DOM의 변화 옵션 설정
const config = {
  attributes: true,
  childList: true,
  characterData: true
};

// 3. 변경이 감지되었을 때 실행할 Callback 함수
const callback = (mutationsList, observer) => {
  for(let mutation of mutationsList) {
    if (mutation.type === 'childList') {
      // code
    } else if (mutaion.type === 'attributes') {
      // code
    }
  }
};

// 4. MutationObserver 인스턴스 생성
const observer = new MutationObserver(callback);

// 5. 실행
observer.observe(target, config);

// 6. 중단
observer.disconnect();
```

## 2. IntersectionObserver

- 이미지의 동적 로딩이나 광고 배너 노출 측정 등을 효율적으로 수행 가능 (lazy loading)
- 등록한 요소가 현재 유저가 바라보는 웹 페이지에서 보이는 영역에 등장하거나 사라지는 경우 감지 가능
  - 기존에는 이 동작을 `scroll` 이벤트를 사용해서 감지하거나 관련 동작 구현했지만, 이는 부하가 심하게 걸리는 원인 중 하나
  - `scroll`은 유저의 스크롤에 의해 계속 반복적으로 발생하는 이벤트로 매번 새롭게 처리 동작이 재수행 되어야 했기 때문
  - 그리고 특정 지점을 관찰하기 위해서는 `getBoundingClientRect()` 함수를 사용해야 하는데, 이 함수는 reflow  현상 발생
    - reflow
      - 브라우저가 웹 페이지의 일부 또는 전체를 다시 그려야하는 경우 발생
      - 생성된 DOM 노드의 레이아웃 변경 시 영향받는 모든 노드의 수치를 다시 계산하여 재생성하는 작업
- `IntersectionObserver`를 사용하면 `scroll` 이벤트를 사용해서 구현하는 방식보다 **더 간단하고, 성능적으로 유리**
- 사용하는 경우
  - 페이지가 스크롤됨에 따라 이미지나 컨텐츠를 로드하고 싶은 **레이지 로딩(Lazy Loading)**
  - 사용자가 스크롤하는 것에 따라 컨텐츠가 로드되고 렌더링 되는 **무한 스크롤(Infinite Scroll)**
  - 광고 수익을 계산하기 위해서 광고의 가시성 여부 판단
  - 사용자가 보고 있는 것에 따라 작업이나 애니메이션을 수행할지의 여부 결정

### 2.1 생성자 - `IntersectionObserver()`

```javascript
new IntersectionObserver(callback[, options]);
```

- `callback`
  - `entries`
    - IntersectionObserverEntry 객체의 리스트, 배열 형식으로 반환
    - properties
      - `boundingClientRect`: 대상의 사각형 정보
      - `intersectionRect`: 대상의 교차한 영역 정보
      - `intersectionRatio`: 대상의 교차한 영역 비율 (0.0 ~ 1.0)
      - `isIntersecting`: 대상의 교차 상태 boolean
      - `rootBounds`: 지정한 루트 요소의 사각형 정보
      - `target`: 관찰 대상 요소
      - `time`: 변경이 발생한 시간 정보
  - `observer`
    - 콜백함수가 호출되는 `IntersectionObserver`
- `options`
  - `root`
    - 기본값은 `null`로 브라우저의 ViewPort
    - 교차 영역의 기준이 될 `root` 요소, `observe`의 대상으로 등록할 요소는 반드시 `root`의 하위 요소여야 함
      - Observer가 관찰할 영역 정의
      - `root`로 지정된 요소 내부에서만 교차를 감지
  - `rootMargin`
    - 기본값은 `0px, 0px, 0px, 0px`
    - `root` 범위를 확장하거나 축소 가능(요소의 가시 영역을 조정, CSS의 `margin`과 유사)
  - `threshold`
    - 기본값은 0.0
    - array로 값을 지정 가능 (`[0, 0.3, 1]`  세 경우 모두 실행됨)
    - `target`과 `root`의 교차가 얼마나 일어나야 `callback`을 호출할지 표시
    - 0.0 (`target`이 `root` 영역에 진입하는 시점)과 1.0 (`target` 전체가 `root`와 교체되는 시점) 사이의 숫자로 표시

### 2.2 메서드

- `observe()`
  - 대상 관찰 시작
- `unobserve()`
  - 대상 관찰 중지
- `disconnect()`
  - `IntersectionObserver` 인스턴스가 관찰하는 모든 요소의 관찰 중지

### 2.3 사용

```javascript
// 1. 감시할 대상들 선정
const targets = document.querySelectorAll('.some');

// 2. 옵션 설정
const options = {
  root: null,
  rootMargin: '0px',
  threshold: 0.5
};

// 3. callback 함수
const callback = (entries, observer) => {
	entries.forEach(entry => {
    if (entry.isIntersecting) {
      // ViewPort에 보여지는 타겟에서 실행될 코드
      // 이미지같이 한번에 보여진 후에 고정된다면 옵저버를 종료
      // observer.unobserve(entry.target);
    } else {
      // ViewPort에서 안보일때 타겟에서 실행될 코드
    }
  });
};

// 4. IntersectionObserver 인스턴스 생성
const observer = new IntersectionObserver(callback, options);

// 5. target 들 관찰
targets.forEach(item => observer.observe(item));
```

## 3. ResizeObserver
- 특정 DOM의 크기 변화 감지 가능

### 3.1 생성자
```javascript
new ResizeObserver(callback);
```
- `callback`
  - `entries`
    - 현재 변화를 감지 중인 요소 리스트
    - 각 요소 객체 properties
      - `contentBoxSize`
        - 요소의 테두리 상자 크기 (content)
      - `borderBoxSize`
        - 요소의 테두리 상자 크기 객체 (content + padding + border)
      - `contentRect`
        - `contentBoxSize` + `borderBoxSize`
      - `devicePixelContentBoxSize`
        - 요소의 테두리 상자 크기 객체
      - `target`
        - 대상 요소
  - `observer`
    - 콜백함수가 호출되는 `ResizeObserver`

### 3.2 메서드
- `observe()`
  - 대상 관찰 시작
- `unobserve()`
  - 대상 관찰 중지
- `disconnect()`
  - `ResizeObserver` 인스턴스가 관찰하는 모든 요소의 관찰 중지

### 3.3 사용
```html
<textarea id="ta"></textarea>

<script>
  window.onload = () => {
    const $target = document.querySelector('#ta');

    const ro = new ResizeObserver((entries, observer) => {
      entries.forEach(entry => {
        console.log(entry)
      });
    });

     ro.observe($target)
  }
</script>
```