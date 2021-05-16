// 原理：编译后就是自执行函数，将命名空间名字作为参数传入
// 命名空间：解决命名冲突的问题
namespace Home1 {
  export class Dog {} // 需要导出才能使用
}

namespace Home2 {
  class Dog {}
}

namespace Home1 { // 重名命令空间会合并
  export const a = 'abc';
  export namespace Inner { // 命名空间可以无限嵌套
    export const b = 'def';
  }
}

console.log(Home1.Inner.b);
console.log(Home1.a);

export {};