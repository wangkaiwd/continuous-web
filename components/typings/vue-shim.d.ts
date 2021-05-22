import { defineComponent } from 'vue';
import { Install } from '@ppk-ui/type-utils';

declare module '*.vue' {
  const component: ReturnType<typeof defineComponent> & Install;
  export default component;
}