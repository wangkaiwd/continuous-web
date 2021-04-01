const axios = require('axios');
const urlJoin = require('url-join');
const semver = require('semver');
const getNpmInfo = (pkgName, registry) => {
  registry = registry || getDefaultRegistry();
  const apiUrl = urlJoin(registry, pkgName);
  return axios(apiUrl);
};

const getNpmVersions = (pkgName, registry) => {
  return getNpmInfo(pkgName, registry).then((res) => {
    const { data } = res;
    if (data?.versions) {
      return Object.keys(data.versions);
    } else {
      return [];
    }
  });
};

const getSemverVersions = (baseVersion, pkgName, registry) => {
  return getNpmVersions(pkgName, registry).then((versions) => {
      return versions
        .filter((v) => semver.satisfies(v, `^${baseVersion}`))
        .sort((a, b) => semver.gt(a, b)); // 相当于 a > b return true, Number(true) = 1 > 0, a和b进行位置交换，正序
    }
  );
};

const getDefaultRegistry = (origin = false) => {
  return origin ? `http://registry.npmjs.org` : `https://registry.npm.taobao.org/`;
};

module.exports = {
  getNpmInfo,
  getSemverVersions
};