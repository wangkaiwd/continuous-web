## Commander 用法

### 基础用法

```javascript
program
  .name('ppk-cli')
  .usage('<command> [options]')
  .version('1.0.0')
  .option('-d, --debug', 'enable debug mode', false)
  .option('-e, --env-name <envName>', 'obtain environment variable');
```

通过`program.opts()`来获取到对应的选项参数对象

### command

使用`.command`添加一个命令，传入`{ isDefault: true }`可以指定默认执行的`command`

```javascript
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
```

### addCommand

```javascript
const service = new Command('service');
service
  .command('start [port]')
  .description('start a http static server')
  .option('-d, --directory <directory>', 'server serve directory')
  .action((port) => {
    console.log(port);
  });
program.addCommand(service);
```

### 自定义事件

自定义`help`信息

```javascript

```

`debug`模式

```javascript

```

对未知命令监听

```javascript

```