// modules
var fs = require('fs');
var path = require('path');
var exec = require('exe');

module.exports = function uninstall(options) {

  // remove local modules
  options.modules.forEach(function(module) {
    delete options.pkg.dependencies[module];
    console.log('remove local dependency:', module);
  });

  // TODO always check at the end, that the local modules are removd

  // write modified package.json
  fs.writeFileSync(options.packagePath, JSON.stringify(options.pkg, null, 2));

  // try restore original package.json
  fs.unlinkSync(options.packagePath);
  fs.renameSync(options.packagePath + options.tmp, options.packagePath);

  // run npm prune
  console.log('remove local dependencies');
  exec('npm prune');

};







