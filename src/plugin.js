import Toast from './toast'

export default {
  install (Vue, options) {
    Vue.prototype.$toast = function (message) {
      // const div = document.createElement('div')
      // div.innerHTML = '我是toast'
      // document.body.appendChild(div)

      // Vue.extend(options):使用基础Vue构造器，创建一个子类。options包含组件属性的对象(Vue中的子组件)
      // options中data选项必须是函数
      const Constructor = Vue.extend(Toast)
      let toast = new Constructor()
      console.log('toast', toast)
      toast.$slots.default = message
      toast.$mount()
      // $el:Vue实例的根dom元素
      document.body.appendChild(toast.$el)
    }
  }
}