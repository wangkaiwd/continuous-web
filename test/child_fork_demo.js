console.log('fork node.js process');
process.on('message', (msg) => {
  console.log('child got message', msg);
});
process.send('I am child process!');

console.log('child pid:', process.pid);