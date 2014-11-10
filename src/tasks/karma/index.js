'use strict';
var logger = require('../../lib/rg-logger').getLogger();
var demand = require('../../lib/demand');
var demands = require('../../lib/demands');
var defaults = require('../../defaults').defaults;
var gulp = require('gulp');

function makeKarmaTask(action, options) {
  options = options || {};
  var files = options.vendor || [];
  files = files.concat(options.files || defaults.clientTestScripts);

  logger.debug('Setting up a karma task to run on the following files:');
  files.forEach(function (file) {
    logger.debug('  ', file);
  });

  return function () {
    // TODO: could look at the options file and parse out what's needed.

    demands(['gulp-karma', 'karma-mocha', 'karma-chai', 'karma-sinon',
      'karma-chrome-launcher', 'karma-phantomjs-launcher',
      'karma-html2js-preprocessor', 'karma-requirejs',
      'karma-script-launcher'
    ]);
    var karma = demand('gulp-karma');

    return gulp.src(files)
      .pipe(karma({
        configFile: options.karmaConf ||
          'client/testing/karma.conf.js',
        action: action
      }))
      .on('error', function (err) {
        // Make sure failed tests cause gulp to exit non-zero

        throw err;
      });

  };
}

var karmaTasks = {
  karma: function (options) {
    options = options || {};
    return makeKarmaTask('run', options);
  },
  karmaWatch: function (options) {
    options = options || {};
    return makeKarmaTask('watch', options);
  }
};

module.exports = karmaTasks;