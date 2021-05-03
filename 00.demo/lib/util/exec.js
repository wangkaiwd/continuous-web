const child_process = require('child_process');
const spawn = (cmd, args, options) => {
  return new Promise((resolve, reject) => {
    const cp = child_process.spawn(cmd, args, options);
    cp.on('close', resolve);
    cp.on('error', reject);
  });
};

module.exports = {
  spawn
};