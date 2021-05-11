interface IWithLength {
  length: number
}

function echoWithLength<T extends IWithLength> (args: T): T {
  // must own length property
  console.log(args.length);
  return args;
}

echoWithLength([1, 2, 3]);

type NonType<T> = T extends null | undefined ? never : T;

let demo1: NonType<string>;
let demo2: NonType<null>;
export {};