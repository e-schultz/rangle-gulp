'use strict';
var logger = require('../../lib/rg-logger').getLogger();
var demand = require('../../lib/demand');
var defaults = require('../../defaults').defaults;
var gulp = require('gulp');

module.exports = function (options) {
  options = options || {};
  var files = options.files || defaults.serverTestScripts;
  options.reporter = options.reporter || 'nyan';
  options.throwError = options.throwError || false;
  options.errorHandler = options.errorHandler || function (err) {

    throw err;
  };

  return function () {
    var mocha = demand('gulp-mocha');

    gulp.src(files)
      .pipe(mocha({
        reporter: options.reporter
      })).on('error', options.errorHandler)
      .on('end', function () {
        console.log('Donnnn');
      });
  };
};