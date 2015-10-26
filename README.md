# local_modules

> embeddable npm local_modules

# install

```sh
npm i -g local_modules
```

# use

> you can use `local_modules` from the code in node.js or via command line.


### command line
```sh
lm -h

*lm* helps you to deal with local npm modules.
It installs local modules and it's dependencies, e.g. useful in production,
and links them to have always up to date modules e.g. during development.

Usage: lm <command> [options]

lm -h      show help
lm -v      print lm version

Commands:

install    temporary adds the local module to the package.json, runs `npm install`, and removes them from package.json again.
uninstall  removes the local modules from the package.json, and runs `npm prune`, to remove the unneeded but installed modules.
link       links the local modules into the `node_modules` folder.
unlink     removes links of the local modules inside the `node_modules` folder.
add        adds the local modules to the package.json
remove     removes the local modules from the package.json

Options:
--dir      local module dirname default:`local_modules`
--tmp      temporary package.json file ending during install
--force    forced action: remove stuff, before copying or linking

```

```sh
# example
// install local modules in "./lib" directory
lm install --dir lib


```

### code

```js
var lm = require('local_modules');
lm({cmd: 'install', dir: 'lib'});
```


# license
MIT

# author
Andi Neck [@andineck](https://twitter.com/andineck)