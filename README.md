dfjs
====

"Dwarf Fortress"-esqe JS Game framework

To-Do
-----

- [x] Input hooks
- [x] Collision detection
- [x] Seed based generation
- [ ] Saving via cookies (base64 [Object Game])
- [ ] Audio
- [ ] Scrolling map
- [ ] NPC AI
- [ ] Block range and frequency
- [ ] Structure generation
- [x] [Browserify](http://browserify.org/) modularization
- [ ] [A* pathfinding](https://github.com/qiao/PathFinding.js)
- [ ] Node-Webkit
- [ ] File formatting
- [ ] Console based interaction
- [ ] [Controller support](http://www.html5rocks.com/en/tutorials/doodles/gamepad/)

## Module skeleton

1. Declare the object by name and as a function.
2. Define any object related variables with `this`
3. Define the object prototypes
4. Instantiate the object and set as the exported module

#### Example:
```
// Create new object and load config if needed
var Map = function(config) {
  this.initialized = false;
};

// Initialize prototype
Map.prototype = {
  // Create new function
  init: function() {
    for (var x = 0; x <= 80 - 1; x++) {
      var row = [];
      for (var y = 0; y <= 45 - 1; y++) {
        row.push(-1);
      }
      Game.map.push(row);
    }
    this.initialized = true;
    console.log('Map initialized...');
  },
  // Create another function
  foobar: function(argument) {
    var result = argument.substring(0, 16);
    return result;
  }
};

// Instantiate and return Object.

// Alternatively you can just do this on
// the other side but it seems easier this way.

// If the Object/Module requires a config,
// you'll have instantiate it in whichever
// module or function has the config.

module.exports = new Map();
```

## How to Build

I provide a fully compiled version of the game in the `dist` folder. Both plain and minified formats are in there.

Install NPM if you haven't already done so. NPM is a package manager that ships with Node.js. Then open up your console and navigate to the root folder of this project.

Run `npm install` once to install all the dependencies needed by this project. Next there are a few options:

Run `grunt build` to perform a new build to the `dist` folder. This way Browserify will generate a bundle from every required script in the `lib` folder, this will also generate a minified file of the bundle. This is preferred when you are done developing and want to push your new changes, as this version doesn't include the debug map.

Run `grunt dev` to watch every module needed in the project for changes. Watchify will take care of rebuilding the bundle so the only thing you have to do is refresh your browser. No need to run `grunt build` everytime you make a change. This version includes a debug map so you are able to debug single files while the .js file included is still the bundle file.

Run `grunt debug` to let JSHint check the code for you, a tool that helps to detect errors and potential problems in your JavaScript code.