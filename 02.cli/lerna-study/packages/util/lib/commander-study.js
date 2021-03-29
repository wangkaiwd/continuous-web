const { Command } = require('commander');
const program = new Command();

// option
program
  .name('ppk-cli')
  .usage('<command> [options]')
  .version('1.0.0')
  .option('-d, --debug', 'enable debug mode', false)
  .option('-e, --env-name <envName>', 'obtain environment variable');

// 注册命令：
// command , 会返回一个新的Command 对象
program
  .command('clone <source>')
  .description('clone a repository into a newly created directory')
  .option('-f, --force', 'force clone file')
  .action((source, cmdObj) => {
    // 选项组成的对象
    console.log('do clone', source, cmdObj);
  });

// addCommand： 注册子命令，可以对命令进行分组
// console.log('debug', program.opts());
// example: https://github.com/tj/commander.js/blob/327a3ddd552f90d1dbd37f55fa7a88b9553468ae/examples/nestedCommands.js#L33-L47
const service = new Command('service');
service
  .command('start [port]')
  .description('start a http static server')
  .option('-d, --directory <directory>', 'server serve directory')
  .action((port) => {
    console.log(port);
  });
program.addCommand(service);

program
  // command中传入第二个参数作为command的描述，这里会执行commander-study-install，与单独调用description()方法不同
  // https://github.com/tj/commander.js/#commands
  .command('install [name]', 'install package')
  .action((...args) => {
    console.log(args);
  });

program
  .arguments('<username> [password]')
  .description('test command', {
    username: 'command',
    password: 'password'
  }) // description中的第二个参数可以在help中描述参数
  .action(function () {
    // cmd, options, cmdObj
    console.log('arguments', arguments);
  });

program.parse(process.argv);