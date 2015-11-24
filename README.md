# local_modules

> embeddable npm local_modules

With `local_modules` you can develop your node.js library code in your application, as if they were node_modules published on npm.

**Benefits**
- your module contains all it's dependencies
- require your local modules with absolute paths (no more: `require('../../../../server/controller.js')`)
- your application's package.json does not get bloated.
- you can publish your application that contains `local_modules`
- the `local_modules` dependencies get installed
- your `local_modules` do not have to be developed inside the `node_modules` directory.
- it supports your development workflow and installs `local_modules` as local npm modules.

**why would I need a module for this?**

> read: [MOTIVATION](MOTIVATION.md)


**whow does it work?**

- during *development*, it installs your local modules dependencies and links and links your local modules into the `node_modules` directory.

  Run:

  ```
  lm link -f
  ```

- when installing your app in *production*, it temporarely adds `file:` dependencies to your `package.json` and runs `npm install` to install your local modules and their dependencies. Afterwards it restores your original `package.json` file.

  Run:

  ```
  lm install -f
  ```

# install

```sh
npm i -g local_modules
```

# use

> you can use `local_modules` from the code in node.js or via command line.


If you wan't to publish your module that contains `local_modules` to npm, you can add this script to your `package.json`.

**preparation**

```js

  "scripts": {
    "postinstall": "local_modules install -f",
    ...
   }

```

**development**

to **link** the local modules of your app into node_modules **and install their dependencies**, run:
```sh
lm link -f
```

**production/deployment**

to **install** the local modules of your app, run:
```sh
lm install -f
```


### command line

> `lm` is the alias for `local_modules`. you can use either one.

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
// install local modules in `./lib` directory
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