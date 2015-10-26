var fs = require('fs');
var path = require('path');
var rimraf = require('rimraf');

var uninstall = require('./uninstall');

module.exports = function unlink(options) {

  if (options.force) {
    // first uninstall local modules
    try {
      uninstall(options);
    } catch (e) {
      if (e.code !== 'ENOENT') console.log('uninstall unused modules failed: ', e.message);
    }
  }

  // unlink local modules inside the `node_modules` folder.
  options.modules.forEach(function(module) {
    // get absolute paths
    var dest = path.resolve(path.join(options.nodeModules, module));
    console.log('remove local dependency link:', ' <- ', dest);

    if (!options.force) {
      try {
        // try unlink first
        fs.unlinkSync(dest);
      } catch (err) {
        // most likely link didn't exist, which is o.k.
      }
    } else {
      rimraf.sync(dest);
    }

  });

};
