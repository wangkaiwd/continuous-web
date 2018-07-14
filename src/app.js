import Vue from 'vue'
// Button组件
import Button from './button.vue'
import ButtonGroup from './button-group'

// Input组件
import Input from './input'

Vue.component('g-button', Button)
Vue.component('g-button-group', ButtonGroup)

Vue.component('g-input', Input)

new Vue({
  el: '#app',
  data () {
    return {
      loading1: false,
    }
  },
})
