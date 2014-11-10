/* global require, console */

'use strict';

/* global require */
//var rekuire = require('./lib/rekuire');
//var packageInstall = require('./lib/package-install');

var gulp = require('gulp');
var winston = require('winston');
var fs = require('fs');

var connect = require('gulp-connect');
var watch = require('gulp-watch');
var rgLogger = require('./lib/rg-logger');
var logger = rgLogger.getLogger('info');
var defaults = require('./defaults').defaults;


// Makes a task that runs Karma.
exports.karma = require('./tasks/karma').karma;
exports.karmaWatch = require('./tasks/karma').karmaWatch;
exports.mocha = require('./tasks/mocha');
exports.webDriverUpdate = require('./tasks/webDriverUpdate');
exports.protractor = require('./tasks/protractor');
exports.jshint = require('./tasks/jshint');
exports.beautify = require('./tasks/beautify');
exports.concatAndUglify = require('./tasks/concatAndUglify');
exports.nodemon = require('./tasks/nodemon');
exports.sass = require('./tasks/sass');
exports.cordovaIcons = require('./tasks/cordovaIcons');

exports.setLogLevel = function (level) {
  logger = rgLogger.getLogger(level);
};

exports.connectWatch = function (options) {
  options = options || {};
  var root = options.root || 'www';
  var port = options.port || 3000;
  var livereload = options.livereload || true;
  // Files to watch for live re-load
  var glob = options.glob || ['./www/**/*.html', './www/**/*.js'];

  connect.server({
    root: root,
    port: port,
    livereload: livereload
  });

  console.log('[CONNECT] Listening on port 3000'.yellow.inverse);

  // Watch HTML and JS
  console.log('[CONNECT] Watching HTML and JS files for live-reload'.blue);
  watch({
      glob: glob
    })
    .pipe(connect.reload());
};