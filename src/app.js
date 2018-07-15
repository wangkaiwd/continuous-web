import Vue from 'vue'
// Button组件
import Button from './button.vue'
import ButtonGroup from './button-group'

// Input组件
import Input from './input'

// 栅格组件
import Col from './col'
import Row from './row'

Vue.component('g-button', Button)
Vue.component('g-button-group', ButtonGroup)

Vue.component('g-input', Input)

Vue.component('g-row', Row)
Vue.component('g-col', Col)

new Vue({
  el: '#app',
  data () {
    return {
      loading1: false,
      msg: 'hi'
    }
  },
  methods: {
    inputChange (e) {
      console.log('e', e.target.value)
    }
  }
})
