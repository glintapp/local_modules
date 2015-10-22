var fs = require('fs');
var path = require('path');
var exec = require('exe');
var add = require('./add');
var remove = require('./remove');

module.exports = function install(options) {

  // copy package.json -> package.json.tmp
  fs.writeFileSync(options.packagePath + options.tmp, options.packageJSON);

  // add local modules
  add(options);

  // run npm install again `--ignore-scripts` is needed for endles loop when called via npm [...]install script.
  console.log('install local dependencies');
  exec('npm install --ignore-scripts');

  // restore original package.json
  remove(options);

};
