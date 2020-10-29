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

## 2. Document 노드

### 2.1 일반적인 HTML 문서 정보 얻기

```javascript
console.log('title = ' + document.title)
console.log('url = ' + document.url)
console.log('referrer = ' + document.referrer)
console.log('lastModified = ' + document.lastModified)
```

### 2.2 document 정보 바로가기

```javascript
console.log(document.doctype)	// <!doctype html>
console.log(document.documentElement)	// <html lang="en">
console.log(document.head)	// <head> 출력
console.log(document.body)	// <body> 출력
```

### 2.3 focus()

- 포커스를 가지고 있거나 활성 상태인 노드 참조 얻기

  ```html
  <body>
      <textarea></textarea>
  </body>
  <script>
  	document.querySelector('textarea').focus()
      
      console.log(document.activeElement)
  </script>
  ```

  - 실행하게 되면 textarea에 커서가 깜빡임

- 문서 혹은 문서 내의 특정 노드가 포커스를 가지고 있는지 판별

  ```javascript
  <body>
      <textarea></textarea>
  </body>
  <script>
      document.querySelector('textarea').focus()
  
  	setTimeout(function() {
          console.log(document.hasFocus())
      }, 6000)	// 현재 창이 포커스된 경우 truev
  </script>
  ```


## 3. Element 노드

### 3.1 HTML Element 개요

- HTML 문서 내의 각 element들은 고유한 성질을 가짐
- 각자 element를 DOM 트리 내의 노드 개체로 인스턴스화하는 고유한 JavaScript 생성자를 가짐

### 3.2 HTML Element 개체의 속성 및 메서드

- Element 생성 - `createElement('태그명')`

  ```javascript
  document.createElement('태그명')
  ```

- Element 태그 이름 얻기 - `tagName`, `nodeName`

  - 원본 HTML 문서에서의 대소문자 여부에 관계없이 대문자로 반환

  ```javascript
  document.querySelector('a').tagName		// A 출력
  
  document.querySelector('a').nodeName	// A 출력
  ```

- Element의 Attribute 및 값에 대한 리스트/컬렉션 얻기 - `attributes`

  ```html
  <button type="button" class="btn-class" id="btn-id"></button>
  ```

  ```javascript
  document.querySelector('button').attributes
  // NamedNodeMap {0: type, 1: class, 2: id, type: type, class: class, id: id, length: 3}
  ```

- Element의 Attribute 값 획득/설정/제거 

  - `getAttribute('속성명')`, `setAttribute('속성명', '옵션')`, `removeAttribute('속성명')`

  ```html
  <button type="button" class="btn-class" id="btn-id"></button>
  ```

  ```javascript
  let atts = document.querySelector('button')
  
  atts.removeAttribute('type')
  atts.removeAttribute('class')
  atts.removeATtribute('id')
  
  atts.setAttribute('type', 'button')
  atts.setAttribute('class', 'btn-class')
  atts.setAttribute('id', 'btn-id')
  
  atts.getAttribute('type')
  atts.getAttribute('class')
  atts.getAttribute('id')
  ```

- Element가 특정 attribute를 가지고 있는지 확인 - `hasAttribute('속성명')`

  ```javascript
  atts.hasAttribute('type')	// 있다면 true, 없다면 false
  ```

- Class Attribute 값 리스트 얻기 - `classList`

  ```html
  <div class="this is div"></div>
  ```

  ```javascript
  let elm = document.querySelector('div')
  
  console.log(elm.classList)	// this is div {0="this", 1="is", 2="div", length=3, ...}
  
  console.log(elm.className)	// this is div
  ```

- Class Attribute에 하위 값 추가 및 제거 - `add`, `remove`

  ```javascript
  elm.classList.add('div2')
  elm.classList.remove('div')
  ```

- Class Attribute 값이 특정 값을 가지고 있는지 판별 - `classList.contains('속성명')`

  ```javascript
  elm.classList.contains('is')
  ```

- data-* Attribute를 가져오고 설정

  ```html
  <div data-foo-foo="foo" data-bar-bar="bar"></div>
  ```

  ```javascript
  var elm = document.querySelector('div')
  
  // 가져오기
  console.log(elm.dataset.fooFoo)	// foo
  console.log(elm.dataset.barBar)	// bar
  
  // 설정하기
  elm.dataset.gooGoo = "goo"
  console.log(elm.dataset)
  // DOMStringMap {fooFoo='foo', barBar="bar" gooGoo="goo"}
  
  console.log(elm)
  // <div data-foo-foo="foo" data-bar-bar="bar" data-goo-goo="goo"></div>
  ```


## 4. Element 노드 선택

### 4.1 특정 Element 노드 선택하기

- `querySelector()`

  - 특정 name이나 id를 제한하지 않고 css 선택자를 사용하여 요소를 찾음

    - 요소가 여러개일 경우 처음의 요소를 반환

    > `(#sections)` -> sections 아이디를 가진 요소를 찾음
    >
    > `(.section)` -> section 클래스명을 가진 요소를 찾음

- `getElementById()`

  - id를 기준으로 해당 id를 가진 요소를 찾음

### 4.2 Element 노드 리스트 선택 및 생성

- `querySelectorAll()`
  
  - 하나의 요소를 반환하는 `querySelector()`와는 다르게 리스트를 반환
- `getElementsByTagName()`
  
  - 해당되는 Tag명 에 따른 요소들의 리스트를 반환
- `getElementsByClassName()`
  
- 해당 Class명을 가진 요소들을 리스트로 반환
  
- `children`

  - 특정 노드가 포함된 상위의 노드를 선택하여 하위 노드 리스트 반환

  ```javascript
  var ulElement = document.querySelector('ul').children
  console.log(ulElement)	// [<li>, <li>]
  ```

### 4.3 사전에 구성된 Element 노드 선택/리스트

- `document.all`
  - HTML 문서 내의 모든 요소
- `document.forms`
  - HTML 문서 내의 모든 `<form>` 요소
- `document.images`
  - HTML 문서 내의 모든 `<img>` 요소
- `document.links`
  - HTML 문서 내의 모든 `<a>` 요소
- `document.scripts`
  - HTML 문서 내의 모든 `<script>` 요소
- `document.styleSheets`
  - HTML 문서 내의 모든 `<link>` 또는 `<style>` 요소

### 4.4 선택될 Element를 검증하기 위해 matches() 사용

```html
<ul id="birds">
  <li>Orange-winged parrot</li>
  <li class="endangered">Philippine eagle</li>
  <li>Great white pelican</li>
</ul>
```

```javascript
var birds = document.getElementsByTagName('li');

for (var i = 0; i < birds.length; i++) {
	if (birds[i].matches('.endangered')) {
    	console.log('The ' + birds[i].textContent + ' is endangered!');
	}
}
```

- 특정 요소들에서 특정 조건을 가진 코드를 수행할때 사용 가능

## 5. Element 노드 지오메트리와 스크롤링 지오메트리

### 5.1 offsetParent를 기준으로 element의 offsetTop 및 offsetLeft 값 접근

- offsetTop 및 offsetLeft 속성을 사용하면, offsetParent로부터 element 노드의 오프셋 픽셀 값 접근 가능
- 이 element 노드 속성들은 element 노드 속성들은 element의 바깥쪽 최상단 경계로부터 offsetParent의 안쪽 좌상단 경계까지의 거리를 픽셀로 제공
- offsetParent의 값은 가장 가까운 부모 element 중에서 css 위치 값이 static이 아닌 element를 검색하여 결정
- 아무 element도 발견되지 않으면, offsetParent의 값은 `<body>` element나 document

```html
<div id="blue">
    <div id="red">
    </div>
</div>
```

```css
#blue {
    height: 100px,
    width: 100px,
    background-color:blue;
   	border: 10px solid gray;
}

#red {
    height: 50px,
    width: 50px,
    background-color:red,
    border: 10px solid gray
}
```

```javascript
var div = document.querySelector('#red');

console.log(div.offsetLeft);	// 60 출력
console.log(div.offsetTop);		// 60 출력
console.log(div.offsetParent);	// <body> 출력
```

![image-20200910141656182](DOM(Document_Object_Model).assets/image-20200910141656182.png)



- blue 사각형의 스타일에 절대 위치를 지정하면

  ```css
  #blue {
  	...
  	position: absolute;
  }
  ```

  - offsetParent의 값은 div가 되고 `offsetLeft`와 `offsetTop`의 값은 25가 되는데, 이는 offsetParent가 `<body>`가 아닌 blue 사각형 div 이기 때문

### 5.2 뷰포트 기준으로 offset 접근

- **`getBoundingClientRect()`를 사용하여 뷰포트를 기준으로 element의 테두리 offset 접근**

  ```html
  <style>
  div {
      height: 50px;
      width : 50px;
      background-color : red;
      border : 10px solid gray;
      margin : 100px;
  }
  </style>
  <div></div>
  <script>
      var divTest = document.querySelector('div').getBoundingClientRect();
      console.log(divTest.top, divTest.right, divTest.bottom, divTest.left); // 100, 170, 170, 100
  </script>
  ```

- **뷰포트에서 element의 크기(테두리 + 패딩 + 내용) 얻기**

  - `getBoundingClientRect()`는 height와 width 속성/값도 가짐
  - height와 width 속성은 element의 크기를 가리키는데, 전체 크기는 div

  ```javascript
  var divTest = document.querySelector('div');
  
  // getBoundingClientRect() 사용
  console.log(divTest.getBoundingClientRect().height, divTest.getBoundingClientRect().width); 
  // 테두리 10 + 패딩 0 + 내용 50 + 패딩 0 + 테두리 10 = 70
  
  // offsetHeight, offsetWidth 사용
  console.log(divTest.offsetHeight, divTest.offsetWidth);
  ```

- **뷰포트에서 테두리를 제외한 element의 크기(패딩 + 내용) 얻기**

  ```javascript
  var divTest = document.querySelector('div');
  
  console.log(divTest.clientHeight, divTest.clientWidth);
  // 패딩 0 + 내용 50 + 패딩 0 = 50
  ```

- **`elementFromPoint()` 사용하여 뷰포트의 특정 지점에서 최상단 element 얻기**

  - `elementFromPoint()`를 사용하면 HTML 문서의 특정 지점에서 최상단 element에 대한 참조 접근 가능

  ```javascript
  console.log(document.elementFromPoint(50, 50));
  ```

- **`scrollHeight`와 `scrollWidth`를 사용하여 스크롤될 element의 크기 얻기**

  - 스크롤될 노드의 높이와 너버 반환

  ```html
  <style>
      * {
          margin : 0;
          padding : 0;
      }
      div {
          height : 150px;
          width : 100px;
          overflow : auto;
      }
      p {
          height : 2000px;
          width : 1000px;
          background-color : red;
      }
  </style>
  <div>
      <p></p>
  </div>
  <script>
  	var divTest = document.querySelector('div');
      console.log(divTest.scrollHeight, divTest.scrollWidth);
      console.log(divTest.clientHeight, divTest.clientWidth);
  </script>
  ```

  - 스크롤 가능한 영역 내에 있는 노드가 스크롤 가능한 영역의 뷰포트보다 작은 경우에, 해당 노드의 높이와 너비를 알아야 한다면, scrollHeight와 scrollWidth는 뷰포트의 크기를 반환하므로 지양
  - **스크롤될 노드가 스크롤 영역보다 작은 경우, 스크롤 가능한 영역 내에 포함된 노드의 크기를 판별하려면 clientHeight, clientWidth 사용**

- **scrollTop와 scrollLeft를 사용하여 top 및 left로부터 스크롤될 픽셀을 가져오거나 설정**

  - 스크롤 때문에 현재 뷰포트에서 보이지 않는 left나 top까지의 픽셀을 반환

  ```javascript
  var divTest = document.querySelector('div');
  divTest.scrollTop = 750;
  divTest.scrollLeft = 750;
  console.log(divTest.scrollTop, divTest.scrollLeft);
  ```

  - left나 top까지 뷰포트에서 보이지 않는 내용을 픽셀로 측정한 것

- **scrollIntoView()를 사용하여 element를 View로 스크롤하기**

  - 스크롤이 가능한 노드 내에 있는 노드를 선택하면, `scrollIntoView()` 메서드를 사용하여 선택된 노드가 view로 스크롤되도록 할 수 있음

  ```html
  <style>
      div {
          height : 50px;
          width : 300px;
          overflow : auto;
      }
      p {
          background-color : red;
      }
  </style>
  <div>
      <content>
      	<p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
      </content>
  </div>
  <script>
  document.querySelector('content').children[2].scrollIntoView(true);
  </script>
  ```

  - `scrollIntoView()` 메서드에 매개변수 `true`를 전달하면, 해당 메서드로 하여금 스크롤될 대상 element의 top으로 스크롤하라는 것(`true`는 기본값)
  - element의 bottom으로 스크롤 시키고 싶다면 , `scrollIntoView()` 메서드에 false 매개변수를 전달

## 6.  Element 노드 인라인 스타일

### 6.1 style attribute(element 인라인 CSS 속성) 개요

- 모든 HTML element는 해당 element에 한정된 인라인 css 속성을 넣는 데 사용 가능한 style attribut를 가짐

  ```html
  <div style="background-color:red; border:1px solid black;" />
  ```

- 코드에서 style 속성이 아닌 CSSStyleDeclaration 개체를 반환한다는 점에 유의

- CSSStyleDeclaration 개체에는 element의 인라인 스타일만이 포함, 즉 스타일시트에서 단계적으로 내려오면서 계산되지 않음

### 6.2 개별 인라인 CSS 속성 가져오기, 설정, 제거

```html
<div></div>
```

```javascript
var divStyle = document.querySelector('div').style;

// 설정
divStyle.backgroundColor = 'red';
divStyle.border = '1px solid black';
divStyle.width = '100px';
divStyle.height = '100px';

// 가져오기
console.log(divStyle.backgroundColor);
console.log(divStyle.border);
console.log(divStyle.width);
console.log(divStyle.height);

// 제거
divStyle.backgroundColor = '';
divStyle.border = '';
divStyle.width = '';
divStyle.height = '';
```

### 6.3 모든 인라인 CSS 속성 가져오기, 설정, 제거

```javascript
var div = document.querySelector('div');
var divStyle = div.style;

// cssText를 사용하여 설정
divStyle.cssText = 'background-color:red;';

// cssText를 사용하여 가져옴
console.log(divStyle.cssText);

// 제거
divStyle.cssText = '';

// setAttribute를 사용하여 설정
div.setAttribute('style', 'background-color: red');

// getAttribute를 사용하여 가져옴
console.log(div.getAttribute('style'));

// 제거
div.removeAttribute('style');
```

# 7. Text 노드

### 7.1 Text 개체 개요

- HTML  문서에서 텍스트는 text 노드를 만들어내는 Text() 생성자 함수의 인스턴스로 표현

- HTML 문서가 해석될 때, HTML 페이지의 element 사이에 석여있는 텍스트는 text 노드로 변환

  ```html
  <p>Hi</p>
  
  <script>
  	var textHi = document.querySelector('p').firstChild;
  
  	console.log(textHi.constructor);	// Text() 출력
  
  	console.log(textHi);	// Text {textContent="hi", length=2, ...}
  </script>
  ```

  - **Text() 생성자 함수가 text 노드를 생성하지만, Text가 CharaterData, Node, Object로부터 상속**

### 7.2 Text 개체 및 속성

- Text 노드에 존재하는 속성과 메서드에 관련된 정확한 정보를 얻으려면, 브라우저에서 얻는것이 가장 좋음

- 다음 코드를 통해 text 노드에 존재하는 속성과 메서드를 얻을 수 있음

  ```html
  <p>hi</p>
  
  <script>
  	var text = document.querySelector('p').firstChild;
      
      // text의 고유 속성
      console.log(Object.keys(text).sort());
      
      // text의 고유 속성과 상속받은 속성
      var textPropertiesIncludeInherited = [];
      for (var p in text) {
          textPropertiesIncludeInherited.push(p);
      }
      console.log(textPropertiesIncludeInherited.sort());
      
      // text가 상속받은 속성만
      var textPropertiesOnlyInherited = [];
      for (var p in text) {
          if(!text.hasOwnProperty(p)) {
              textPropertiesOnlyInherited.push(p);
          }
      }
      console.log(textPropertiesOnlyInherited.sort());
  </script>
  ```

### 7.3 공백은 text 노드를 생성

- DOM이 생성될 때, 테스트 문자뿐만 아니라 공백 역시 text 노드로 만들어짐

  ```html
  <p id="p1"></p>
  <p id="p2"></p>
  
  <script>
  	console.log(document.querySelector('#p1').firstChild);	// null 출력
      console.log(document.querySelector('#p2').firstChild.nodeName);	// #text 출력
  </script>
  ```

  - **DOM에서 공백이나 텍스트 문자가 보통 text 노드로 표현되는 것을 잊지 말자**

  ```html
  <p id="p1"></p>
  <p id="p2"></p>
  
  <script>
  	console.log(document.querySelector('#p1').nextSibling);	// Text 출력
  </script>
  ```

  - 키보드를 사용하여 HTML 문서에 문자나 공백이 입력 가능하다면, text 노드로 변환될 가능성 있음
  - HTML 문서를 최소화하거나 압축되지 않는 한, 일반적인 HTML 페이지는 상당한 수의 공백과 줄 바굼 text 노드를 가짐