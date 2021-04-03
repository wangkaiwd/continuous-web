const path = require('path');
const { exec, execFile, spawn, fork } = require('child_process');
// api:
// 1. exec
// 2. execFile
// 3. spawn
// 4. fork

// exec('ls -l', (error, stdout, stderr) => {
//   console.log('error', error);
//   console.log('stdout', stdout);
//   console.log('stderr', stderr);
// });

// execFile('ls', ['-l'], (error, stdout, stderr) => {
//   console.log('error', error);
//   console.log('stdout', stdout);
//   console.log('stderr', stderr);
// });

// exec 和 execFile都可以执行文件，但是exec不支持通过数组的形式传入额外参数
// execFile(path.resolve(__dirname, 'test.sh'), ['-al', '-bl'], (err, stdout, stderr) => {
// // exec(path.resolve(__dirname, 'test.sh'), (err, stdout, stderr) => {
//   console.log(err);
//   console.log(stdout);
//   console.log(stderr);
// });

// spawn 产生的子进程，需要通过stdout(可读流)来获取到命令输出内容
// options中可以传入: {stdio: 'inherit'}来实现npm install，这样会将父进程的安装过程全部显示，包括loading等效果
const subprocess = spawn('ls', ['-l']);
// console.log(subprocess.pid, process.pid);

subprocess.stdout.on('data', (chunk) => {
  console.log(chunk.toString());
});
subprocess.stderr.on('data', (chunk) => {
  console.log(chunk.toString());
});
subprocess.on('error', (e) => {
  console.log('error', e);
  // 错误时用code1来退出进程
  process.exit(1);
});

subprocess.on('exit', (e) => {
  console.log('execute successful:' + e);
  process.exit(e);
});

// 比较：
// 由于spawn用到了stream来一点一点读取输出的内容，所以适合开销比较大的耗时任务(流的优点)(如:npm install)
// exec/execFile适合开销比价小的任务

// 创建一个新的Node进程，来执行耗时任务，可以进行父子进程之间参数传递
// const child = fork(path.resolve(__dirname, 'child_fork_demo.js'));
//
// // callback is invoked after the message is sent but before the child may have received it.
// child.send('hello child process', () => {
//   // child.disconnect();
// });
// child.on('message', (msg) => {
//   console.log('parent got message', msg);
// });
//
// console.log('main pid:', process.pid);
