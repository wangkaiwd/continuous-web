// const echo = <T> (arg: T): T => {
//   return arg;
// };
//
// 函数无法进行类型推导
// const result = echo(1);

// const swap = <T, U> (arr: [T, U]): [U, T] => {
//   return [arr[1], arr[0]];
// };
//
// const result = swap(['a', 1]);

// notice: here must be use type alias, use interface will occur error
// type TestBool = {
//   [key in Keys]: boolean
// }

// literal type
// const define variable which the value is not change, so it's type is a literal type 'hello'
// const msg = 'hello';

// let define variable can change after, so it's type is string
// let say = 'world';

