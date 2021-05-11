class Person {
  constructor (public name: string) {

  }

  eat () {

  }
}

type IPerson = typeof Person

const createPerson = (Constructor: IPerson) => {
  return new Constructor('IKj0');
};

const person = createPerson(Person);

export {};