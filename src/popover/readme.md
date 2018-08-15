## 项目中准确获取元素的宽高
> 高度计算方法:
> 1. `box-sizing:border-box`: 元素本身高度 = `padding`+`border`+内容高度
> 2. `box-sizing:content-box`: 总高度 = 元素本身高度 + `padding` + `border`（`padding`和`border`会另外占据高度，导致元素最终高度会被`padding`和`border`撑开） 

* `scrollHeight`: `padding` + 元素本身高度 
* `offsetHeight`: `padding`+`border`+ 元素本身的高度
* `clientHeight`: `padding`+ 元素本身高度   
* `getBoundingClientRect.height`: `padding`+`border`+元素本身高度

### Element.getBoundingClientRect()
```js
const box = document.getElementsByClassName('box')[0]
box.getBoundingClientRect()
```
```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  /*box-sizing: content-box;*/
}

.box {
  width: 200px;
  height: 200px;
  background-color: pink;
  padding: 20px;
  border: 10px solid red;
}
```
下面是通过设置`box-sizing:border-box;`得到的结果  
![border-box](../../images/border-box-test.png)  

下面是通过设置`box-sizing:content-box;`得到的结果
![content-box](../../images/content-box-test.png)

### 总结
我们大多数情况下回设置`box-sizing: border-box;`来进行页面布局，防止内容因为`padding`和`border`出现变形
，所以准确获取元素的高度的方法为：
```js
const {height} = box.getBoundingClientRect();
const height = box.offsetHeight;
```

当设置`box-sizing: content-box;`来进行页面布局，准确获取元素的高度的方法为：  
```js
// 内容会被padding和border撑开，获得的值会比实际得到的值要大
const height = box.getBoundingClientRect().height
const height = box.offsetHeight
```
## 项目中获取元素在页面中的位置