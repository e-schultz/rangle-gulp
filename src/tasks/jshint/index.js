'use strict';
var demand = require('../../lib/demand');
var gulp = require('gulp');
var defaults = require('../../defaults').defaults;

module.exports = function (options) {
  options = options || {};

  return function () {
    var jshint = demand('gulp-jshint');
    gulp.src(options.files || defaults.allScripts)
      .pipe(jshint())
      .pipe(jshint.reporter('default'));
  };
};