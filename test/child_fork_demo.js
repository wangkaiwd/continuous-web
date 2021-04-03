console.log('fork node.js process');
process.on('message', (msg) => {
  console.log('child got message', msg);
});

console.log('child pid:', process.pid);