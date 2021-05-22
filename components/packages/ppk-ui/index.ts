import Button from '@ppk-ui/button';
import Icon from '@ppk-ui/icon';
import { App } from 'vue';

const components = [
  Button,
  Icon
];

const install = (app: App) => {
  components.forEach(component => {
    app.component(component.name, component);
  });
};

export default install;
