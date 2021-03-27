const log = require('npmlog');
const LOG_LEVEL = process.env.LOG_EVEL;
log.heading = 'ppk';
log.level = LOG_LEVEL || 'info';
// log.addLevel('success', 2200, { fg: 'green', bold: true });
// log.success('cli', 'success');

module.exports = log;