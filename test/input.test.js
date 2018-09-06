const expect = chai.expect
import Vue from 'vue'
import Button from '../src/input.vue'

Vue.config.productionTip = false
Vue.config.devtools = false

describe('Input', () => {
  it('存在input', () => {
    expect(Input).to.exist
  })
  it('可以接收 value', () => {
    // Vue.extend:使用Vue构造器，创建一个‘子类’。参数是一个包含组件选项的对象
    const Constructor = Vue.extend(Input)
    const vm = new Constructor({
      propsData: {
        value: '1234'
      }
    }).$mount()
    const inputElement = vm.$el.querySelector('input')
    expect(inputElement.value).to.equal('1234')
  })
  it('可以接收 disabled', () => {
    const Constructor = Vue.extend(Input)
    const vm = new Constructor({
      propsData: {
        disabled: true
      }
    }).$mount()
    const inputElement = vm.$el.querySelector('input')
    expect(inputElement.disabled).to.equal(true)
  })

})

