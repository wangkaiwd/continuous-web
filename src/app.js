import Vue from 'vue'
// Button组件
import Button from './button.vue'
import ButtonGroup from './button-group'

// Input组件
import Input from './input'

// 栅格组件
import Col from './col'
import Row from './row'

import Layout from './layout'
import Content from './content'
import Header from './header'
import Footer from './footer'
import Sider from './sider'

import Plugin from './plugin'

Vue.use(Plugin)

Vue.component('g-button', Button)
Vue.component('g-button-group', ButtonGroup)

Vue.component('g-input', Input)

Vue.component('g-row', Row)
Vue.component('g-col', Col)

Vue.component('g-layout', Layout)
Vue.component('g-content', Content)
Vue.component('g-header', Header)
Vue.component('g-footer', Footer)
Vue.component('g-sider', Sider)

new Vue({
  el: '#app',
  data () {
    return {
      loading1: false,
      msg: 'hi'
    }
  },
  mounted () {
    this.showToast()
  },
  methods: {
    inputChange (e) {
      console.log('e', e.target.value)
    },
    showToast () {
      this.$toast({
        message: 'I am toast',
        closeButton: {
          text: '关闭',
          onCancel () {
            console.log('toast测试')
          }
        }
      })
    }
  }
})
