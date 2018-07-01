import Vue from 'vue'
import Button from './button.vue';
import ButtonGroup from './button-group'

Vue.component('g-button', Button);
Vue.component('g-button-group', ButtonGroup);

new Vue({
  el: "#app",
  data() {
    return {
      loading1: false,
    }
  },
});

//单元测试
// import chai from 'chai';
// import spies from 'chai-spies'
//
// chai.use(spies);
//
// const expect = chai.expect;
// //根据每个传入的参数进行测试
//
// try {
//
//   // 单元测试:作用域和断言
//   {
//     const Constructor = Vue.extend(Button)
//     const vm = new Constructor({
//       propsData: {
//         icon: 'setting'
//       }
//     })
//     vm.$mount()
//     let useElement = vm.$el.querySelector('use')
//     let href = useElement.getAttribute('xlink:href')
//     expect(href).to.eq('#i-setting')
//     vm.$el.remove()
//     vm.$destroy()
//   }
//   {
//     const Constructor = Vue.extend(Button)
//     const vm = new Constructor({
//       propsData: {
//         icon: 'setting',
//         loading: true
//       }
//     })
//     vm.$mount()
//     let useElement = vm.$el.querySelector('use')
//     let href = useElement.getAttribute('xlink:href')
//     expect(href).to.eq('#i-loading')
//     vm.$el.remove()
//     vm.$destroy()
//   }
//   {
//     const div = document.createElement('div')
//     document.body.appendChild(div)
//     const Constructor = Vue.extend(Button)
//     const vm = new Constructor({
//       propsData: {
//         icon: 'setting'
//       }
//     })
//     vm.$mount(div)
//     let svg = vm.$el.querySelector('svg')
//     let {order} = window.getComputedStyle(svg)
//     expect(order).to.eq('0')
//     vm.$el.remove()
//     vm.$destroy()
//   }
//   {
//     const div = document.createElement('div')
//     document.body.appendChild(div)
//     const Constructor = Vue.extend(Button)
//     const vm = new Constructor({
//       propsData: {
//         icon: 'setting',
//         iconPosition: 'right'
//       }
//     })
//     vm.$mount(div)
//     let svg = vm.$el.querySelector('svg')
//     let {order} = window.getComputedStyle(svg)
//     expect(order).to.eq('1')
//     vm.$el.remove()
//     vm.$destroy()
//   }
//   {
//     const Constructor = Vue.extend(Button)
//     const vm = new Constructor({
//       propsData: {
//         icon: 'settings',
//       }
//     })
//     vm.$mount()
//     let spy = chai.spy(function () {})
//
//     vm.$on('click', spy)
//     // 希望这个函数被执行
//     let button = vm.$el
//     button.click()
//     expect(spy).to.have.been.called()
//   }
// } catch (error) {
//   window.errors = [error]
// } finally {
//   if(window.errors) {
//     window.errors.forEach((error) => {
//       console.error(error.message)
//     })
//   }
// }