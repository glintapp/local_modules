module.exports = function version(options) {
  var version = require('../package.json').version;
  console.log(version);
};