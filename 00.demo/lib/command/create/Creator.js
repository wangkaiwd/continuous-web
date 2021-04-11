const path = require('path');
const fsExtra = require('fs-extra');
const inquirer = require('inquirer');
const pfs = require('fs/promises');
const npmlog = require('../../util/log');

class Creator {
  constructor (projectName, options, cmd) {
    this.projectName = projectName || '';
    this.options = options;
  }

  init = () => {

  };

  create = async () => {
    // 1. 准备阶段
    await this.prepare();
    // 2. 下载模板

  };
  prepare = async () => {
    const cwd = process.cwd();
    const projectDir = path.resolve(cwd, this.projectName);
    const { force } = this.options;
    if (fsExtra.pathExistsSync(projectDir)) {
      if (!fsExtra.emptyDirSync(projectDir)) {
        if (force) {
          const { clear } = await inquirer.prompt({
            type: 'confirm',
            name: 'clear',
            default: false,
            message: 'Force clean all files ?'
          });
          if (clear) {
            const dirs = await pfs.readdir(projectDir);
            for (const dir of dirs) {
              await fsExtra.remove(path.resolve(projectDir, dir));
            }
            npmlog.notice('cli', 'delete all content successfully');
          }
        } else {
          console.error('Directory not empty!');
        }
      }
    } else {
      console.log('不存在文件');
    }
    // 通过try catch来捕获异常，如果报错文件不存在，需要先创建对应的文件
    // 如果对应的文件存在，并且里边有文件，需要将所有文件进行递归删除
    // 不存在，手动创建对应的目录   
  };
}

module.exports = Creator;