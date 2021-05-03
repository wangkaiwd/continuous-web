const path = require('path');
const fsExtra = require('fs-extra');
const inquirer = require('inquirer');
const pfs = require('fs/promises');
const npmlog = require('../../util/log');
const colors = require('colors');
const semver = require('semver');
const Package = require('../../model/Package');
const ora = require('ora');
const { sleep } = require('../../util');
const { TEMPLATE_TYPE_CUSTOM } = require('../../const');
const { TEMPLATE_TYPE_NORMAL } = require('../../const');
const { CACHE_DIR } = require('../../const');
const { TEMPLATE_INFO } = require('../../const');

class Creator {
  constructor (projectName, options, cmd) {
    this.projectName = projectName || '';
    this.options = options;
    this.templates = this.createTemplates();
    this.template = {};
  }

  init = () => {

  };

  create = async () => {
    const projectInfo = await this.prepare();
    if (projectInfo) {
      const cacheDir = await this.downloadTemplate(projectInfo);
      // generate template to cwd
      await this.installTemplate(cacheDir);
    }
  };

  downloadTemplate = async (projectInfo) => {
    const homePath = process.env.CLI_HOME_PATH;

    // 1. 在github仓库中创建对应的模板
    // 2. 将模板上传到npm上
    // 3. 可以将模板对应的信息存储到数据库中，然后提供API来供脚手架调用
    // 4. 脚手架调用API获取模板信息
    // 3，4步骤也可以使用本地的数据，只是每次改动之后需要修改代码
    const { template } = projectInfo;
    const selectedNpm = this.template = this.templates.find(item => item.value === template);
    const targetPath = path.resolve(homePath, CACHE_DIR);
    const storeDir = path.resolve(targetPath, 'node_modules');
    const pkg = new Package({ storeDir, targetPath, name: selectedNpm.value, version: selectedNpm.version });
    await pkg.prepare();
    let cacheDir = '';
    if (pkg.exist()) {
      cacheDir = await pkg.update();
    } else {
      cacheDir = await pkg.install();
    }
    return cacheDir;
  };
  installTemplate = async (cacheDir) => {
    const spinner = ora('generate template....').start();
    await sleep(1000);
    const type = this.template.type = this.template.type || TEMPLATE_TYPE_NORMAL;
    if (type === TEMPLATE_TYPE_NORMAL) {
      this.installNormalTemplate(cacheDir);
    }
    if (type === TEMPLATE_TYPE_CUSTOM) {
      this.installCustomTemplate(cacheDir);
    }
    spinner.stop();
    npmlog.info('cli', colors.green(`install template successfully, you can start your project right now!`));
  };

  installNormalTemplate (cacheDir) {
    // copy all files to under directory that execute ppk-cli commands
    const cwd = process.cwd();
    fsExtra.copySync(cacheDir, cwd);
  }

  installCustomTemplate () {

  }

  prepare = async () => {
    const cwd = process.cwd();
    // another way of get cli execute location: https://devdocs.io/node~14_lts/path#path_path_resolve_paths
    // console.log(path.resolve(),path.resolve('.'));
    const projectDir = path.resolve(cwd, this.projectName);
    fsExtra.ensureDirSync(projectDir);
    const { force } = this.options;
    const empty = await this.isCwdEmpty(projectDir);
    const genEmptyTip = () => {
      npmlog.warn('cli', colors.yellow('Directory is not empty, you can use --force option to force create project!'));
      process.exit(1);
    };
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
        genEmptyTip();
      }
    } else {
      genEmptyTip();
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
        choices: this.templates
      },
    ]);
  };
  createTemplates = () => {
    return TEMPLATE_INFO.map(item => ({
      name: item.templateName,
      value: item.npmName,
      version: item.version,
      ...item
    }));
  };
  isCwdEmpty = async (dir) => {
    const dirs = await pfs.readdir(dir);
    return dirs.length === 0;
  };
}

module.exports = Creator;