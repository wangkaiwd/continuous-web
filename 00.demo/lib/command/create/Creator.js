const path = require('path');
const fsExtra = require('fs-extra');
const inquirer = require('inquirer');
const pfs = require('fs/promises');
const npmlog = require('../../util/log');
const colors = require('colors');
const semver = require('semver');
const Package = require('../../model/Package');
const { TEMPLATE_INFO } = require('../../const');

class Creator {
  constructor (projectName, options, cmd) {
    this.projectName = projectName || '';
    this.options = options;
  }

  init = () => {

  };

  create = async () => {
    // 1. 准备阶段
    const projectInfo = await this.prepare();
    if (projectInfo) {
      this.downloadTemplate(projectInfo);
    }
  };

  downloadTemplate = (projectInfo) => {
    // 1. 在github仓库中创建对应的模板
    // 2. 将模板上传到npm上
    // 3. 可以将模板对应的信息存储到数据库中，然后提供API来供脚手架调用
    // 4. 脚手架调用API获取模板信息
    // 3，4步骤也可以使用本地的数据，只是每次改动之后需要修改代码
    const { template } = projectInfo;
    const selectedNpm = TEMPLATE_INFO.find(item => item.npmName === template);
    const pkg = new Package({ targetPath: path.resolve(__dirname, '../../../'), ...selectedNpm });
    console.log(pkg.getEntryFile());
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
        }
      } else {
        npmlog.warn('cli', colors.yellow('Directory not empty!'));
      }
    } else {
      console.log('path not exist');
    }
    return await this.getProjectInfo();
  };
  getProjectInfo = async () => {
    // 连续调用inquirer来进行连续让用户进行交互
    return await inquirer.prompt([
      {
        type: 'input',
        name: 'projectName',
        message: 'Please input name of your project',
        validate (input) {
          // 1. 首字符必须为英文字符
          // 2. 尾字符必须是英文或数字，不能是字符
          // 3. 字符仅允许"-_"
          const reg = /^[a-zA-Z]*[\w-]*[a-zA-Z0-9]$/;
          if (reg.test(input)) {
            return true;
          } else {
            return 'project name is illegal!';
          }
        }
      },
      {
        type: 'input',
        name: 'version',
        message: 'Please input version of your project',
        validate (input) {
          if (semver.valid(input)) {
            return true;
          } else {
            return 'version format incorrect!';
          }
        },
        filter (input) {
          const v = semver.valid(input);
          if (!v) {
            return input;
          } else {
            return v;
          }
        }
      },
      {
        type: 'list',
        name: 'template',
        message: 'Please input version of your project',
        choices: this.createTemplate()
      },
    ]);
  };
  createTemplate = () => {
    return TEMPLATE_INFO.map(item => ({
      name: item.name,
      value: item.npmName
    }));
  };
  isCwdEmpty = async (dir) => {
    const dirs = await pfs.readdir(dir);
    return dirs.length === 0;
  };
}

module.exports = Creator;