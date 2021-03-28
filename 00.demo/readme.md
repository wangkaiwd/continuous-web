## 拆分策略

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

### knowledge

* require支持的文件后缀: `.js`,`.json`,`.node`，其它后缀的文件都会按照`js`文件进行解析
* 使用`try{}catch(e){}`来捕获错误，自己对错误进行处理
* process.geteuid: 0为root用户

### feature

* check package version
* check lowest node version
* check root account
* check homedir whether exist
* check debug mode from command line arguments
* set default environment variable if `.ppk-cli` file not exists