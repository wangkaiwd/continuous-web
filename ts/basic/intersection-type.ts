function mixin<T extends object, K extends object> (o1: T, o2: K): T & K {
  return { ...o1, ...o2 };
}

const result = mixin({ name: 'Ue7n', age: 571 }, { hobby: 'eat' });
const obj = Object.assign({}, { name: 'Ue7n', age: 571 }, { hobby: 'eat' });
export {};