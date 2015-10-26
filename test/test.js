var test = require('tape');
var lm = require('../index');
var fs = require('fs');
var path = require('path');
var version = require('../package.json').version;

test('should print version', function(t) {

  lm({cmd: 'version'});
  t.end();

});

test('should print help', function(t) {

  lm({cmd: 'help'});
  t.end();

});

test('should add and remove local modules to the package.json', function(t) {

  lm({cmd: 'add', dir: 'local_modules'});
  var added = parsePackageJson().dependencies;
  t.equal(added.awesome, 'file:local_modules/awesome');
  t.equal(added.rad, 'file:local_modules/rad');

  lm({cmd: 'remove', dir: 'local_modules'});
  var removed = parsePackageJson().dependencies;
  t.equal(removed.awesome, undefined);
  t.equal(removed.rad, undefined);

  t.end();

});

test('should install and uninstall local modules', function(t) {

  var awesome, rad;

  lm({cmd: 'install', dir: 'local_modules'});
  var installed = parsePackageJson().dependencies;
  t.equal(installed.awesome, undefined);
  t.equal(installed.rad, undefined);
  t.equal(moduleStat('awesome').isDirectory(), true);
  t.equal(moduleStat('rad').isDirectory(), true);

  lm({cmd: 'uninstall', dir: 'local_modules'});
  var uninstalled = parsePackageJson().dependencies;
  t.equal(uninstalled.awesome, undefined);
  t.equal(uninstalled.rad, undefined);
  t.equal(moduleStat('awesome'), null);
  t.equal(moduleStat('rad'), null);

  t.end();

});

test('should link and unlink local modules', function(t) {

  lm({cmd: 'link', dir: 'local_modules'});
  var linked = parsePackageJson().dependencies;
  t.equal(linked.awesome, undefined);
  t.equal(linked.rad, undefined);
  t.equal(moduleStat('awesome').isSymbolicLink(), true);
  t.equal(moduleStat('rad').isSymbolicLink(), true);

  lm({cmd: 'unlink', dir: 'local_modules'});
  var unlinked = parsePackageJson().dependencies;
  t.equal(unlinked.awesome, undefined);
  t.equal(unlinked.rad, undefined);
  t.equal(moduleStat('awesome'), null);
  t.equal(moduleStat('rad'), null);

  t.end();

});


test('should first link, install and then unlink local modules with force', function(t) {

  lm({cmd: 'link', dir: 'local_modules', force: true});
  t.equal(moduleStat('awesome').isSymbolicLink(), true);
  t.equal(moduleStat('rad').isSymbolicLink(), true);

  lm({cmd: 'install', dir: 'local_modules', force: true});
  t.equal(moduleStat('awesome').isDirectory(), true);
  t.equal(moduleStat('rad').isDirectory(), true);

  lm({cmd: 'unlink', dir: 'local_modules', force: true});
  t.equal(moduleStat('awesome'), null);
  t.equal(moduleStat('rad'), null);

  t.end();

});


test('should first install, link and then unlink local modules with force', function(t) {

  lm({cmd: 'install', dir: 'local_modules', force: true});
  t.equal(moduleStat('awesome').isDirectory(), true);
  t.equal(moduleStat('rad').isDirectory(), true);

  lm({cmd: 'link', dir: 'local_modules', force: true});
  t.equal(moduleStat('awesome').isSymbolicLink(), true);
  t.equal(moduleStat('rad').isSymbolicLink(), true);

  lm({cmd: 'unlink', dir: 'local_modules', force: true});
  t.equal(moduleStat('awesome'), null);
  t.equal(moduleStat('rad'), null);

  t.end();

});

function parsePackageJson() {

  var file = path.resolve('./package.json');
  var packageJson = fs.readFileSync(file, 'utf8');
  return JSON.parse(packageJson);

}

function moduleStat(module){

  var p = path.resolve(path.join('node_modules', module));

  var stats;
  try {
    stats = fs.lstatSync(p);
  } catch (e) {
    stats = null;
  }
  return stats;

}