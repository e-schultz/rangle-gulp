'use strict';

var packageInstall = require('../package-install');
var log = require('../rg-logger').getLogger();
var packageSearch = require('../package-search');



module.exports = function (packageName) {

  var pkg = packageSearch(packageName);
  if (pkg === null) {
    if (packageInstall(packageName)) {
      pkg = packageSearch(packageName);
    } else {
      log.info('Unable to load required dependency, exiting.');
      process.exit();
    }
  }
  return pkg;

};