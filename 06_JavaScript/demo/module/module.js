function moduleTest1() {
  console.log('moduleTest1');
  innerModule();
}

function innerModule() {
  console.log('innerModule');
}

export { moduleTest1 };