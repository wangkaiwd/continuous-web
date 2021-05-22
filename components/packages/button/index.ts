// vue 文件无法被typescript识别
import { App } from 'vue';
import Button from './src/button.vue';

Button.install = (app: App, ...options: any[]): any => {
  app.component(Button.name, Button);
};
export default Button;