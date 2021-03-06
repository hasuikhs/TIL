# 03_06 보안 알고리즘(Security Algorithm)

## 0. 보안 문제

### 0.1 데이터 전달 시 네 가지 문제점

- **도청(Interception)** : A가 B와 데이터를 주고 받을 때 C가 데이터를 **훔쳐보는 것**
- **위조(Spoofing)** : 서로가 **의도하는 상대와 데이터를 주고 받지 못하는 것**
  - A는 B에게 메시지를 보내려고 하는데 정작 상대는 C일 수 있다.
- **변조(Falsification)** : 데이터 전송 중에 **C가 개입하여 데이터를 위조하거나, 망가진 상태로 전달**하는 것
- **사후 부인(Repudiation)** : 전송이 성공적으로 이루어졌음에도 **자신이 보낸 데이터가 아니라고 부인**하는 것

### 0.2 문제에 대처하기 위한 보안 기술

- **도청**을 방지하기 위해서는 **암호화 기술**을 사용
- **위장과 변조**을 방지하기 위해서는 **메시지 인증 코드**나 **전자 서명**을 사용
- **사후 부인**을 방지하기 위해서는 **전자 서명**을 사용

## 1. 암호화(Encryption)

![image-20200221130541917](03_06_보안_알고리즘(Security_Algorithm).assets/image-20200221130541917.png)

- 가장 쉬운 암호화는 **XOR 연산** 방법이다.
- 비트 연산으로 XOR를 하면 "A xor B = C 이면 A = B xor C"와 같은 관계식이 성립한다.
- A와 B가 있으면 메시지를 암호화할 수 있고, B와 C가 있으면 원문 메시지를 복호화 가능하다.

## 2. 해시 함수(Hash Function)

![img](03_06_보안_알고리즘(Security_Algorithm).assets/201812270ed33b604a9155fc4.png)

- **해시 값** : 주어진 데이터를 고정 길이의 숫자로 변환한 값
  - 입력 크기에 무관하게 해시 값의 길이는 같음
  - 입력이 동일하면 해시 값도 같음
  - 비슷한 데이터를 입력해도 조금이라도 다르면 해시값은 크게 달라짐
  - 전혀 다른 데이터를 입력해도 해시 값이 같을 수 도 있음(해시 값 충돌)
  - 해시값으로부터 원 데이터를 역산하는 것이 사실상 불가능

## 3. 공통키(공유키) 암호 방식(Shared-key Crytosystem)

- 암호화와 복호화에 같은 키를 사용하는 방식
- 키를 안전하게 전달할 방법(키 배분 문제)이 필요하다.
  - '키 교환 프로토콜'을 이용하거나 '공개키 암호 방식'을 이용해야 한다.

## 4. 공개키 암호 방식(Public-key Cryptosystem)

- 공통키 방식 대비 시간이 걸리긴 하지만 암호화(공개키) 및 복호화(비밀키)에 서로 다른 키를 사용

- 통신을 원하는 쪽에서 상대방에게 공개키를 보내어 데이터를 암호화해서 보내달라고 하는 방식

- 중간에서 도청을 해도 비밀키가 없는 제 3자는 데이터를 복호화할 수 없다.

  - '키 배분 문제'가 발생하지 않는다.

  ![img](03_06_보안_알고리즘(Security_Algorithm).assets/noname03.png)

- 도중에 공개키를 바꿔치기 하는 'man-in-the-middle attach'에 취약하다.

## 5. 하이브리드 암호 방식(Hybrid Cryptosystem)

- 안정성과 속도를 모두 만족
- 데이터 암호화에는 처리 속도가 빠른 공통키 암호 방식을 사용하고, 공통키 자체는 공개키 암호 방식으로 보냄

- SSL(Secure Socket Layer) 프로토콜에서 사용되고 있다.

## 6. 디피-헬만 키 교환법(Diffie-Hellman Key Exchage)

- 합성만 가능하고 분해는 안되는 키 합성 방법

![img](03_06_보안_알고리즘(Security_Algorithm).assets/noname04.png)

## 7. 메시지 인증 코드(MAC, Message Authentification Code)

- 인증과 변조 검출의 두 가지 기능을 가지는 구조
- 공개키 암호 방식 또는 디피-헬만 키 교환법으로 안전하게 암호키를 두 번 전송하면 된다.

![image-20200221135408764](03_06_보안_알고리즘(Security_Algorithm).assets/image-20200221135408764.png)