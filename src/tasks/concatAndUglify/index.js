'use strict';
var demand = require('../../lib/demand');
var demands = require('../../lib/demands');
var gulp = require('gulp');
var defaults = require('../../defaults').defaults;

module.exports = function (options) {

  options = options || {};
  // have a way of registering deps - check/install all of them before first run?
  return function (cb) {

    demands(['gulp-filter', 'gulp-concat', 'gulp-uglify', 'gulp-rename']);

    var gulpFilter = demand('gulp-filter');
    var concat = demand('gulp-concat');
    var uglify = demand('gulp-uglify');
    var rename = demand('gulp-rename');



    var name = options.name || 'all';
    var distFolder = options.dest || 'client/dist';

    var filter = gulpFilter(function (file) {
      return !/\.test\.js$/.test(file.path);
    });

    return gulp.src(options.files || defaults.clientScripts)
      .pipe(filter)
      .pipe(concat(name + '.js'))
      .pipe(gulp.dest(distFolder))
      .pipe(rename(name + '.min.js'))
      .pipe(uglify())
      .pipe(gulp.dest(distFolder));

  };

};