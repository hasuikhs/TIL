# tabIndex

- HTML 요소의 탭 순서를 지정하는 데 사용
- 사용자가 `tab` 키를 사용하여 페이지 내의 요소들 사이를 이동할 때 `tabIndex`는 이동 순서를 결정
- 대부분의 HTML 요소에 적용 가능하며, 키보드 네비게이션을 개선하는데 유용

- **주요 속성**
  - `양의 값`
    - `tabIndex`에 양의 값을 설정하면, 해당 값에 따라 탭 순서 결정
    - 숫자가 작을수록 먼저 포커스 되지만, 접근성 문제를 일으킬 수 있어 권장되지 않음
  - `0`
    - 해당 요소는 자연스러운 문서 흐름에 따라 탭 순서에 포함
    - 요소가 기본적으로 탭이 불가능할 때 유용하며, **요소를 탭 순서에 포함시키고 싶을 때 사용**
  - `음의 값`
    - `tabIndex="-1"`을 사용하면, 해당 요소는 탭을 통해 도달 불가능
    - 하지만, JavaScript를 통해 포커스 가능하여 특정 부분을 JavaScript로 포커하고 싶을 때 사용
      
      ```html
      <div tabIndex="-1" id="focus">포커스</div>
      ```
      ```javascript
      const element = document.querySelector('#focus');
      element.focus();
      ```
    - 또한, 웹 브라우저에서 포커스된 요소에 대해 시각적 피드백을 제공하기에 `outline`을 표시하므로, `outline`을 숨기고 싶다면 CSS 처리 필요

      ```css
      #focus:focus {
        outline: none;
      }
      ```