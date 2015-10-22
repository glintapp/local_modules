// modules
var fs = require('fs');
var path = require('path');
var exec = require('exe');

module.exports = function install(options) {

  // copy package.json -> package.json.tmp
  fs.writeFileSync(options.packagePath + options.tmp, options.packageJSON);

  // add local modules
  options.modules.forEach(function(module) {
    var modulePath = path.join(options.dir, module);
    options.pkg.dependencies[module] = 'file:' + modulePath;
    console.log('add local dependency:', module, ':', 'file:' + modulePath);
  });

  // write modified package.json
  fs.writeFileSync(options.packagePath, JSON.stringify(options.pkg, null, 2));

  // run npm install again `--ignore-scripts` is needed for endles loop when called via npm [...]install script.
  console.log('install local dependencies');
  exec('npm install --ignore-scripts');

  // restore original package.json
  fs.unlinkSync(options.packagePath);
  fs.renameSync(options.packagePath + options.tmp, options.packagePath);

};







