// https://www.typescriptlang.org/docs/handbook/declaration-files/templates/global-modifying-module-d-ts.html
declare global {
  interface String {
    double (): string;
  }
}

String.prototype.double = function () {
  return '';
};

export {};