const pkgDir = require('pkg-dir').sync;
const path = require('path');
const npmInstall = require('npminstall');
const fs = require('fs');
const { getDefaultRegistry, getNpmLatestVersion } = require('../util/npm-info');

// 进行package的相关操作
class Package {
  constructor (a) {
  }

  ready = async (options) => {
    this.targetPath = options.targetPath;
    this.storeDir = options.storeDir;
    this.name = options.name;
    this.version = await this.transferLatestVersion(options.version);
    this.registry = getDefaultRegistry();
    this.cacheFilePrefix = this.name.replace('/', '_');
  };

  get cacheFile () {
    // _vue3-vite@0.0.0@vue3-vite
    return path.resolve(this.storeDir, `_${this.cacheFilePrefix}@${this.version}@${this.name}`);
  }

  transferLatestVersion = async (version) => {
    if (version === 'latest') {
      return await getNpmLatestVersion(this.name, this.registry);
    }
    return version;
  };
  exist = () => {
    if (this.storeDir) {
      return fs.existsSync(this.cacheFile);
    } else {
      return fs.existsSync(this.targetPath);
    }
  };

  install = async () => {
    await npmInstall({
      // install root dir
      root: this.targetPath,
      // optional packages need to install, default is package.json's dependencies and devDependencies
      pkgs: [{ name: this.name, version: this.version }],
      registry: this.registry,
      storeDir: this.storeDir, // directory store real file which symbol link to
    }).catch((err) => {
      console.log('install error:', err);
    });
  };
  l;
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