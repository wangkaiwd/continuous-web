// require支持的文件类型：
// .js: 读取该文件，并通过node.js中vm模块来执行读取到的字符串
// .json: 通过fs.readFile读取到文件内容，执行JSON.parse即可
const pkg = require('../../package.json');
const semver = require('semver');
const log = require('../util/log');
const { LOWEST_NODE_VERSION } = require('../const');
const colors = require('colors/safe');
const core = argv => {
  try {
    checkPkgVersion();
    checkNodeVersion();
  } catch (e) { // 通过try catch来自己处理错误，防止程序终止以及打印堆栈信息
    log.error('cli', colors.red(e.message));
  }
};
const checkPkgVersion = () => {
  log.info('cli', pkg.version);
};

const checkNodeVersion = () => {
  const { version } = process;
  if (semver.lt(version, LOWEST_NODE_VERSION)) {
    // 这样整个报错的堆栈信息会被打印出来，可以通过try catch来自己处理错误信息
    throw Error(`ppk-cli need to install node version after ${LOWEST_NODE_VERSION}`);
  }

};

module.exports = core;