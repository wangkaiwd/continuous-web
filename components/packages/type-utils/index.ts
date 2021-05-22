import { App } from 'vue';

export type Install = {
  install (app: App, ...options: any[]): any;
}