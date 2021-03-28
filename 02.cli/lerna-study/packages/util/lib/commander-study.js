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
const service = new Command('service');

service
  .command('start [port]')
  .description('start a http static server')
  .option('-d, --directory <directory>', 'server serve directory')
  .action((port) => {
    console.log(port);
  });
program.addCommand(service);

program.parse(process.argv);