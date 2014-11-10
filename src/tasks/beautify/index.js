'use strict';
var demand = require('../../lib/demand');
var gulp = require('gulp');
var defaults = require('../../defaults').defaults;
var fs = require('fs');

module.exports = function (options) {
  options = options || {};
  var jsBeautifyConfigFile = options.configFile || '.jsbeautifyrc';
  var jsBeautifyConfig = JSON.parse(fs.readFileSync(jsBeautifyConfigFile));
  var files = options.files || defaults.allScripts;
  return function () {
    var beautify = demand('gulp-js-beautify');
    files.forEach(function (path) {
      var dir = path.split('/')[0];
      gulp.src([path])
        .pipe(beautify(jsBeautifyConfig))
        .pipe(gulp.dest(dir));
    });
  };
};