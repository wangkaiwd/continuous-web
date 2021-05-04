const LOWEST_NODE_VERSION = 'v12.0.0';
const DEFAULT_CLI_HOME = '.ppk-cli';

const TEMPLATE_TYPE_NORMAL = 'normal';
const TEMPLATE_TYPE_CUSTOM = 'custom';
const TEMPLATE_INFO = [
  {
    templateName: 'vue3-vite-standard-template',
    npmName: 'vue3-vite',
    version: '1.0.0',
    type: TEMPLATE_TYPE_NORMAL,
    installCommand: 'npm install',
    startCommand: 'npm run dev'
  },
  {
    templateName: 'vue3-cli-standard-template',
    npmName: 'vue3-vuecli',
    version: '1.0.0',
    type: TEMPLATE_TYPE_NORMAL,
    installCommand: 'npm install',
    startCommand: 'npm run serve'
  }
];
const WHITE_COMMANDS = ['npm', 'yarn', 'cnpm'];
const CACHE_DIR = 'dependencies';

module.exports = {
  LOWEST_NODE_VERSION,
  DEFAULT_CLI_HOME,
  TEMPLATE_INFO,
  CACHE_DIR,
  TEMPLATE_TYPE_NORMAL,
  TEMPLATE_TYPE_CUSTOM,
  WHITE_COMMANDS
};