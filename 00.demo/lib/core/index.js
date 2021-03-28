// require支持的文件类型：
// .js: 读取该文件，并通过node.js中vm模块来执行读取到的字符串
// .json: 通过fs.readFile读取到文件内容，执行JSON.parse即可
const pkg = require('../../package.json');
const semver = require('semver');
const log = require('../util/log');
const { LOWEST_NODE_VERSION } = require('../const');
const colors = require('colors/safe');
const rootCheck = require('root-check');
const fs = require('fs');
const homedir = require('os').homedir();
const minimist = require('minimist');
const path = require('path');
let args = {};
const core = argv => {
  try {
    checkPkgVersion();
    checkNodeVersion();
    checkRootAccount();
    checkHomedir();
    checkInputArgs();
    checkEnv();
    log.verbose('cli', 'test debug mode');
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
const checkRootAccount = () => {
  // return the numerical effective user identity of the process
  // 根用户: 0
  // 其它用户: 501
  // root 账户创建的一些文件，其它用户没有权限处理，会引发权限问题，所以要进行权限降级
  rootCheck();
  // console.log(process.geteuid());
};
// 实现缓存等功能时要用到主目录
const checkHomedir = () => {
  if (!homedir || !fs.existsSync(homedir)) {
    throw Error(colors.red(`User home directory is not exists!`));
  }
};
const checkArgs = () => {
  if (args.debug) {
    process.env.LOG_LEVEL = 'debug';
  } else {
    process.env.LOG_LEVEL = 'info';
  }
  log.level = process.env.LOG_LEVEL;
};
const checkInputArgs = () => {
  args = minimist(process.argv.slice(2));
  checkArgs();
};

const checkEnv = () => {
  const dotenv = require('dotenv');
  const envPath = path.resolve(homedir, '.env');
  if (fs.existsSync(envPath)) {
    dotenv.config({ path: envPath });
    log.info('env', process.env.CLI_HOME);
  }
};

module.exports = core;