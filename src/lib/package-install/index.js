'use strict';

var fs = require('fs');
var deasync = require('deasync');
var cp = require('child_process');
var log = require('../../lib/rg-logger').getLogger();


function confirmInstall(pkgName) {
  process.stdout.write(
    '[' + pkgName + '] is a required package, install? [Y/n]: ');
  var buf = new Buffer(20);
  buf.fill();
  fs.readSync(0, buf, 0, 20);
  if (buf.toString().toUpperCase().replace(/[\0\n]/g, '') !== 'Y') {
    return false;
  } else {
    return true;
  }
}

function doInstall(pkgName) {
  var exec = deasync(cp.exec);
  log.info('Installing......');
  log.info(exec('npm install --save-dev ' + pkgName));
  log.info('done');
}

module.exports = function (pkgName) {
  if (confirmInstall(pkgName)) {
    doInstall(pkgName);
    return true;
  } else {
    return false;
  }

};
