const pkgDir = require('pkg-dir').sync;
const path = require('path');
const npmInstall = require('npminstall');
const { getDefaultRegistry } = require('../util/npm-info');

// 进行package的相关操作
class Package {
  constructor (options = {}) {
    this.targetPath = options.targetPath;
    this.storeDir = options.storeDir;
    this.name = options.name;
    this.version = options.version;
  }

  exist = () => {

  };

  install = async () => {
    const registry = getDefaultRegistry();
    await npmInstall({
      // install root dir
      root: this.targetPath,
      // optional packages need to install, default is package.json's dependencies and devDependencies
      pkgs: [{ name: this.name, version: this.version },],
      registry,
      storeDir: this.storeDir, // directory store real file which symbol link to
    }).catch((err) => {
      console.log('install error:', err);
    });
  };
  update = () => {

  };
  // 1. get package.json file information
  // 2. find main field: https://docs.npmjs.com/cli/v7/configuring-npm/package-json#main
  // 3. compatible path of mac and windows
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