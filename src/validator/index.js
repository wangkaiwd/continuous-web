// 这里涉及到js一个基础知识问题
const obj = {}
ensureObject(obj.x)
console.log(obj.x) // undefined

// a = obj.x  // a = undefined
// 这里obj.x并不是一个引用类型，所以赋值给a的是obj.x的值，而不是地址
// 所以复杂数组类型会通过地址而公用同一片内存空间
function ensureObject (a) {
  a = {}
  console.log(a)
}