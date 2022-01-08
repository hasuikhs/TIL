# Memory Leak

## 1. Memory Leak?

- Memory Leak(메모리 누수)는 **메모리 풀에서 반환되지 않으면서 애플리케이션에서 더 이상 쓰지 않는 메모리**로 정의 가능
- 각 프로그래밍 언어는 메모리 관리를 각각 다른 방법으로 처리하므로 메모리 누수 발생 가능성을 감소시킴

### 1.1 In JavaScript

- JavaScript에서는 GC(Garbage Collector)를 사용하여 메모리 관리하는데 도움을 줌
  - 메모리 영역이 **프로그램에서 여전히 참조 가능한지를 주기적으로 확인(도달 가능성, reachability)**하여 메모리 관리
  - 이같은 GC 언어는 메모리 관리 문제를 '프로그램에서 여전히 참조 가능한가?'에 관심이 있음
- GC언어의 메모리 누수의 주된 원인은 **원치 않는 참조(unwanted references)**

#### 1.1.1 Reference-counting GC

#### 1.1.2  Mark-and-sweek 알고리즘