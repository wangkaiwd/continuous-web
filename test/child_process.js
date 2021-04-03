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
// const subprocess = spawn('ls', ['-l']);
// // console.log(subprocess.pid, process.pid);
//
// const bufs = [];
// subprocess.stdout.on('data', (chunk) => {
//   bufs.push(chunk);
// });
// subprocess.stderr.on('data', (err) => {
//   console.log('error---------', err);
// });
// subprocess.stdout.on('end', () => {
//   console.log(Buffer.concat(bufs).toString());
// });
// 比较：
// 由于spawn用到了stream来一点一点读取输出的内容，所以适合开销比较大的耗时任务(流的优点)(如:npm install)
// exec/execFile适合开销比价小的任务

// 创建一个新的Node进程
const child = fork(path.resolve(__dirname, 'child_fork_demo.js'));

// callback is invoked after the message is sent but before the child may have received it.
child.send('hello child process', () => {
  child.disconnect();
});

console.log('main pid:', process.pid);
