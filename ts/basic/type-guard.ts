// 可以用于判断类型的js语句

// 1. typeof (Simple Data Type)
// 2. instance of (Object)
// 3. constructor (Object)
// 4. Object.prototype.toString.call (all-round)

// 也可以用in来进行不同object类型区分

function fn (val: string | number) {
  if (typeof val === 'string') {
    val.replace('', '');
  } else {
    val.toFixed(2);
  }
}

export {};