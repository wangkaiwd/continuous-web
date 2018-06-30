import Vue from 'vue'
import Button from './Button.vue';
import ButtonGroup from './button-group'
import Icon from './icon.vue'

Vue.component('g-button', Button);
Vue.component('g-icon', Icon);
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
import chai from 'chai';
import spies from 'chai-spies'

chai.use(spies);

const expect = chai.expect;
//根据每个传入的参数进行测试
{
  const Constructor = Vue.extend(Button);
  const vm = new Constructor({
    propsData: {
      icon: "setting"
    }
  });
  vm.$mount();
  let useElement = vm.$el.querySelector('use');
  const href = useElement.getAttribute('xlink:href');
  expect(href).to.eq('#i-setting');
  vm.$el.remove();
  vm.$destroy();
}
{
  const Constructor = Vue.extend(Button);
  const button = new Constructor({
    propsData: {
      icon: "setting",
      loading: true,
    }
  });
  button.$mount();
  let useElement = button.$el.querySelector('use');
  const href = useElement.getAttribute('xlink:href');
  expect(href).to.eq('#i-loading');
  button.$el.remove();
  button.$destroy();
}
{
  const div = document.createElement('div');
  document.body.appendChild(div);
  const Constructor = Vue.extend(Button);
  const vm = new Constructor({
    propsData: {
      icon: "setting",
      loading: true,
    }
  });
  vm.$mount(div);
  /**
   * @desc
   *  得到浏览器最终计算出来的样式规则（style只能获取行内样式）,
   *  最终样式信息：各种css样式叠加后的结果
   * @param element：节点对象
   * @param pseudo: 当前当前元素的伪元素
   * */
  const svg = vm.$el.querySelector('svg');
  //元素出现在页面之后才能获取到css样式
  const {order} = window.getComputedStyle(svg);
  /**
   * 这里要和字符串0进行笔记
   *  1. flex的order属性不写默认为0
   *  2. 所有的css属性都是字符串
   * */
  expect(order).to.eq("0");
  vm.$el.remove();
  vm.$destroy();
}

{
  const div = document.createElement('div');
  document.body.appendChild(div);
  const Constructor = Vue.extend(Button);
  const vm = new Constructor({
    propsData: {
      icon: "setting",
      loading: true,
      iconPosition: "right",
    }
  });
  vm.$mount(div);
  const svg = vm.$el.querySelector('svg');
  //元素出现在页面之后才能获取到css样式
  const {order} = window.getComputedStyle(svg);
  expect(order).to.eq("1");
  vm.$el.remove();
  vm.$destroy();
}
{
  const Constructor = Vue.extend(Button);
  const vm = new Constructor({
    propsData: {
      icon: "setting",
      loading: true,
      iconPosition: "right",
    }
  });
  vm.$mount();
  let spy = chai.spy(function () {
  })
  //$el:Vue实例使用的根DOM元素
  const button = vm.$el;
  vm.$on('click', spy)
  button.click();
  expect(spy).to.have.been.called();
  vm.$destroy();
}