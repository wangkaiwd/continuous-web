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
  // Specifying isDefault:true will run the subcommand if no other subcommand is specified
  // .command('clone <source>', { isDefault: true })
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

// program
//   // command中传入第二个参数作为command的描述，这里会执行commander-study-install，与单独调用description()方法不同
//   // https://github.com/tj/commander.js/#commands
//   // 第三个参数中可以配置executableFile(如执行其他的脚手架命令): https://github.com/tj/commander.js/#stand-alone-executable-subcommands
//   .command('install [name]', 'install package', {
//     executableFile: 'ppk-cli'
//   })
//   .action((...args) => {
//     console.log(args);
//   })
//   .alias('i');

// program
//   .arguments('<username> [password]')
//   .description('test command', {
//     username: 'command',
//     password: 'password'
//   }) // description中的第二个参数可以在help中描述参数
//   .action(function () {
//     // cmd, options, cmdObj
//     // console.log('arguments', arguments);
//   });

// 1. 自定义help信息:
// console.log(program.helpInformation());
// program.helpInformation = function () {
//   return '';
// };
// program.on('--help', function () {
//   console.log('your help information');
// });
// program.addHelpText('after', `
// Example call: 
//   $ custom-help --help
// `);

// program.helpInformation = function () {
//   return 'your help information';
// };

// 2. 实现debug模式
program.on('option:debug', () => {
  console.log('debug', program.opts().debug);
});

// 3. 对未知命令监听
// https://github.com/tj/commander.js/#custom-event-listeners
program.on('command:*', function (operands) {
  console.error('unknown command:' + operands[0]);
  const availableCommands = program.commands.map(cmd => cmd.name());
  console.log(`available commands: ${availableCommands.join(', ')}`);
});

program.parse(process.argv);