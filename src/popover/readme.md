## 项目中准确获取元素的宽高
> 高度计算方法:
> 1. `box-sizing:border-box`: 高度 = `padding`+`border`+内容高度
> 2. `box-sizing:content-box`: 高度 = 内容高度（`padding`和`border`会另外占据高度，导致元素最终高度会被`padding`和`border`撑开） 

* `scrollHeight`: `padding`+内容高度
* `offsetHeight`:
* `clientHeight`:
* `getBoundingClientRect.height`: