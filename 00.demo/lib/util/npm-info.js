const axios = require('axios');
const urlJoin = require('url-join');
const semver = require('semver');
const getNpmInfo = (pkgName, registry) => {
  registry = registry || getDefaultRegistry();
  const apiUrl = urlJoin(registry, pkgName);
  return axios(apiUrl).catch((e) => {
    console.log('err', e);
    return Promise.reject(e);
  });
};

const getNpmVersions = (pkgName, registry) => {
  return getNpmInfo(pkgName, registry).then((res) => {
    const { data } = res;
    if (data?.versions) {
      return Object.keys(data.versions).sort((a, b) => {
        if (semver.lt(a, b)) {
          return 1;
        } else if (semver.gt(a, b)) {
          return -1;
        } else {
          return 0;
        }
      });
    } else {
      return [];
    }
  });
};

const getSemverVersions = (baseVersion, pkgName, registry) => {
  return getNpmVersions(pkgName, registry).then((versions) => {
      return versions
        .filter((v) => semver.satisfies(v, `^${baseVersion}`));
    }
  );
};

const getNpmLatestVersion = (pkgName, registry) => {
  return getNpmVersions(pkgName, registry)
    .then((versions) => {
      return versions[0];
    });
};

const getDefaultRegistry = (origin = false) => {
  return origin ? `http://registry.npmjs.org` : `https://registry.npm.taobao.org/`;
};

module.exports = {
  getNpmInfo,
  getSemverVersions,
  getDefaultRegistry,
  getNpmLatestVersion
};