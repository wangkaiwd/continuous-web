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

const expect = chai.expect;
{
  const Constructor = Vue.extend(Button);
  const button = new Constructor({
    propsData: {
      icon: "setting"
    }
  });
  button.$mount();
  let useElement = button.$el.querySelector('use');
  const href = useElement.getAttribute('xlink:href');
  expect(href).to.eq('#i-setting');
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
}
{
  const div = document.createElement('div');
  document.body.appendChild(div);
  const Constructor = Vue.extend(Button);
  const button = new Constructor({
    propsData: {
      icon: "setting",
      loading: true,
    }
  });
  button.$mount(div);
  /**
   * @desc
   *  得到浏览器最终计算出来的样式规则（style只能获取行内样式）,
   *  最终样式信息：各种css样式叠加后的结果
   * @param element：节点对象
   * @param pseudo: 当前当前元素的伪元素
   * */
  const svg = button.$el.querySelector('svg');
  //元素出现在页面之后才能获取到css样式
  const {order} = window.getComputedStyle(svg);
  /**
   * 这里要和字符串0进行笔记
   *  1. flex的order属性不写默认为0
   *  2. 所有的css属性都是字符串
   * */
  expect(order).to.eq("0");
}
