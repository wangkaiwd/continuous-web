// 通过declare来声明文件，这个声明只是为了防止报错，没有任何意义
declare function jQuery (selector: string): {
  css (val: object): void
};

// 支持import 'xxx.png'
declare module '*.png' {
  const png: any;
  export default png;
}

// declare merge: function with namespace
// https://www.typescriptlang.org/docs/handbook/declaration-merging.html#merging-namespaces-with-classes-functions-and-enums
declare namespace jQuery {
  namespace fn {
    function extend (): void
  }
}