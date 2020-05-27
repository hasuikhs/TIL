# DOM(Document Object Model)

## 1. 노드 개요

### 1.1 노드 개체 유형

- HTML 문서를 다룰 때 마주치게 되는 가장 일반적인 노드 유형

  - `DOCUMENT_NODE` (예 : `window.document`)
  - `ELEMENT_NODE` (예 : `<body>`, `<a>`, `<p>`, `<script>` 등)
  - `ATTRIBUTE_NODE` (예 : `class="funEdges"`)
  - `TEXT_NODE` (예 : 줄바꿈과 공백을 포함한 HTML 문서 내의 텍스트 문자)
  - `DOCUMENT_FRAGMENT_NODE` (예 : `document.createDocumentFragment()`)

  - `DOCUMENT_TYPE_NODE` (예 : `<!DOCTYPE html>`)

- nodeType 값은 단지 특정한 JavaScript 인터페이스/생성자로부터 생성되는 노드가 유형을 기술하는데 사용되는 숫자 분류에 불과

### 1.2 Node 개체로부터 상속받은 하위 노드 개체

- 통상적인 DOM 트리의 각 노드 개체는 Node로부터 속성과 메서드를 상속받음
- 모든 노드 유형이 Node로부터 상속받는다는 것뿐만 아니라 상속 체인이 길어질 가능성 존재

### 1.3 노드를 다루기 위한 속성 및 메서드

|    Node 속성    |        Node 메서드        |      Document 메서드      |  HTML Element 속성   | HTML element 메서드  |
| :-------------: | :-----------------------: | :-----------------------: | :------------------: | :------------------: |
|   childNodes    |       appendChild()       | document.createElement()  |      innerHTML       | insertAdjacentHTML() |
|   firstChild    |        cloneNode()        | document.createTextNode() |      outerHTML       |                      |
|    lastChild    | compareDocumentPosition() |                           |     textContent      |                      |
|   nextSibling   |        contains()         |                           |      innerText       |                      |
|    nodeName     |      hasChildNodes()      |                           |      outerText       |                      |
|    nodeType     |      insertBefore()       |                           |  firstElementChild   |                      |
|    nodeValue    |       isEqualNode()       |                           |   lastElementChild   |                      |
|   parentNode    |       removeChild()       |                           |   nextElementChild   |                      |
| previousSibling |      replaceChild()       |                           | previousElementChild |                      |
|                 |                           |                           |       children       |                      |

### 1.4 JavaScript로 노드 다루기

#### 1.4.1 Element 및 Text 노드 생성하기

```javascript
var elementNode = document.createElement('div')
console.log(elementNode, elementNode.nodeType)	// <div></div> 1을 출력하며, 1은 element 노드를 가리킴

var textNode = document.createTextNode('Hi')
console.log(textNode, textNode.nodeType)		// "Hi" 3을 출력하며, 3은 text 노드를 가리킴
```

#### 1.4.2 Element 및 Text 노드 생성 및 추가하기

```html
<div id="A"></div>
<div id="B"></div>
<span id="C"></span>
<div id="D"></div>
<div id="E"></div>
```

```javascript
// strong element와 text 노드를 생성해서 DOM에 추가
document.getElementById('A').innerHTML = '<strong>Hi</strong>'

// div element와 text 노드를 생성해서 <div id="B"></span>과 교체
document.getElementById('B').outerHTML = '<div id="B" class="new">Whats Shaking</div>'

// Text 노드를 생성해서 div#C를 갱신
document.getElementById('C').textContent = 'dude'

// Text 노드를 생성해서 div#D를 갱신
document.getElementById('D').innerText = 'Keep it'

// Text 노드를 생성해서 div#E를 Text 노드로 교체
document.getElementById('E').outerText = 'real!'
```

- `innerText` : 태그를 추가해도 적용이 안되어 문자열 그대로를 리턴
- `innerHTML` : 태그가 포함되면 태그가 적용되어 문자열을 html로 인식하여 리턴

#### 1.4.3 DOM 트리 일부 문자열로 추출하기

```javascript
document.getElementById('A').innerHTML		// "<strong>Hi</strong>"
document.getElementById('A').outerHTML		// "<div id="A"><strong>Hi</strong></div>"

document.getElementById('B').textContent	// "Whats Shaking"

document.getElementById('B').innerText		// "Whats Shaking"
document.getElementById('B').outerText		// "Whats Shaking"
```

#### 1.4.4 appendChild(), insertBefore(), removeChild(), replaceChild()

- `appendChild(노드)`

  ```html
  <body>
  	<p>Hi</p>
  </body>
  ```

  ```javascript
  var elementNode = document.createElement('strong')
  var textNode = document.createTextNode(' Dude')
  
  document.querySelector('p').appendChild(elementNode)
  document.querySelector('strong').appendChild(textNode)
  
  console.log(document.body.innerHtml)	// <p>Hi<strong> Dude</strong></p>
  ```

- `insertBefore(노드, 참조위치)` 

  ```html
  <body>
      <ul>
          <li>2</li>
          <li>3</li>
      </ul>
  </body>
  ```

  ```javascript
  var text1 = document.create.createTextNode('1')
  var li = document.createElement('li')
  li.appendChild(text1)
  
  var ul = document.querySelector('ul')
  ul.insertBefore(li, ul.firstChild)
  
  console.log(document.body.innerHTML)
  /*
  <ul>
  	<li>1</li>
  	<li>2</li>
  	<li>3</li>
  </ul>
  */
  ```

- `removeChild(노드)`

  ```html
  <div id="A">Hi</div>
  <div id="B">Dude</div>
  ```

  ```javascript
  // element 노드 삭제
  var divA = document.getElementById('A')
  divA.parentNode.removeChild(divA)
  
  // 텍스트 노드 삭제
  var divB = document.getElementById('B').firstChild;
  divB.parentNode.removeChild(divB)
  ```

- `replaceChild(new 노드, old 노드)`

  ```html
  <div id="A">Hi</div>
  <div id="B">Dude</div>
  ```

  ```javascript
  // element 노드 교체
  var divA = document.getElementById('A')
  var newSpan = document.createElement('span')
  newSpan.textContent = 'Howdy'
  divA.parentNode.replaceChild(newSpan, divA)
  
  // 텍스트 노드 교체
  var divB = document.getElementById('B').firstChild
  var newText = document.createTextNode('buddy')
  divB.parentNode.replaceChild(newText, divB)
  ```

### 1.5 DOM 내의 노드 탐색

```html
<body>
    <ul><!-- comment -->
    	<li id="A">foo</li>
    	<li id="B">bar</li>
    	<!-- comment -->
	</ul>
</body>
```

```javascript
var ul = document.querySelector('ul')

// ul의 첫번째 자식?
console.log(ul.firstElementChild.nodeName)	// li

// ul의 마지막 자식?
console.log(ul.lastElementChild.nodeName)	// li

// 첫번째 li의 nextSibling?
console.log(ul.querySelector('#A').nextElementSibling.nodeName)	// li

// 마지막 li의 previousSibling?
console.log(ul.querySelector('#B').previousElementSibling.nodeName)	// li
```

### 1.6 동일 노드 판단

```html
<input type="text">
<input type="text">

<textarea>foo</textarea>
<textarea>bar</textarea>
```

```javascript
var input = document.querySelectorAll('input')
console.log(input[0].isEqualNode(input[1]))	// true

var textarea = document.querySelectorAll('textarea')
console.log(textarea[0].isEqualNode(textarea[1]))	// false
```



####  

