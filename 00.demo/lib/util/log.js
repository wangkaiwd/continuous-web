const log = require('npmlog');
const colors = require('colors');
const LOG_LEVEL = process.env.LOG_EVEL;
log.heading = 'ppk-cli';
log.headingStyle = { fg: 'green', bg: 'black' };
log.level = LOG_LEVEL || 'info';
log.addLevel('success', 2200, { fg: 'green', bold: true });

const cliLog = Object.create(log);

const logOptions = [
  { type: 'info', color: 'cyan' },
  { type: 'success', color: 'green' },
  { type: 'warn', color: 'yellow' },
  { type: 'notice', color: 'blue' },
  { type: 'error', color: 'red' }
];
logOptions.forEach(({ type, color }) => {
  cliLog[type] = function (msg) {
    return log[type]('', colors[color](msg));
  };
});
module.exports = cliLog;