const path = require('path');
const fsExtra = require('fs-extra');
const inquirer = require('inquirer');
const pfs = require('fs/promises');
const cliLog = require('../../util/log');
const semver = require('semver');
const Package = require('../../model/Package');
const ora = require('ora');
const { WHITE_COMMANDS } = require('../../const');
const { spawn } = require('../../util/exec');
const { sleep } = require('../../util');
const { TEMPLATE_TYPE_CUSTOM } = require('../../const');
const { TEMPLATE_TYPE_NORMAL } = require('../../const');
const { CACHE_DIR } = require('../../const');
const { TEMPLATE_INFO } = require('../../const');
const ejs = require('ejs');
const glob = require('glob');
const colors = require('colors');

class Initiator {
  constructor (projectName, options, cmd) {
    this.projectName = projectName || '';
    this.options = options;
    this.templates = this.createTemplates();
    this.template = {};
    this.projectInfo = {};
  }

  init = async () => {
    await this.prepare();
    if (this.projectInfo) {
      const cacheDir = await this.downloadTemplate();
      // generate template to cwd
      const templateDir = path.resolve(cacheDir, 'template');
      await this.installTemplate(templateDir);
    }
  };

  downloadTemplate = async () => {
    const homePath = process.env.CLI_HOME_PATH;

    // 1. 在github仓库中创建对应的模板
    // 2. 将模板上传到npm上
    // 3. 可以将模板对应的信息存储到数据库中，然后提供API来供脚手架调用
    // 4. 脚手架调用API获取模板信息
    // 3，4步骤也可以使用本地的数据，只是每次改动之后需要修改代码
    const { template } = this.projectInfo;
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

  /**
   *  filter commands to avoid execute look like `rm -rf **\/*` malicious code
   * @param command {String}
   * @returns {null|*}
   */
  checkCommand = (command) => {
    if (WHITE_COMMANDS.includes(command)) {
      return command;
    } else {
      return null;
    }
  };

  installTemplate = async (templateDir) => {
    const spinner = ora('generate template....').start();
    await sleep(1000);
    const type = this.template.type = this.template.type || TEMPLATE_TYPE_NORMAL;
    if (type === TEMPLATE_TYPE_NORMAL) {
      this.installNormalTemplate(templateDir);
      await this.ejsRender();
    }
    if (type === TEMPLATE_TYPE_CUSTOM) {
      this.installCustomTemplate(templateDir);
    }
    spinner.stop();
    cliLog.success('install template successfully, start init project...');
    await this.enableProject();
  };

  execCmd = async (string) => {
    if (!string) { throw Error('Command not exist!');}
    const [cmd, ...args] = string.split(' ');
    await spawn(this.checkCommand(cmd), args, {
      cwd: process.cwd(),
      stdio: 'inherit'
    });
  };

  enableProject = async () => {
    const { installCommand, startCommand } = this.template;
    cliLog.notice('install dependencies...');
    await this.execCmd(installCommand);
    cliLog.success('install dependencies successfully');
    cliLog.notice('prepare to setup project...');
    await this.execCmd(startCommand);
    cliLog.success('setup successfully');
  };
  ejsRender = () => {
    return new Promise((resolve, reject) => {
      const files = glob.sync('**', { nodir: true, ignore: ['**/node_modules/**', '**/public/**'] });
      const promises = this.genPromises(files);
      Promise.all(promises).then(resolve, reject);
    });
  };
  genPromises = (files) => {
    return files.map(file => {
      return new Promise((resolve, reject) => {
        const filename = path.resolve(process.cwd(), file);
        ejs.renderFile(filename, this.projectInfo, {}, (err, str) => {
          pfs.writeFile(filename, str).then(resolve, reject);
        });
      });
    });
  };

  installNormalTemplate (templateDir) {
    // copy all files to under directory that execute ppk-cli commands
    const cwd = process.cwd();
    fsExtra.copySync(templateDir, cwd);
  }

  installCustomTemplate (templateDir) {

  }

  prepare = async () => {
    const cwd = process.cwd();
    // another way of get cli execute location: https://devdocs.io/node~14_lts/path#path_path_resolve_paths
    // console.log(path.resolve(),path.resolve('.'));
    fsExtra.ensureDirSync(cwd);
    const { force } = this.options;
    const empty = await this.isCwdEmpty(cwd);
    const genEmptyTip = () => {
      cliLog.warn('Directory is not empty, you can use --force option to force init project!');
      process.exit(1);
    };
    if (!empty) {
      if (force) {
        const { clear } = await inquirer.prompt({
          type: 'confirm',
          name: 'clear',
          default: false,
          message: 'Current directory is not empty, is force clean all files to continue init project?'
        });
        if (clear) {
          // delete operate is too dangerous, so need to execute twice confirm
          const { confirmDelete } = await inquirer.prompt({
            type: 'confirm',
            name: 'confirmDelete',
            default: false,
            message: `${colors.yellow(`Sure delete all contents under directory ${cwd}?`)}`
          });
          if (confirmDelete) {
            // emptyDir： Delete directory contents if the directory is not empty. If directory does not exist, it is created 
            await fsExtra.emptyDir(cwd);
            cliLog.success('delete all content successfully');
          }
        }
      } else {
        genEmptyTip();
      }
    }
    await this.getProjectInfo();
  };

  isValidName = (name = this.projectName) => {
    const reg = /^[a-zA-Z]*[\w-]*[a-zA-Z0-9]$/;
    return reg.test(name);
  };

  getProjectInfo = async () => {
    const projectNamePrompt = {
      type: 'input',
      name: 'projectName',
      default: this.template.name,
      message: 'Please input name of your project',
      validate: (input) => {
        // 1. 首字符必须为英文字符
        // 2. 尾字符必须是英文或数字，不能是字符
        // 3. 字符仅允许"-_"
        if (this.isValidName(input)) {
          return true;
        } else {
          return 'project name is illegal!';
        }
      }
    };
    const prompts = [
      {
        type: 'input',
        name: 'version',
        default: '1.0.0',
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
        choices: this.templates
      },
    ];
    if (!this.projectName) {
      prompts.unshift(projectNamePrompt);
    }
    // 连续调用inquirer来进行连续让用户进行交互
    const projectInfo = this.projectInfo = await inquirer.prompt(prompts);
    if (!projectInfo.projectName) {
      projectInfo.projectName = this.projectName;
    }
    if (!this.isValidName(projectInfo.projectName)) {
      cliLog.error('project name is illegal, please init project again!');
      process.exit(1);
    }
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

module.exports = Initiator;