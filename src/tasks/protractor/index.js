'use strict';
var demand = require('../../lib/demand');
var gulp = require('gulp');
var logger = require('../../lib/rg-logger').getLogger();
var defaults = require('../../defaults');

module.exports = exports = function (options) {


  options = options || {};
  var files = options.vendor || [];
  files = files.concat(options.files || defaults.serverE2ETestScripts);

  logger.debug('Setting up a protractor task to run on the following files:');
  files.forEach(function (file) {
    logger.debug('  ', file);
  });

  return function (cb) {

    var gulpProtractor = demand('gulp-protractor');
    var protractor = gulpProtractor.protractor;

    // Be sure to return the stream
    return gulp.src(files)
      .pipe(protractor({
        configFile: options.protractorConf ||
          'client/testing/protractor.conf.js',
        args: ['--baseUrl', options.baseUrl]
      }))
      .on('error', function (err) {
        // Make sure failed tests cause gulp to exit non-zero
        throw err;
      })
      .on('end', function () {
        console.log('Donnnn');
      });
  };

};