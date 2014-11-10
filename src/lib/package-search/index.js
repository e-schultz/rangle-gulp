'use strict';

module.exports = function (packageName) {
  var pkg;
  try {
    var path = process.cwd() + '/node_modules/' + packageName;
    pkg = require(path);
  } catch (err) {
    pkg = null;
  }
  return pkg;
};