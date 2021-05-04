## strategy of separate package

* 核心模块: core
* 命令模块：command
* 模型模块：model
* 工具模块：util

### third party package

* import-local
* npmlog
* node-semver
* colors.js
* root-check
* minimist
* dotenv
* pkg-dir
* npminstall
* fs-extra(emptyDir)

### knowledge

* require支持的文件后缀: `.js`,`.json`,`.node`，其它后缀的文件都会按照`js`文件进行解析
* 使用`try{}catch(e){}`来捕获错误，自己对错误进行处理
* process.geteuid: 0为root用户
* [npm registry api](https://github.com/npm/registry/blob/master/docs/REGISTRY-API.md#public-registry-api)
* [description is second parameter to `.command`](https://github.com/tj/commander.js/#commands)
* [stand-alone-executable-subcommands](https://github.com/tj/commander.js/#stand-alone-executable-subcommands)
* npm init egg do what?
  * [npm init](https://docs.npmjs.com/cli/v7/commands/npm-init#description)
* [symbolic link](https://en.wikipedia.org/wiki/Symbolic_link)
  * etc -> private/etc
* [inquirer validate input message and display error message](https://github.com/SBoudrias/Inquirer.js/#question)
* [inquirer filter](https://github.com/SBoudrias/Inquirer.js/#question)
* why async await promise error need to try catch
* path.sep: format windows and mac path
* child_process: spawn: `{ stdio: 'inherit' }`
* window cmd execute node code
* glob match options: [nodir](https://github.com/isaacs/node-glob#options)

### feature

* check package version
* check lowest node version
* check root account
* check homedir whether exist
* check debug mode from command line arguments
* set default environment variable when `.ppk-cli` file not exists

### environment variable

* write environment variable for develop avoid forget

### implement command line interactive list

requirement:

* readline
* ansi-escapes
* rxjs

### custom template

* ejs
* glob