'use strict';
var winston = require('winston');

function makeLogger(level) {
  return new(winston.Logger)({
    transports: [
      new(winston.transports.Console)({
        level: level
      }),
    ]
  });
}

var logger;

exports.getLogger = function (level) {
  logger = logger || makeLogger(level || 'info');
  return logger;
};