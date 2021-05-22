import { App } from 'vue';
import Icon from './src/icon.vue';

Icon.install = (app: App, ...options: any[]): any => {
  app.component(Icon.name, Icon);
};

export default Icon;