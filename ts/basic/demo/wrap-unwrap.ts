// vue3 中： const xxx = ref(10) => xxx.value, 模板里取值：xxx
const data = {
  name: 'zz',
  age: 18
};

interface Proxy<T> {
  get (): T;

  set (newVal: any): void;
}

type IProxify<T extends object> = {
  [K in keyof T]: Proxy<T[K]>
}

function proxify<T extends object> (obj: T): IProxify<T> {
  const result = {} as IProxify<T>;
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      let val = obj[key]; // T[Extract<keyof T, string>], keyof T => name | age,  (name | age) extends string is true
      result[key] = {
        get () {
          return val;
        },
        set (newVal) {
          val = newVal;
        }
      };
    }
  }
  return result;
}

const newData = proxify(data);
// console.log(newData.age.get());
// newData.age.set(10);
// console.log(newData.age.get());

type UnProxify<T extends object> = {
  [K in keyof T]: T[K]
}

function unProxify<T extends object> (obj: IProxify<T>): UnProxify<T> {
  const result = {} as UnProxify<T>;
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      result[key] = obj[key].get();
    }
  }
  return result;
}

const oldData = unProxify(newData);
// oldData.age = 10;
// console.log(oldData);

// 差集:Diff
// 交集:InterSection
// 合并：Merge(后面的类型要覆盖之前的类型)
// compute: 类型展开，方便提示

export {};