'use strict';
var demand = require('../../lib/demand');
var demands = require('../../lib/demands');
var gulp = require('gulp');
var defaults = require('../../defaults').defaults;
var fs = require('fs');
var _ = require('lodash');
// Generate resized and renamed icons and places them in
// appropriate platform directory.
//
// params can contain an 'iconSrc' property, which will default
// to 'icon.png' when omitted.
//
// params also can contain a 'platforms' property, containing
// the names of the platforms you want to generate icons for.
// Defaults to ['android', 'ios'] when omitted.
//
module.exports = function (params) {
  params = params || {};
  params.iconSrc = params.iconSrc || 'icon.png';
  params.platforms = params.platforms || ['android', 'ios'];
  params.project = params.project || undefined;


  var androidPath = 'platforms/android/res/';

  var androidSizes = [{
    name: 'drawable-ldpi/icon.png',
    size: 36
  }, {
    name: 'drawable-mdpi/icon.png',
    size: 48
  }, {
    name: 'drawable-hdpi/icon.png',
    size: 72
  }, {
    name: 'drawable-xhdpi/icon.png',
    size: 96
  }, {
    name: 'drawable/icon.png',
    size: 96
  }];

  var iosSizes = [{
    name: 'icon-29.png',
    size: 29
  }, {
    name: 'icon-40.png',
    size: 40
  }, {
    name: 'icon-40@2x.png',
    size: 80
  }, {
    name: 'icon-50.png',
    size: 50
  }, {
    name: 'icon-50@2x.png',
    size: 100
  }, {
    name: 'icon-57.png',
    size: 57
  }, {
    name: 'icon-57@2x.png',
    size: 114
  }, {
    name: 'icon-60.png',
    size: 60
  }, {
    name: 'icon-60@2x.png',
    size: 120
  }, {
    name: 'icon-72x.png',
    size: 72
  }, {
    name: 'icon-72@2x.png',
    size: 144
  }, {
    name: 'icon-76x.png',
    size: 76
  }, {
    name: 'icon-76@2x.png',
    size: 156
  }, {
    name: 'icon-small.png',
    size: 30
  }, {
    name: 'icon-small@2x.png',
    size: 60
  }, {
    name: 'icon.png',
    size: 58
  }, {
    name: 'icon@2x.png',
    size: 116
  }, {
    name: 'store-1024.png',
    size: 1024
  }, ];

  return function () {
    var gm = demand('gm');

    function resizeFunc(path) {
      return function (img) {
        gm(params.iconSrc)
          .resize(img.size, img.size)
          .write(path + img.name, function (err) {
            if (err) {
              console.log('✗', '\'' + path + img.name + '\'');
              console.log(err);
            } else {
              console.log('✓', '\'' + path + img.name + '\'');
            }
          });
      };
    }

    if (params.platforms.indexOf('ios') > -1) {
      if (!params.project) {
        throw 'No project specified';
      }
      var iosPath = 'platforms/ios/' + params.project +
        '/Resources/icons/';
      _.each(iosSizes, resizeFunc(iosPath));
    }

    if (params.platforms.indexOf('android') > -1) {
      _.each(androidSizes, resizeFunc(androidPath));
    }
  };
};