interface TestProps {
  name: string,
  age: number
}

type Keys = keyof TestProps

type Mapish = {
  [k: string]: boolean;
}

// M is string|number, number will coerce to a string in object key
// obj[0] => obj["0"]
type M = keyof Mapish