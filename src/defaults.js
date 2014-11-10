var defaults = {};

defaults.clientScripts = [
  'client/app/**/*.js'
];

defaults.serverScripts = [
  'server/app.js',
  'server/lib/**/*.js'
];

defaults.allScripts = defaults.clientScripts.concat(defaults.serverScripts);

defaults.clientTestScripts = [
  // app and test code
  'client/app/**/*.js'
];

defaults.serverTestScripts = [
  'server/lib/**/*.test.js'
];

defaults.serverE2ETestScripts = [
  'server/lib/**/*-scenarios.js'
];

exports.defaults = defaults;
