const path = require('path');
const fsExtra = require('fs-extra');
const inquirer = require('inquirer');
const pfs = require('fs/promises');
const npmlog = require('../../util/log');
const colors = require('colors');
const semver = require('semver');

class Creator {
  constructor (projectName, options, cmd) {
    this.projectName = projectName || '';
    this.options = options;
  }

  init = () => {

  };

  create = async () => {
    // 1. 准备阶段
    const ifContinue = await this.prepare();
    if (!ifContinue) {return;}
    // 2. 下载模板

  };
  prepare = async () => {
    const cwd = process.cwd();
    // another way of get cli execute location: https://devdocs.io/node~14_lts/path#path_path_resolve_paths
    // console.log(path.resolve(),path.resolve('.'));
    const projectDir = path.resolve(cwd, this.projectName);
    const { force } = this.options;
    if (fsExtra.pathExistsSync(projectDir)) {
      const empty = await this.isCwdEmpty(projectDir);
      if (!empty) {
        if (force) {
          const { clear } = await inquirer.prompt({
            type: 'confirm',
            name: 'clear',
            default: false,
            message: 'Current directory is not empty, is force clean all files to continue create project?'
          });
          if (clear) {
            // delete operate is too dangerous, so need to execute twice confirm
            const { confirmDelete } = await inquirer.prompt({
              type: 'confirm',
              name: 'confirmDelete',
              default: false,
              message: `Confirm delete all contents under directory ${projectDir}?`
            });
            if (confirmDelete) {
              // emptyDir： Delete directory contents if the directory is not empty. If directory does not exist, it is created. The directory itself is not deleted.  
              await fsExtra.emptyDir(projectDir);
              npmlog.notice('cli', 'delete all content successfully');
            }
          }
        } else {
          return false;
        }
      } else {
        npmlog.warn('cli', colors.yellow('Directory not empty!'));
        return false;
      }
    } else {
      console.log('path not exist');
    }
    return this.getProjectInfo();
    // 通过try catch来捕获异常，如果报错文件不存在，需要先创建对应的文件
    // 如果对应的文件存在，并且里边有文件，需要将所有文件进行递归删除
    // 不存在，手动创建对应的目录   
  };
  getProjectInfo = async () => {
    return await inquirer.prompt([
      {
        type: 'input',
        name: 'projectName',
        message: 'Please input name of your project',
        validate (val) {
          // 1. 首字符必须为英文字符
          // 2. 尾字符必须是英文或数字，不能是字符
          // 3. 字符仅允许"-_"
          const reg = /^[a-zA-Z]*[\w-]*[a-zA-Z0-9]$/;
          return reg.test(val);
        }
      },
      {
        type: 'input',
        name: 'version',
        message: 'Please input version of your project',
        validate (val) {
          return semver.valid(val);
        }
      }
    ]);
  };

  isCwdEmpty = async (dir) => {
    const dirs = await pfs.readdir(dir);
    return dirs.length === 0;
  };
}

module.exports = Creator;