var test = require('tape');
var lm = require('../index');
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

  var dependencies = null;
  lm({cmd: 'add', dir: 'local_modules'});

  dependencies = require(path.resolve('./package.json')).dependencies;
  t.equal(dependencies.awesome, 'file:local_modules/awesome');
  t.equal(dependencies.rad, 'file:local_modules/rad');

  lm({cmd: 'remove', dir: 'local_modules'});

  dependencies = require(path.resolve('./package.json')).dependencies;
  t.equal(dependencies.awesome, undefined);
  t.equal(dependencies.rad, undefined);

  t.end();
});