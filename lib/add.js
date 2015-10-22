var fs = require('fs');
var path = require('path');
var exec = require('exe');
var remove = require('./remove');

module.exports = function install(options) {

  // add local modules
  options.modules.forEach(function(module) {
    var modulePath = path.join(options.dir, module);
    options.pkg.dependencies[module] = 'file:' + modulePath;
    console.log('add local dependency:', module, ':', 'file:' + modulePath);
  });

  // write modified package.json
  fs.writeFileSync(options.packagePath, JSON.stringify(options.pkg, null, 2));

};
