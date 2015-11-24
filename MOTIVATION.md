# local modules

You might have had problems with deep nested module links like e.g. `require('../../../../server/controller.js')` 
or you might have had the situation where your node.js application envolved into a big monster, 
and you might have lost the overview which part of your code depends on what.

If you ran into these kind of problems, `local modules` could be helpful, especially at the application level.


# requirements of first class citizen `local modules`

- every module should declare it's own dependencies
- they should be installed with the same mechanism that npm uses
- it should be possible use the surrounding app's version control repo
- it should work well with development tools, like nodemon, IDEs etc.
- no special environment settings should be required
- it should be possible to require the module without relative paths
- it should be easy to setup


# obstacles
- npm does NOT have first class citizen "local modules"
- linking can have limitations: ide file search, npm install
- copying is not viable in development
- syncing is not very ressource friendly and misleading when debugging


# approaches

> for organizing local modules

## 1. node_modules
> put the modules in the node_modules folder and link them to the lib folder

and list them as bundledDependencies

**pros**
- very npm like

**cons**
- some ide's might not pick up liked files when searching for files, works with webstorm + , atom ~
- special .gitignore entries needed
- number of watching files increases heavily, complex to define the rules for watching files,


## 2. linked folder
> create a lib folder and link it to node_modules

and list them as bundledDependencies

**pros**
- makes ide's happy
- no special .gitignore entries needed

**cons**
- npm does not install symlinked dependencies


## 3. file dependencies
> use npm file: dependencies with timoxley/linklocal

**pros**
- a solution npm provides since 2.0,

**cons**
- npm states in the docs, that it should not be used on modules that are published on npm
- npm install of dependencies ?
-> the idea here is to declare the the local `file:` `dependencies` also as `bundledDependency` , so that it is bundled when publishing the module to npm

```js
  "dependencies": {
    "local": "file:lib/local"
  },
  "bundledDependencies": [
    "local"
  ]
```

-> early tests seemed to have worked with npm 2.0 but it not seem to work anymore with npm 3.x

## 4. scoped modules
> use npm scoped modules(e.g. `@myaccount/mymodule`)

**pros**
- scoped to the project/user
- npm private modules are available for scoped modules and are affordable (unlimited modules)

**cons**
- creating repositories and publishing them individually to npm is a relative high overhead for many small modules
- It might be an expensive solution, if the scoped modules are hosted in private github repositories, since many private modules might be required


# findings along the way
**install of symlinked dependencies**
> -> does not work with `npm install`

**install dependencies of bundledDependencies**
> -> npm ignores it

> -> https://github.com/npm/npm/issues/2442 and https://github.com/npm/npm/issues/1983 and http://stackoverflow.com/a/19928749

**install dependencies of local file: dependencies**
> -> npm does it, yay... but

> -> if you publish a module with local file dependencies, no one else can install this module

**nodemon watch of symlinks**
> -> nodemon does not watch the targets of symlinks if you watch symlink directories

**do not mess with npm**
> -> it's not good to rely on private methods or use npm in an unintended way

# summary

> None of the evaluated approaches could fulfill the requirements for first class citizen `local modules`.
> 
> Therefore a *tool* might be needed to enabling developing node.js applications with true `local modules`.