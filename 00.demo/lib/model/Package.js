const pkgDir = require('pkg-dir').sync;
const path = require('path');
const npmInstall = require('npminstall');
const fs = require('fs');
const fsp = require('fs/promises');
const { getDefaultRegistry, getNpmLatestVersion } = require('../util/npm-info');

// 进行package的相关操作
// support local package and npm package
class Package {
  constructor (options = {}) {
    this.ready(options);
  }

  ready = (options) => {
    this.targetPath = options.targetPath;
    this.storeDir = options.storeDir;
    this.name = options.name;
    this.version = options.version;
    this.registry = getDefaultRegistry();
    this.cacheFilePrefix = this.name.replace('/', '_');
  };

  getCacheFile = (version = this.version) => {
    // _vue3-vite@0.0.0@vue3-vite
    return path.resolve(this.storeDir, `_${this.cacheFilePrefix}@${version}@${this.name}`);
  };

  prepare = async () => {
    // create cache directory ahead of time avoid directory not exists
    if (this.storeDir && !fs.existsSync(this.storeDir)) {
      await fsp.mkdir(this.storeDir, { recursive: true });
    }
    if (this.version === 'latest') {
      this.version = await getNpmLatestVersion(this.name, this.registry);
    }
  };
  exist = () => {
    if (this.storeDir) {
      return fs.existsSync(this.getCacheFile());
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
    return this.getCacheFile();
  };

  update = async () => {
    const latestVersion = await getNpmLatestVersion(this.name, this.registry);
    // check current version whether newest version
    if (latestVersion !== this.version) {
      this.version = latestVersion;
      await this.install();
    }
    return this.getCacheFile();
  };
  // 1. get package.json file information
  // 2. find main field: https://docs.npmjs.com/cli/v7/configuring-npm/package-json#main
  // 3. compatible path of mac and windows
  getEntryFile = () => {
    let filePath = '';
    if (this.storeDir) {
      filePath = this.getCacheFile();
    } else {
      filePath = this.targetPath;
    }
    const rootDir = pkgDir(filePath);
    const pkgPath = path.resolve(rootDir, 'package.json');
    const pkgFile = require(pkgPath);
    if (pkgFile && pkgFile.main) {
      return path.resolve(rootDir, pkgFile.main);
    }
  };
}

module.exports = Package;