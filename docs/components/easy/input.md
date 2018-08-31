# `input` - 输入框
## 基础用法
<ClientOnly>
  <easy-input></easy-input>
</ClientOnly>

## API
输入框的属性说明：

属性|说明|类型|默认值  
---|---|---|---
value|输入框绑定值|string| _
disabled|是否禁用| boolean| false
readonly|是否只读| boolean| false
err | 错误提示信息| string | _
placeholder|输入框占位文本|string| 请输入内容

输入框事件说明：
1. 支持`change`事件
2. 支持双向数据绑定(`input`事件)

## 知识总结
### css
### Vue
#### 1. 让自己的`input`组件支持双向数据绑定
> 官网教程：
> 1. [在组件上使用`v-model`](https://cn.vuejs.org/v2/guide/components.html#%E5%9C%A8%E7%BB%84%E4%BB%B6%E4%B8%8A%E4%BD%BF%E7%94%A8-v-model)
> 2. [表单输入绑定](https://cn.vuejs.org/v2/guide/forms.html)

`v-model`: 在表单`input`,`textarea`及`select`元素上创建双向数据绑定。

在Vue中`input`的双向数据绑定：
```html
<!--text是定义在data中的数据-->
<input v-model="text">
```
`v-model`实际上是`Vue`为我们提供的一个语法糖，它的实现原理是通过： 
* `value`特性动态绑定到变量上
* 通过`input`事件在`value`改变的时候进行重新赋值
```js

```

**注意**：`v-model`会忽略所有表单元素的`value`,`checked`,`selected`特性的初始值，而
总是**将`Vue`实例的数据作为数据来源**。应该通过`javascript`在组件中的`data`选项中声名
初始值。

### 细节注意