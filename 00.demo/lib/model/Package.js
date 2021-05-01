const pkgDir = require('pkg-dir').sync;
const path = require('path');

// 进行package的相关操作
class Package {
  constructor (options = {}) {
    this.targetPath = options.targetPath;
    this.name = options.name;
    this.version = options.version;
  }

  exist = () => {

  };

  install = () => {

  };
  update = () => {

  };
  // 1. get package.json file information
  // 2. find main field: https://docs.npmjs.com/cli/v7/configuring-npm/package-json#main
  getEntryFile = () => {
    const rootDir = pkgDir(this.targetPath);
    const pkgPath = path.resolve(rootDir, 'package.json');
    const pkgFile = require(pkgPath);
    if (pkgFile && pkgFile.main) {
      return path.resolve(rootDir, pkgFile.main);
    }
  };
}

module.exports = Package;