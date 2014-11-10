'use strict';

var packageInstall = require('../package-install');
var log = require('../rg-logger').getLogger();
var _ = require('lodash');
var packageSearch = require('../package-search');


module.exports = function (packages) {
  var missing = [];

  if (!_.isArray(packages)) {
    packages = [].push(packages);
  }

  packages.forEach(function (packageName) {
    var pkg = packageSearch(packageName);
    if (pkg === null) {
      missing.push(packageName);
    }
  });

  if (missing.length === 0) {
    return;
  } else {
    console.log('missing is?', missing);
    packageInstall(missing.join(' '));
  }


};
