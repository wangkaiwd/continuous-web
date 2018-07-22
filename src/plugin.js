import Toast from './toast'

export default {
  install (Vue, options) {
    Vue.prototype.$toast = function ({message, closeButton, enableHTML, position}) {
      // const div = document.createElement('div')
      // div.innerHTML = '我是toast'
      // document.body.appendChild(div)

      // Vue.extend(options):使用基础Vue构造器，创建一个子类。options包含组件属性的对象(Vue中的子组件)
      // options中data选项必须是函数
      const Constructor = Vue.extend(Toast)
      let toast = new Constructor({
        propsData: {message, closeButton, enableHTML, position}
      })
      //可以使用vm.$mount()手动地挂载一个未挂载的实例，如果没有提供参数，模板将被渲染为文档之外的元素
      //并且你必须使用原生DOM API把它插入文档中
      toast.$mount()
      // $el:Vue实例的根dom元素
      const toastDiv = document.querySelector('.global-toast')
      toastDiv && toastDiv.remove()
      document.body.appendChild(toast.$el)
    }
  }
}