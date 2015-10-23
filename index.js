/**
 * module dependencies
 */
var fs = require('fs');
var path = require('path');
var defaults = require('defaults');

var c = require('./config');

// require all commands located in "./lib" folder
var commands = (function requireCommands(){

  var cmds = {};
  var p = path.join(__dirname, 'lib');

  try {
    var scripts = fs.readdirSync(p);
    scripts.forEach(function(script){
      var cmd = path.basename(script, '.js');
      cmds[cmd] = require(path.join(p, script));
    });
  } catch(e) {
    console.error('could not read command scripts', e.message);
  }

  return cmds;

})();

/**
 *
 * @param o options:
 * --dir {String} local modules directory name
 */
module.exports = function localModules(o) {

  /**
   * get options right
   */
  var options = defaults({}, o);
  defaults(options, c);

  /**
   *  early return commands
   */
  if (options.help || options.h || options.H) return commands.help(options);
  if (options.version || options.v || options.V) return commands.version(options);

  /**
   * arguments, alias, defaults etc.
   */
  options.cmd = options.cmd || options._[0] || '';
  options.force = options.force || options.f;
  options.modules = [];

  /**
   * basic processing: read local_modules and package.json
   */
  options.dirPath = path.join(process.cwd(), options.dir);
  options.packagePath = path.join(process.cwd(), options.package);

  // read package.json
  options.packageJSON = fs.readFileSync(options.packagePath, 'utf8');

  // parse package.json
  options.pkg = JSON.parse(options.packageJSON);
  options.pkg.dependencies = options.pkg.dependencies || {};

  // try read local_modules directory
  var directories = [];
  try {
    directories = fs.readdirSync(options.dirPath);
  } catch (e) {
    console.error('could not read local module directory: ' + e.message);
  }

  // remove non directories
  options.modules = directories.filter(function(entry) {
      var dir = path.join(options.dirPath, entry);
      return fs.statSync(dir).isDirectory();
    });

  /**
   * handle commands
   */
  var executed = Object.keys(commands).some(function(command){
    if (options.cmd == command || options[command]) {
      commands[command](options);
      return true;
    }
  });

  if (!executed) console.log('no command provided');

};

/**
 * run from command line
 */
if (require.main === module) {
  var args = require('subarg')(process.argv.slice(2));
  module.exports(args);
}