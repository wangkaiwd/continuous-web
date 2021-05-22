"use strict";
exports.__esModule = true;
// 原理：编译后就是自执行函数，将命名空间名字作为参数传入
// 命名空间：解决命名冲突的问题
var Home1;
(function (Home1) {
    var Dog = /** @class */ (function () {
        function Dog() {
        }
        return Dog;
    }()); // 需要导出才能使用
    Home1.Dog = Dog;
})(Home1 || (Home1 = {}));
var Home2;
(function (Home2) {
    var Dog = /** @class */ (function () {
        function Dog() {
        }
        return Dog;
    }());
})(Home2 || (Home2 = {}));
(function (Home1) {
    Home1.a = 'abc';
    var Inner;
    (function (Inner) {
        Inner.b = 'def';
    })(Inner = Home1.Inner || (Home1.Inner = {}));
})(Home1 || (Home1 = {}));
console.log(Home1.Inner.b);
console.log(Home1.a);
