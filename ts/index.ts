const echo = (arg) => {
  return arg;
};

// 函数无法进行类型推导
const result = echo('str');

console.log(result);