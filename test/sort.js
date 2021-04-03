const sort = (array, compareFn) => {
  selectionSort(array, compareFn);
};

const swap = (arr, i, j) => {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
};

// 选择
const selectionSort = (array, compareFn) => {
  for (let i = 0; i < array.length; i++) {
    let minI = i;
    for (let j = i + 1; j < array.length; j++) {
      compareFn(array[j], array[minI]);
      // 通过一个函数来进行比较
      if (compareFn(array[minI], array[j]) > 0) {
        minI = j;
      }
    }
    swap(array, i, minI);
  }
};
const arr = [4, 5, 7, 8, 1, 2, 6];
// compareFn函数的返回值最后会和0进行比对，如果 > 0, 说明初始值大于当前值，当前值可能要前移，升序排序
// 如果b - a > 0，说明初始值小于当前值，将初始值和当前值交换，最终初始值会变成最大值，降序排列

// 正序：a - b > 0, 要将a和b位置进行交换
// 倒序：b - a > 0, 要将a和b位置进行交换
// 当返回值为 a > b 时, true > 0 , 将a和b位置进行交换，正序
// 当返回值 a > b 时，返回 -1 > 0 , 位置不变，逆序
// 当返回值 a < b 时，返回1 > 0 , 将a和b进行交换，正序
// 最终会和0进行比较，如果是数值的话 a > b即 a - b > 0 , 这样理解会好一些
// sort(arr, (a, b) => a > b);
console.log(arr);