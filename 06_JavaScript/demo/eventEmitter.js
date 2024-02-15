class EventEmitter {
  constructor() {
    if (EventEmitter.instance) {
      return EventEmitter.instance;
    }

    this.events = {};
    EventEmitter.instance = this;
  }

  // 특정 이벤트 이름에 리스너 함수 등록
  on(eventName, listener) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(listener);
  }

  // 등록된 이벤트를 발생시키고, 해당 이벤트에 등록된 모든 리스너들에게 인자 전달
  emit(eventName, ...args) {
    if (this.events[eventName]) {
      this.events[eventName].forEach(listener => {
        listener(...args);
      });
    }
  }

  // 특정 이벤트에서 리스너 함수 제거
  off(eventName, listener) {
    if (this.events[eventName]) {
      this.events[eventName] = this.events[eventName].filter(l => l !== listener);
    }
  }
}

const emitter = new EventEmitter();

// 'sayHello' 이벤트에 대한 리스너 함수 등록
emitter.on('sayHello', name => {
  console.log(`Hello, ${name}!`);
});

// 'sayHello' 이벤트 발생시키기. 등록된 리스너 함수가 호출됩니다.
emitter.emit('sayHello', 'Alice');
// 출력: Hello, Alice!