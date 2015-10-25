var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');

var unlink = require('./unlink');

module.exports = function link(options) {

  // unlink existing links/folders first.
  unlink(options);

  // make sure the node_modules folder exists
  mkdirp.sync(path.resolve(options.nodeModules));

  // link local modules
  options.modules.forEach(function(module) {
    // get absolute paths
    var src = path.resolve(path.join(options.dir, module));
    var dest = path.resolve(path.join(options.nodeModules, module));
    console.log('add local dependency link:', src, ' -> ', dest);

    // check src type
    var stat = fs.statSync(src);
    var type = stat.isDirectory() ? 'dir' : 'file';

    // create the symlink
    fs.symlinkSync(src, dest, type);

  });

};
