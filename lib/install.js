var fs = require('fs');
var rimraf = require('rimraf');
var exec = require('exe');

var add = require('./add');
var remove = require('./remove');

module.exports = function install(options) {

  // copy package.json -> package.json.tmp
  fs.writeFileSync(options.packagePath + options.tmp, options.packageJSON);

  // add local modules
  add(options);

  // options.force: delete local modules inside node_modules first
  if (options.force) {
    // delete node_modules first
    options.modules.forEach(function(module) {
      var modulePath = path.resolve(path.join(options.nodeModules, module));
      rimraf.sync(modulePath);
    });
  }

  // run npm install again `--ignore-scripts` is needed for endles loop when called via npm [...]install script.
  console.log('install local dependencies');
  exec('npm install --ignore-scripts');

  // restore original package.json
  remove(options);

};
