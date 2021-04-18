const LOWEST_NODE_VERSION = 'v12.0.0';
const DEFAULT_CLI_HOME = '.ppk-cli';

const TEMPLATE_INFO = [
  {
    templateName: 'vue3-vite-standard-template',
    npmName: 'vue3-vite',
    version: '^1.0.0'
  },
  {
    templateName: 'vue3-cli-standard-template',
    npmName: 'vue3-vuecli',
    version: '^1.0.0'
  }
];

module.exports = {
  LOWEST_NODE_VERSION,
  DEFAULT_CLI_HOME,
  TEMPLATE_INFO
};