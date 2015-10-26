# local_modules

> embeddable npm local_modules

With `local_modules` you can develop your node.js library code in your application, as if they were node_modules published on npm.

**Benefits**
- your module contains all it's dependencies
- your application's package.json does not get bloated.
- you can publish your application that contains `local_modules`
- the `local_modules` dependencies get installed
- your `local_modules` do not have inside the `node_modules` directory.
- it supports your development workflow and installs `local_modules` as local npm modules.

# install

```sh
npm i -g local_modules
```

# use

> you can use `local_modules` from the code in node.js or via command line.


If you wan't to publish your module that contains `local_modules` to npm, you can add this script to your `package.json`.

```js

  "scripts": {
    "postinstall": "lm install",
    ...
   }

```

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

// install example
var lm = require('local_modules');
lm({cmd: 'install', dir: 'lib'});

// or link example
lm({cmd: 'link', dir: 'lib', force: true});

```

# test

```sh
npm test
```


# license
MIT

# author
Andi Neck [@andineck](https://twitter.com/andineck)