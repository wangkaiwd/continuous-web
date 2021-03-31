const util = require('util');
const create = (projectName, options, cmd) => {
  // 全局的选项处理：
  //  1. 通过cmd的parent属性来获取全局的options(命令嵌套，可能parent会拿不到值)
  //  2. 定义create命令时将program作为参数传入
  //  3. 监听全局命令(先执行) + 设置环境变量process.env.TARGET_PATH，之后可以直接通过环境变量来使用
  console.log('create', projectName, options, process.env.TARGET_PATH);
};

module.exports = create;