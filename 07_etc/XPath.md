# XPath

## 1. XPath?

- XML Path Language로 XML 문서의 특정 요소나 속성에 접근하기 위한 경로를 지정하는 언어
- W3C 표준 권고안으로, XSLT와 XPointer에 사용될 목적으로 만들어졌고, XML DOM에서 노드를 검색할 때도 사용 가능
  - XSLT(Extensible Stylesheet Language Transformations)
    - XML 문서를 다른 XML 문서로 변환하는데 사용하는 XML 기반 언어
  - XPointer
    - XML 문서의 일부분에 주소를 부여 가능한 방법을 제공하는 W3C 표준 언어

## 2. 특징

- XML 문서를 탐색하기 위해 경로 표현식(path expression)을 사용
- 수학, 문자열 처리 등을 하기 위한 표준 함수 라이브러리를 내장
- W3C의 표준 권고안인 XSLT에서 가장 중요한 부분 중 하나

## 3. 경로 표현식

- 절대 경로는 `/` 로 시작하며, 루트 노드부터 순서대로 탐색

- 상대 경로는 `/`로 시작하지 않으며, 기준으로 지정되는 노드부터 탐색

- 경로 연산자

  | <center>경로 연산자</center> | <center>설명</center>                                        |
  | ---------------------------- | ------------------------------------------------------------ |
  | <center>노드 이름</center>   | 해당 '노드 이름'과 일치하는 모든 노드를 선택                 |
  | <center>`/`</center>         | 루트 노드부터 순서대로 탐색                                  |
  | <center>`//`</center>        | 현재 노드의 위치와 상관없이 지정된 노드에서부터 순서대로 탐색 |
  | <center>`.`</center>         | 현재 노드를 선택                                             |
  | <center>`..`</center>        | 현재 노드의 부모 노드를 선택                                 |
  | <center>`@`</center>         | 속성 노드를 선택                                             |
