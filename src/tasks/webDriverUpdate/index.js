'use strict';
var demand = require('../../lib/demand');


module.exports = exports = function (options) {

  var gulpProtractor = demand('gulp-protractor');
  var webDriverUpdate;

  /* jshint ignore:start */
  webDriverUpdate = gulpProtractor.webdriver_update;

  /* jshint ignore:end */
  if (!webDriverUpdate) {
    return;
  } else {
    return webDriverUpdate;
  }

};