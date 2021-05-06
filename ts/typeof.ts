const s = 'hello';

const n: typeof s = 'hello';

const f = (a: number, b: number): number => {
  return a + b;
};

type F = typeof f