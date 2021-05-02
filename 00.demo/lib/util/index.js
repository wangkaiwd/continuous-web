const path = require('path');
const toType = (value) => {
  const objProto = Object.prototype;
  return objProto.call(value).slice(8).toLowerCase();
};
const isObject = (o) => {
  return toType(o) === 'object';
};

const formatPath = (p) => {
  if (p && typeof p === 'string') {
    const separator = path.sep;
    if (separator === '\\') { // \：backslash is an escape character
      p = p.replace(/\\/, '/');
    }
  }
  return p;
};

module.exports = {
  isObject,
  formatPath
};