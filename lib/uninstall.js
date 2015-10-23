var fs = require('fs');
var exec = require('exe');

var remove = require('./remove');

module.exports = function uninstall(options) {

  // remove local modules
  remove(options);

  // run npm prune
  console.log('remove local dependencies');
  exec('npm prune');

};
