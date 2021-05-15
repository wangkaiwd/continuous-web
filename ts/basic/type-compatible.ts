// basic type
type MyStr = { toString: () => string }

const str: MyStr = 'hello';

// interface
interface IVegetable {
  color: string;
  taste: string;
}

interface ITomato {
  color: string;
  taste: string;
  size: string;
}

let vegetable: IVegetable;
let tomato: ITomato;

tomato = {
  color: 'red',
  taste: 'sweet',
  size: 'small'
};
vegetable = tomato;
// is this a bug?
// console.log(vegetable.size);

// function
let sum1 = (a: number, b: number): number => a + b;
let sum2 = (a: number): number => a;
sum1 = sum2;
// typescript need to two parameters?
// console.log(sum1(1, 2));

// 类型的赋值可能会发生兼容性
function forEach<T> (arr: T[], cb: (item: T, index: number, arr: T[]) => void) {
  for (let i = 0; i < arr.length; i++) {
    cb(arr[i], i, arr);
  }
}

// cb中传入1个参数，2个参数，3个参数都是可以的
// 那这里为什么不用可选类型来限定呢？
forEach([1, 2, 3, 4], (item, index, arr) => {
  console.log(item);
});

// 函数参数为联合类型
function getType (cb: (val: string | number) => string | number) {
  cb('1');
}

// 注意：回调函数的类型会进行兼容
//  1. 传入函数时候参数定义的类型要包含函数定义时类型型
//  2. 传入函数返回值的类型要被函数定义时返回值的类型包含
//  3. 传入函数时的参数可以少于定义函数类型时参数的个数(forEach)
getType((val: string | number | boolean) => {
  return 1;
});