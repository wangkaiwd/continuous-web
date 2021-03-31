const toType = (value) => {
  const objProto = Object.prototype;
  return objProto.call(value).slice(8).toLowerCase();
};
const isObject = (o) => {
  return toType(o) === 'object';
};

module.exports = {
  isObject
};