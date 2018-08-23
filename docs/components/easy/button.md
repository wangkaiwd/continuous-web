# `button` - 按钮
常用的一些基本操作按钮

## 基础用法
<ClientOnly>
  <easy-button></easy-button>
</ClientOnly>

示例demo:
```html
<g-button icon="setting">按钮</g-button>
<g-button :loading="true">按钮</g-button>
<g-button icon="thumbs-up">按钮</g-button>
<g-button icon="success" icon-position="right">按钮</g-button>

<g-button-group>
  <g-button icon="left">前进</g-button>
  <g-button icon="right" icon-position="right">后退</g-button>
</g-button-group>
```

## API
按钮的属性说明：

属性|说明|类型|默认值  
---|---|---|---  
icon| 设置按钮的图标|string|-  
loading| 设置按钮载入状态|boolean| false
iconPosition|设置按钮图标的位置|string| left

`button-group`组件可以支持将多个按钮进行组合使用

## 知识总结
### css
#### 1. 用`em`来作为元素大小的计量单位  
```css
.g-button {
 /*左右的内边距为1个字的大小*/
 padding: 0 1em;   
}
```
有时候，我们并不用关心一个元素的宽高，只要它空出一个字的位置就可以。这样可以
比较好的把握距离。
   


