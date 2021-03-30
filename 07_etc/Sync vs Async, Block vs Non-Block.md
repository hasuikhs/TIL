# Sync vs Async, Block vs Non-Block

```javascript
function mainFunc() {
    subFunc()	// 호출된 함수
}

mainFunc()	// 호출한 함수
```

## 1. Sync vs Async

- **처리해야 할 작업들은 어떠한 흐름(시간)으로 처리** 할 것인가에 대한 관점

### 1.1 Sync

- 작업을 시작하고, 작업이 종료 될 때까지 **기다렸다가 다음 작업을 시작**
- **호출한 함수가 작업 완료를 신경 씀**
- 호출된 함수의 수행 결과 및 종료를 호출한 함수가**(호출된 함수 뿐 아니라 호출한 함수도 함께) 신경 씀**

### 1.2 Async

- 작업을 시작하고, 작업이 종료 될때를 **기다리지 않고 다음 작업을 시작**
- **호출된 함수가 작업 완료를 신경 씀**
- 호출된 함수의 수행 결과 및 종료를 호출된 함수 혼자 직접 신경 쓰고 처리

## 2. Block vs Non-Block

- 제어할 수 없는 대상의 처리 방법

- 처리되어야 하는 작업이, **전체적인 작업의 흐름을 막느냐 안막느냐**

```javascript
function func() {
    function1();	// func 함수가 실행되면 순차적으로 제어권이 function1 2 3 순서대로 전달 되게 되는데
    				// 그 제어권이 function1이 결과값을 반환할때까지 기다리면 Block
    				// 그 제어권이 function1의 결과값을 반환할때까지 기다리지 않으면 Non-Block 
    function2();	
    function3();	
}

function function1() {
    // code
    
    return value
}
```

### 2.1 Block

- 요청한 작업을 마칠 때까지 계속 대기
- 호출된 함수가 **자신의 작업을 모두 마칠 때까지 호출한 함수에게 제어권을 넘겨주지 않고 대기**

### 2.2 Non-Block

- 요청한 작업을 즉시 마칠 수 없다면 즉시 반환
- 호출된 함수가 **작업을 마치지 않았더라도 호출한 함수에게 제어권을 넘겨주고, 호출한 함수가 다른 일을 할 수 있는 기회를 줌**

## 3. 차이점

- 위의 설명만 본다면 Sync와 Async, Block과 Non-Block은 차이가 없어 보임
- 하지만 두 그룹의 차이는 관심사가 다름
- **Block과 Non-Block은 제어권에 관심**
- **Sync와 Async는 이 제어권을 반환하는 시간, 타이밍에 관심**



#### 참고

- https://homoefficio.github.io/2017/02/19/Blocking-NonBlocking-Synchronous-Asynchronous/
- https://musma.github.io/2019/04/17/blocking-and-synchronous.html

