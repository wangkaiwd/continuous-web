interface ICompany {
  name: string;
  address: string;
}

interface Person {
  name: string;
  age: number;
  company: ICompany;
}

// 递归的Partial
type Partial<T> = {
  [K in keyof T]?: T[K] extends object ? Partial<T[K]> : T[K]
}

type MyPerson = Partial<Person>

const person: MyPerson = {
  company: {}
};

type Required<T> = {
  [K in keyof T]-?: T[K]
}

type MyRequired = Required<MyPerson>
const person1: MyRequired = {
  name: '1',
  age: 1,
  company: {}
};

type Readonly<T> = {
  readonly [K in keyof T]: T[K]
}

type MyReadonly = Readonly<Person>

// type Pick<T, U extends keyof T> = {
//   [K in U]: T[K]
// }

type MyPick = Pick<Person, 'name' | 'age'>

type Omit<T, U extends keyof T> = Pick<T, Exclude<keyof T, U>>

type MyOmit = Omit<Person, 'name' | 'age'>

// string | number | symbol
// type b = keyof any;

type Record<T extends keyof any, U> = {
  [K in T]: U
}

type MyRecord = Record<string, any>

export {};

// Exclude
// ReturnType
// Partial
// Pick
// Omit
// Record