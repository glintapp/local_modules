/**
 * module dependencies
 */
var path = require('path');
var defaults = require('defaults');

var c = require('./config');
var help = require('./lib/help');
var version = require('./lib/version');
var install = require('./lib/install');

// require commands located in ./lib
var commands = (function requireCommands(){

  var p = path.join(__dirname, 'lib');
  var scripts = fs.readdirSync(p);
  var cmds = {};

  scripts.forEach(function(script){
    var cmd = path.basename(script, '.js');
    cmds[cmd] = require(path.join(p, script));
  });
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
  if (options.help || options.h || options.H) return help(options);
  if (options.version || options.v || options.V) return version(options);

  /**
   * basic processing: read local_modules and package.json
   */
  options.dirPath = path.join(process.cwd(), options.dir);
  options.packagePath = path.join(process.cwd(), options.package);

  // read package.json
  options.packageJSON = fs.readFileSync(packagePath, 'utf8');

  // parse package.json
  options.pkg = JSON.parse(options.packageJSON);
  options.pkg.dependencies = options.pkg.dependencies || {};

  // read local_modules directory
  var directories = fs.readdirSync(dirPath);

  // remove non directories
  options.modules = directories.filter(function(entry) {
      var dir = path.join(options.dirPath, entry);
      return fs.statSync(dir).isDirectory();
    });

  /**
   * handle commands
   */
  var executed = commands.some(function(command){
    if (options[command]) {
      return !!commands[command](options);
    }
  });

  if (!executed) command.log('no command provided');

};

/**
 * run from command line
 */
if (require.main === module) {
  var args = require('subarg')(process.argv.slice(2));
  module.exports(args);
}