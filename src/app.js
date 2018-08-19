import Vue from 'vue'
// Button组件
import Button from './button.vue'
import ButtonGroup from './button-group'

import Icon from './icon'

// Input组件
import Input from './input'

// 栅格组件
import Col from './col'
import Row from './row'

// 布局组件
import Layout from './layout'
import Content from './content'
import Header from './header'
import Footer from './footer'
import Sider from './sider'

// tabs组件
import Tabs from './globalTabs/tabs'
import TabsNav from './globalTabs/tabsNav'
import TabsContent from './globalTabs/tabsContent'
import TabsItem from './globalTabs/tabsItem'
import TabsPane from './globalTabs/tabsPane'

// popover弹出框组件
import Popover from './popover/popover'

// toast组件
import Plugin from './plugin'

// 折叠面板
import Collapse from './collapse/collapse'
import CollapseItem from './collapse/collapseItem'

Vue.use(Plugin)

Vue.component('g-button', Button)
Vue.component('g-button-group', ButtonGroup)
Vue.component('g-icon', Icon)

Vue.component('g-input', Input)

Vue.component('g-row', Row)
Vue.component('g-col', Col)

Vue.component('g-layout', Layout)
Vue.component('g-content', Content)
Vue.component('g-header', Header)
Vue.component('g-footer', Footer)
Vue.component('g-sider', Sider)

Vue.component('g-tabs', Tabs)
Vue.component('g-tabs-nav', TabsNav)
Vue.component('g-tabs-content', TabsContent)
Vue.component('g-tabs-item', TabsItem)
Vue.component('g-tabs-pane', TabsPane)

Vue.component('g-popover', Popover)

Vue.component('g-collapse', Collapse)
Vue.component('g-collapse-item', CollapseItem)

new Vue({
  el: '#app',
  data () {
    return {
      loading1: false,
      msg: 'hi',
      selected: ['3'],
      selected1: ['1'],
    }
  },
  mounted () {
  },
  methods: {
    inputChange (e) {
      console.log('e', e.target.value)
    },
    showToast1 () {this.showToast('top')},
    showToast2 () {this.showToast('middle')},
    showToast3 () {this.showToast('bottom')},
    showToast (position) {
      this.$toast({
        message: '服务器出小差了',
        closeButton: {
          text: '关闭',
          onCancel () {
            console.log('toast测试')
          }
        },
        position,
      })
    },
    clickEvent (data) {
      console.log('click', data)
      // this.selected = data
      console.log('data', this.selected)
      this.selected = data
    },
    handleClick () {
      console.log('yyy')
    },
    xxxx () {
      console.log('xxx')
    }
  }
})
