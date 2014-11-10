'use strict';
var demand = require('../../lib/demand');
var demands = require('../../lib/demands');
var gulp = require('gulp');
var defaults = require('../../defaults').defaults;
var fs = require('fs');

module.exports = function (options) {
  options = options || {};
  var source = options.source || ['./test-data/scss/**/*.scss',
    './test-data/scss/*.scss'
  ];
  var destination = options.destination || './www/css';

  return function () {
    demands(['gulp-sass', 'gulp-minify-css', 'gulp-connect']);

    var sass = demand('gulp-sass');
    var minifyCSS = demand('gulp-minify-css');
    var connect = demand('gulp-connect');

    gulp.src(source)
      .pipe(sass({
        errLogToConsole: true
      }))
      .pipe(minifyCSS())
      .pipe(gulp.dest(destination))
      .pipe(connect.reload());
    console.log('[CSS] minifying'.yellow);
  };
};