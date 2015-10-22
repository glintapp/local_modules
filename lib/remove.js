var fs = require('fs');

module.exports = function remove(options) {

  // with option force, always remove local modules, alo when they were existing in the orignial package.json
  if (options.force) {
    try {
      fs.unlinkSync(options.packagePath + options.tmp);
    } finally {}

    return _remove();

  }

  try {

    // try restore original package.json
    fs.statSync(options.packagePath + options.tmp);
    fs.unlinkSync(options.packagePath);
    fs.renameSync(options.packagePath + options.tmp, options.packagePath);

  } catch (e) {

    _remove();

  }

  function _remove() {
    // remove local dependencies from package.json
    options.modules.forEach(function(module) {
      delete options.pkg.dependencies[module];
      console.log('remove local dependency:', module, ':', 'file:' + modulePath);
    });

    // write modified package.json
    fs.writeFileSync(options.packagePath, JSON.stringify(options.pkg, null, 2));
  }

};
