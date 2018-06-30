import Vue from 'vue'
import Button from './Button.vue';
import ButtonGroup from './button-group'
import Icon from './icon.vue'
Vue.component('g-button', Button);
Vue.component('g-icon', Icon);
Vue.component('g-button-group',ButtonGroup);
new Vue({
  el: "#app",
  data() {
    return {
      loading1:false,
    }
  },
});
