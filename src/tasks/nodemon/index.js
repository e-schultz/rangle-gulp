'use strict';
var demand = require('../../lib/demand');
var gulp = require('gulp');
var defaults = require('../../defaults').defaults;
var fs = require('fs');
var logger = require('../../lib/rg-logger').getLogger();

module.exports = function (options) {
  options = options || {};

  // if (options.workingDirectory) {
  //   process.chdir(options.workingDirectory);
  // }

  var nodemonOptions = {
    script: 'server/app.js',
    ext: 'html js css',
    ignore: ['ignored.js']
  };
  for (var key in options) {
    if (options.hasOwnProperty(key)) {
      nodemonOptions[key] = options[key];
    }
  }
  return function () {
    var nodemon = demand('gulp-nodemon');

    nodemon(nodemonOptions)
      .on('change', options.onChange || ['lint'])
      .on('restart', function () {
        logger.info('--- Restarted the server ---');
      });
  };
};