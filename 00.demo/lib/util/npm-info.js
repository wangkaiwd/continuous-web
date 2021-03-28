const axios = require('axios');
const urlJoin = require('url-join');
const getNpmInfo = (pkgName, registry) => {
  registry = registry || getDefaultRegistry();
  const apiUrl = urlJoin(registry, pkgName);
  return axios(apiUrl);
};

const getDefaultRegistry = (origin = false) => {
  return origin ? `http://registry.npmjs.org` : `https://registry.npm.taobao.org/`;
};

module.exports = {
  getNpmInfo
};