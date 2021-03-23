#!/usr/bin/env node
const yargs = require('yargs/yargs');
const cli = yargs(process.argv.slice(2));

const opts = {
  loglevel: {
    defaultDescription: 'info',
    describe: 'What level of logs to report.',
    type: 'string',
  },
  'reject-cycles': {
    describe: 'Fail if a cycle is detected among dependencies.',
    type: 'boolean',
  },
  'no-progress': {
    describe: 'Disable progress bars. (Always off in CI)',
    type: 'boolean',
  },
  progress: {
    // proxy for --no-progress
    hidden: true,
    type: 'boolean',
  },
  'no-sort': {
    describe: 'Do not sort packages topologically (dependencies before dependents).',
    type: 'boolean',
  },
  sort: {
    // proxy for --no-sort
    hidden: true,
    type: 'boolean',
  },
  'max-buffer': {
    describe: 'Set max-buffer (in bytes) for subcommand execution',
    type: 'number',
    requiresArg: true,
  },
};
// options: https://github.com/yargs/yargs/blob/master/docs/api.md#optionkey-opt
//
// argv: https://github.com/yargs/yargs/blob/master/docs/api.md#argv
//  Get the arguments as a plain old object.

const globalKeys = Object.keys(opts).concat(['help', 'version']);

const chain = cli.options(opts).group(globalKeys, 'Global Options:').option('ci', {
  hidden: true,
  type: 'boolean',
});
// $0: script name or node command
chain.usage('Usage: $0 <command> [options]')
  // .demandCommand(1, 'A command is required')
  .recommendCommands();
// 执行之后才能在命令行打印出对应的命令？
chain.argv;