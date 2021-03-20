console.log('start');

setTimeout(() => {
  console.log('timeout');
}, 0);
// 微任务在执行完成后又添加了新的微任务到微任务队列
// 知道所有的微任务都完成后才会执行宏任务队列

// 每次会清空微任务，然后再执行最先进入宏任务队列中的宏任务
// 如果微任务中继续执行微任务，会阻塞ui的渲染

// new Promise(() => {
//   Promise.resolve()
//     .then(() => console.log('chain 1')) // resolved: async execute onFulfilled
//     .then(() => console.log('chain 2')) // pending: push async onFulfilled to resolvedFn and rejectedFn, resolve(y) when onFulfilled execute complete and get return value y
//     .then(() => console.log('chain 3')); // pending: push async onFulfilled to resolvedFn and rejectedFn
// });
// Promise.resolve().then(() => {
//   console.log('chain 4');
// });
console.log('end');

// micro task: [c1]
// macro task: [timeout]
function then (onFulfilled, onRejected) {
  return new Promise((resolve, reject) => {
    if (this.state === 'resolved') {
      setTimeout(() => {
        const y = onFulfilled(this.value);
        resolve(y); // 将结果resolve出去
      });
    }
  });
}