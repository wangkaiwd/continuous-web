# `grid` - 栅格布局
通过基础的24分栏，迅速简便地创建布局
## 基础用法
<ClientOnly>
  <easy-grid></easy-grid>
</ClientOnly>

## 知识总结

### `CSS`
### 1. 使用`scss`循环创建`css`
通过`scss`循环来创建上栅格布局中每一份所占据的宽度比例，以及在添加`offset`属性进行
位置偏移时的偏移量计算
```scss
@for $n from 1 through 24 {
  &.span-#{$n} {width: ($n / 24) * 100%;}
  /*设置为百分比的时候是相对于父元素的宽度*/
  &.offset-#{$n} {margin-left: ($n / 24) * 100%;}
}
```
转换为对应的`CSS`
```css
.global-col.span-1 {
  width: 4.16667%; 
}
.global-col.offset-1 {
  margin-left: 4.16667%; 
}
.global-col.span-2 {
  width: 8.33333%; 
}
.global-col.offset-2 {
  margin-left: 8.33333%; 
}
.global-col.span-3 {
  width: 12.5%; 
}
.global-col.offset-3 {
  margin-left: 12.5%; 
}
.global-col.span-4 {
  width: 16.66667%; 
}
...
```
### `Vue`
