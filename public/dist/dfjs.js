(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

window.Settings = {};
window.QueryString = function() {
  // This function is anonymous, is executed immediately and 
  // the return value is assigned to QueryString!
  var query_string = {};
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    // If first entry with this name
    if (typeof query_string[pair[0]] === "undefined") {
      query_string[pair[0]] = pair[1];
      // If second entry with this name
    } else if (typeof query_string[pair[0]] === "string") {
      var arr = [query_string[pair[0]], pair[1]];
      query_string[pair[0]] = arr;
      // If third or later entry with this name
    } else {
      query_string[pair[0]].push(pair[1]);
    }
  }
  return query_string;
}();

var Game = require('./core/game.js');

Settings = {
  tick: 200, // max ticks per second
  size: Math.ceil(window.innerWidth / 80), // size in pixels of block
  maxSize: 8,
  width: 80, // size in pixels of width
  height: 45, // size in pixels of height
};

Settings.updateSize = function() {
  Settings.size = Math.ceil(window.innerWidth / 80);
  Game.canvas.width = Settings.size * Settings.width;
  Game.canvas.height = Settings.size * Settings.height;
  console.log('Size updated...', Settings.size);
};

window.document.title += ' ' + Settings.seed;
console.log('%c%c background: #222; color: #bada55', 'background: #222; color: #bada55');

// Start Game
Game.start();
},{"./core/game.js":3}],2:[function(require,module,exports){
'use strict';

var Entity = {};

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// @ENTITY_MAIN
Entity.createNew = function(data, pos, cb) {
  var id = Object.keys(Game.entityMap).length;
  var x = pos[0],
    y = pos[1];

  if (Game.map[x][y] === -1) {
    data.coordinates = [x, y];
    Game.entityMap[id] = data;
    Game.map[x][y] = id;
    return cb(id);
  } else {
    return cb(false);
  }
};

Entity.remove = function(pos) {
  var x = pos[0],
    y = pos[1];

  if (Game.map[x][y] !== -1) {
    var id = Game.map[x][y];
    console.log('removed', id, [x, y]);
    Game.entityMap[id] = {
      deleted: true
    };
    Game.map[x][y] = -1;
  }
};

Entity.spawn = function(type, data) {
  data = data || {};
  var spawned = 0;

  function increase(success) {
    if (success) spawned += 1;
  }
  while (spawned < 1) {
    var x = getRandomInt(0, 80 - 1),
      y = getRandomInt(0, 45 - 1);
    Entity.createNew({
      type: type,
      data: data
    }, [x, y], increase);
  }
};

Entity.populate = function(type, data, limit) {
  var spawned = 0;

  function increase(success) {
    if (success) spawned += 1;
  }
  while (spawned < limit) {
    var x = getRandomInt(0, 80 - 1),
      y = getRandomInt(0, 45 - 1);
    Entity.createNew({
      type: type,
      data: data
    }, [x, y], increase);
  }
};

// Entity movement
Entity.MoveLeft = function(id) {
  this.MoveEntity(-1, 0, id);
};

Entity.MoveUp = function(id) {
  this.MoveEntity(0, -1, id);
};

Entity.MoveRight = function(id) {
  this.MoveEntity(1, 0, id);
};

Entity.MoveDown = function(id) {
  this.MoveEntity(0, 1, id);
};

Entity.MoveEntity = function(dirX, dirY, id) {
  if (Game._interval && Game.status !== 'paused') {
    var that = Game.entityMap[id];
    var cord = that.coordinates;

    Game.map[cord[0]][cord[1]] = -1;
    var next = Game.map[cord[0] + dirX][cord[1] + dirY];
    console.log(next, Game.entityMap[next]);
    console.log(cord);
    // Check collision
    if (0 <= cord[0] + dirX && 0 <= cord[1] + dirY) {
      if (next === -1 || Game.entityMap[next].type !== 'block') {
        next = id;
        that.coordinates = [cord[0] + dirX, cord[1] + dirY];
      }
    }
  }
};

module.exports = Entity;
},{}],3:[function(require,module,exports){
'use strict';

window.Game = {};

var Map = require('./map.js'),
  Entity = require('./entities.js'),
  Input = require('../input/keypress.js'),
  seedrandom = require('./seedrandom.js');

Game = {
  map: [],
  entityMap: {},
  version: 2,
  state: 'paused',
  seed: Math.ceil(Math.random() * Date.now()).toString(36).substring(0, 8),
  selected: 'block',
  input: new window.keypress.Listener()
};

// Game.seed = 'trevor';

Game.init = function() {
  // Game = this.readCookie('save');
  this.loops = 0;

  var listener = Game.input;

  listener.simple_combo("shift d", function() {
    gui.Window.get().showDevTools();
  });
  listener.simple_combo("shift s", function() {
    var state = document.getElementById('stats').style.display;
    console.log(state);
    if (!state || state === "none") {
      document.getElementById('stats').style.display = "block";
    } else {
      document.getElementById('stats').style.display = "none";
    }
  });

  seedrandom(this.seed, {
    global: true
  });
  if (Settings.size > Settings.maxSize) {
    Settings.size = Settings.maxSize;
  }

  Game.canvas = document.getElementById("game");
  Game.canvas.width = Settings.size * Settings.width;
  Game.canvas.height = Settings.size * Settings.height;
  Game.ctx = Game.canvas.getContext("2d");

  // Game.canvas.addEventListener("mouseup", getPosition, false);
  // Game.canvas.addEventListener("mousemove", getPosition, false);
  Game.canvas.addEventListener("mousedown", function(e) {
    e.preventDefault();
    var pos = getPosition(e);
    Entity.createNew({
      "type": Game.selected,
      "data": {},
      "coordinates": pos
    }, pos, function(status) {
      if (status) {
        console.log("created", status, pos);
      } else {
        console.log("unable to create");
      }
    });
  }, false);
  Game.canvas.oncontextmenu = function(e) {
    e.preventDefault();
    var pos = getPosition(e);
    var x = pos[0];
    var y = pos[1];
    Entity.remove([x, y]);
  };

  function getPosition(e) {
    var x = e.x,
      y = e.y;

    x -= Game.canvas.offsetLeft;
    y -= Game.canvas.offsetTop;

    var pos = [Math.floor(x / Settings.size), Math.floor(y / Settings.size)];
    console.log(e.type, [x, y], pos);
    return pos;
  }

  $(document).keydown(function(event) {
    switch (event.keyCode) {
      case 37:
        Entity.MoveLeft(0);
        break;
      case 38:
        Entity.MoveUp(0);
        break;
      case 39:
        Entity.MoveRight(0);
        break;
      case 40:
        Entity.MoveDown(0);
        break;
    }
  });

  Map.init();

  Entity.spawn('player');
  Entity.populate('liquid', {}, 10);
  Entity.populate('beast', {}, 7);
  Entity.populate('npc', {}, 15);
  Entity.populate('block', {}, 100);

  console.log('Game initialized...');
};

Game.update = function() {
  window.stats.update();
};

Game.draw = function() {
  var ids = Object.keys(Game.entityMap).length;
  var size = Settings.size;
  Game.canvas.width = Game.canvas.width;
  for (var i = 0; i < ids; i++) {
    var that = Game.entityMap[i];
    if (!that.deleted) {
      var x = that.coordinates[0];
      var y = that.coordinates[1];
      var type = that.type;
      switch (type) {
        case 'player':
          Game.ctx.fillStyle = "rgba(255,255, 255, 1)";
          break;
        case 'npc':
          Game.ctx.fillStyle = "rgba(0, 255, 0, 1)";
          break;
        case 'beast':
          Game.ctx.fillStyle = "rgba(255, 0, 0, 1)";
          break;
        case 'liquid':
          Game.ctx.fillStyle = "rgba(0, 0, 255, 1)";
          break;
        default:
          Game.ctx.fillStyle = "rgba(128, 128, 128, 1)";
      }
      Game.ctx.fillRect(x * size, y * size, 1 * size, 1 * size);
    }
  }
};

Game.pause = function() {
  Game.state = 'paused';
  console.log(Game.state);
  clearInterval(Game._interval);
};

Game.resume = function() {
  Game.state = 'running';
  console.log(Game.state);
  Game._interval = setInterval(Game.run, 1000 / Settings.tick);
};

Game.start = function() {
  Game.state = 'running';
  console.log(Game.state);
  Game._interval = setInterval(Game.run, 1000 / Settings.tick);
};

Game.clearScreen = function() {
  Game.canvas.width = Game.canvas.width;
  clearInterval(Game._interval);
  Game.map = [];
  Game.entityMap = {};
};

Game.reset = function() {
  Game.canvas.width = Game.canvas.width;
  Game.map = [];
  Game.entityMap = {};
  Game.start();
};

Game.run = function() {
  if (Game.map.length) {
    Game.update();
    Game.draw();
  } else {
    Game.init();
  }
};

module.exports = Game;
},{"../input/keypress.js":6,"./entities.js":2,"./map.js":4,"./seedrandom.js":5}],4:[function(require,module,exports){
'use strict';

var Map = function() {
  this.initialized = false;
};

Map.prototype = {
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
  span: function(direction, length) {
    var map = Game.map;
    switch (direction) {
      case 'up':
        direction = [0, -length];
        break;
      case 'down':
        direction = [0, length];
        break;
      case 'left':
        direction = [-length, 0];
        break;
      case 'right':
        direction = [length, 0];
        break;
    }
    console.log(direction);
  }
};

module.exports = new Map();
},{}],5:[function(require,module,exports){
/**

seedrandom.js
=============

Seeded random number generator for Javascript.

version 2.3.6<br>
Author: David Bau<br>
Date: 2014 May 14

Can be used as a plain script, a node.js module or an AMD module.

Script tag usage
----------------

<script src=//cdnjs.cloudflare.com/ajax/libs/seedrandom/2.3.6/seedrandom.min.js>
</script>

// Sets Math.random to a PRNG initialized using the given explicit seed.
Math.seedrandom('hello.');
console.log(Math.random());          // Always 0.9282578795792454
console.log(Math.random());          // Always 0.3752569768646784

// Sets Math.random to an ARC4-based PRNG that is autoseeded using the
// current time, dom state, and other accumulated local entropy.
// The generated seed string is returned.
Math.seedrandom();
console.log(Math.random());          // Reasonably unpredictable.

// Seeds using the given explicit seed mixed with accumulated entropy.
Math.seedrandom('added entropy.', { entropy: true });
console.log(Math.random());          // As unpredictable as added entropy.

// Use "new" to create a local prng without altering Math.random.
var myrng = new Math.seedrandom('hello.');
console.log(myrng());                // Always 0.9282578795792454


Node.js usage
-------------

npm install seedrandom

// Local PRNG: does not affect Math.random.
var seedrandom = require('seedrandom');
var rng = seedrandom('hello.');
console.log(rng());                  // Always 0.9282578795792454

// Autoseeded ARC4-based PRNG.
rng = seedrandom();
console.log(rng());                  // Reasonably unpredictable.

// Global PRNG: set Math.random.
seedrandom('hello.', { global: true });
console.log(Math.random());          // Always 0.9282578795792454

// Mixing accumulated entropy.
rng = seedrandom('added entropy.', { entropy: true });
console.log(rng());                  // As unpredictable as added entropy.


Require.js usage
----------------

Similar to node.js usage:

bower install seedrandom

require(['seedrandom'], function(seedrandom) {
  var rng = seedrandom('hello.');
  console.log(rng());                  // Always 0.9282578795792454
});


Network seeding via a script tag
--------------------------------

<script src=//cdnjs.cloudflare.com/ajax/libs/seedrandom/2.3.6/seedrandom.min.js>
</script>
<!-- Seeds using urandom bits from a server. -->
<script src=//jsonlib.appspot.com/urandom?callback=Math.seedrandom">
</script>

Examples of manipulating the seed for various purposes:

var seed = Math.seedrandom();        // Use prng with an automatic seed.
document.write(Math.random());       // Pretty much unpredictable x.

var rng = new Math.seedrandom(seed); // A new prng with the same seed.
document.write(rng());               // Repeat the 'unpredictable' x.

function reseed(event, count) {      // Define a custom entropy collector.
  var t = [];
  function w(e) {
    t.push([e.pageX, e.pageY, +new Date]);
    if (t.length < count) { return; }
    document.removeEventListener(event, w);
    Math.seedrandom(t, { entropy: true });
  }
  document.addEventListener(event, w);
}
reseed('mousemove', 100);            // Reseed after 100 mouse moves.

The "pass" option can be used to get both the prng and the seed.
The following returns both an autoseeded prng and the seed as an object,
without mutating Math.random:

var obj = Math.seedrandom(null, { pass: function(prng, seed) {
  return { random: prng, seed: seed };
}});


Version notes
-------------

The random number sequence is the same as version 1.0 for string seeds.
* Version 2.0 changed the sequence for non-string seeds.
* Version 2.1 speeds seeding and uses window.crypto to autoseed if present.
* Version 2.2 alters non-crypto autoseeding to sweep up entropy from plugins.
* Version 2.3 adds support for "new", module loading, and a null seed arg.
* Version 2.3.1 adds a build environment, module packaging, and tests.
* Version 2.3.4 fixes bugs on IE8, and switches to MIT license.
* Version 2.3.6 adds a readable options object argument.

The standard ARC4 key scheduler cycles short keys, which means that
seedrandom('ab') is equivalent to seedrandom('abab') and 'ababab'.
Therefore it is a good idea to add a terminator to avoid trivial
equivalences on short string seeds, e.g., Math.seedrandom(str + '\0').
Starting with version 2.0, a terminator is added automatically for
non-string seeds, so seeding with the number 111 is the same as seeding
with '111\0'.

When seedrandom() is called with zero args or a null seed, it uses a
seed drawn from the browser crypto object if present.  If there is no
crypto support, seedrandom() uses the current time, the native rng,
and a walk of several DOM objects to collect a few bits of entropy.

Each time the one- or two-argument forms of seedrandom are called,
entropy from the passed seed is accumulated in a pool to help generate
future seeds for the zero- and two-argument forms of seedrandom.

On speed - This javascript implementation of Math.random() is several
times slower than the built-in Math.random() because it is not native
code, but that is typically fast enough.  Some details (timings on
Chrome 25 on a 2010 vintage macbook):

* seeded Math.random()          - avg less than 0.0002 milliseconds per call
* seedrandom('explicit.')       - avg less than 0.2 milliseconds per call
* seedrandom('explicit.', true) - avg less than 0.2 milliseconds per call
* seedrandom() with crypto      - avg less than 0.2 milliseconds per call

Autoseeding without crypto is somewhat slower, about 20-30 milliseconds on
a 2012 windows 7 1.5ghz i5 laptop, as seen on Firefox 19, IE 10, and Opera.
Seeded rng calls themselves are fast across these browsers, with slowest
numbers on Opera at about 0.0005 ms per seeded Math.random().


LICENSE (MIT)
-------------

Copyright (c)2014 David Bau.

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*/

/**
 * All code is in an anonymous closure to keep the global namespace clean.
 */
(function (
    global, pool, math, width, chunks, digits, module, define, rngname) {

//
// The following constants are related to IEEE 754 limits.
//
var startdenom = math.pow(width, chunks),
    significance = math.pow(2, digits),
    overflow = significance * 2,
    mask = width - 1,

//
// seedrandom()
// This is the seedrandom function described above.
//
impl = math['seed' + rngname] = function(seed, options, callback) {
  var key = [];
  options = (options == true) ? { entropy: true } : (options || {});

  // Flatten the seed string or build one from local entropy if needed.
  var shortseed = mixkey(flatten(
    options.entropy ? [seed, tostring(pool)] :
    (seed == null) ? autoseed() : seed, 3), key);

  // Use the seed to initialize an ARC4 generator.
  var arc4 = new ARC4(key);

  // Mix the randomness into accumulated entropy.
  mixkey(tostring(arc4.S), pool);

  // Calling convention: what to return as a function of prng, seed, is_math.
  return (options.pass || callback ||
      // If called as a method of Math (Math.seedrandom()), mutate Math.random
      // because that is how seedrandom.js has worked since v1.0.  Otherwise,
      // it is a newer calling convention, so return the prng directly.
      function(prng, seed, is_math_call) {
        if (is_math_call) { math[rngname] = prng; return seed; }
        else return prng;
      })(

  // This function returns a random double in [0, 1) that contains
  // randomness in every bit of the mantissa of the IEEE 754 value.
  function() {
    var n = arc4.g(chunks),             // Start with a numerator n < 2 ^ 48
        d = startdenom,                 //   and denominator d = 2 ^ 48.
        x = 0;                          //   and no 'extra last byte'.
    while (n < significance) {          // Fill up all significant digits by
      n = (n + x) * width;              //   shifting numerator and
      d *= width;                       //   denominator and generating a
      x = arc4.g(1);                    //   new least-significant-byte.
    }
    while (n >= overflow) {             // To avoid rounding up, before adding
      n /= 2;                           //   last byte, shift everything
      d /= 2;                           //   right using integer math until
      x >>>= 1;                         //   we have exactly the desired bits.
    }
    return (n + x) / d;                 // Form the number within [0, 1).
  }, shortseed, 'global' in options ? options.global : (this == math));
};

//
// ARC4
//
// An ARC4 implementation.  The constructor takes a key in the form of
// an array of at most (width) integers that should be 0 <= x < (width).
//
// The g(count) method returns a pseudorandom integer that concatenates
// the next (count) outputs from ARC4.  Its return value is a number x
// that is in the range 0 <= x < (width ^ count).
//
/** @constructor */
function ARC4(key) {
  var t, keylen = key.length,
      me = this, i = 0, j = me.i = me.j = 0, s = me.S = [];

  // The empty key [] is treated as [0].
  if (!keylen) { key = [keylen++]; }

  // Set up S using the standard key scheduling algorithm.
  while (i < width) {
    s[i] = i++;
  }
  for (i = 0; i < width; i++) {
    s[i] = s[j = mask & (j + key[i % keylen] + (t = s[i]))];
    s[j] = t;
  }

  // The "g" method returns the next (count) outputs as one number.
  (me.g = function(count) {
    // Using instance members instead of closure state nearly doubles speed.
    var t, r = 0,
        i = me.i, j = me.j, s = me.S;
    while (count--) {
      t = s[i = mask & (i + 1)];
      r = r * width + s[mask & ((s[i] = s[j = mask & (j + t)]) + (s[j] = t))];
    }
    me.i = i; me.j = j;
    return r;
    // For robust unpredictability discard an initial batch of values.
    // See http://www.rsa.com/rsalabs/node.asp?id=2009
  })(width);
}

//
// flatten()
// Converts an object tree to nested arrays of strings.
//
function flatten(obj, depth) {
  var result = [], typ = (typeof obj), prop;
  if (depth && typ == 'object') {
    for (prop in obj) {
      try { result.push(flatten(obj[prop], depth - 1)); } catch (e) {}
    }
  }
  return (result.length ? result : typ == 'string' ? obj : obj + '\0');
}

//
// mixkey()
// Mixes a string seed into a key that is an array of integers, and
// returns a shortened string seed that is equivalent to the result key.
//
function mixkey(seed, key) {
  var stringseed = seed + '', smear, j = 0;
  while (j < stringseed.length) {
    key[mask & j] =
      mask & ((smear ^= key[mask & j] * 19) + stringseed.charCodeAt(j++));
  }
  return tostring(key);
}

//
// autoseed()
// Returns an object for autoseeding, using window.crypto if available.
//
/** @param {Uint8Array|Navigator=} seed */
function autoseed(seed) {
  try {
    global.crypto.getRandomValues(seed = new Uint8Array(width));
    return tostring(seed);
  } catch (e) {
    return [+new Date, global, (seed = global.navigator) && seed.plugins,
            global.screen, tostring(pool)];
  }
}

//
// tostring()
// Converts an array of charcodes to a string
//
function tostring(a) {
  return String.fromCharCode.apply(0, a);
}

//
// When seedrandom.js is loaded, we immediately mix a few bits
// from the built-in RNG into the entropy pool.  Because we do
// not want to intefere with determinstic PRNG state later,
// seedrandom will not call math.random on its own again after
// initialization.
//
mixkey(math[rngname](), pool);

//
// Nodejs and AMD support: export the implemenation as a module using
// either convention.
//
if (module && module.exports) {
  module.exports = impl;
} else if (define && define.amd) {
  define(function() { return impl; });
}

// End anonymous scope, and pass initial values.
})(
  this,   // global window object
  [],     // pool: entropy pool starts empty
  Math,   // math: package containing random, pow, and seedrandom
  256,    // width: each RC4 output is 0 <= x < 256
  6,      // chunks: at least six RC4 outputs for each double
  52,     // digits: there are 52 significant digits in a double
  (typeof module) == 'object' && module,    // present in node.js
  (typeof define) == 'function' && define,  // present with an AMD loader
  'random'// rngname: name for Math.random and Math.seedrandom
);

},{}],6:[function(require,module,exports){
// Generated by CoffeeScript 1.7.1

/*
Copyright 2014 David Mauro

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

Keypress is a robust keyboard input capturing Javascript utility
focused on input for games.

version 2.0.1
 */


/*
Combo options available and their defaults:
    keys            : []            - An array of the keys pressed together to activate combo.
    count           : 0             - The number of times a counting combo has been pressed. Reset on release.
    is_unordered    : false         - Unless this is set to true, the keys can be pressed down in any order.
    is_counting     : false         - Makes this a counting combo (see documentation).
    is_exclusive    : false         - This combo will replace other exclusive combos when true.
    is_solitary     : false         - This combo will only fire if ONLY it's keys are pressed down.
    is_sequence     : false         - Rather than a key combo, this is an ordered key sequence.
    prevent_default : false         - Prevent default behavior for all component key keypresses.
    prevent_repeat  : false         - Prevent the combo from repeating when keydown is held.
    on_keydown      : null          - A function that is called when the combo is pressed.
    on_keyup        : null          - A function that is called when the combo is released.
    on_release      : null          - A function that is called when all keys in the combo are released.
    this            : undefined     - Defines the scope for your callback functions.
 */

(function() {
  var Combo, keypress, _change_keycodes_by_browser, _compare_arrays, _compare_arrays_sorted, _convert_key_to_readable, _convert_to_shifted_key, _decide_meta_key, _factory_defaults, _filter_array, _is_array_in_array, _is_array_in_array_sorted, _key_is_valid, _keycode_alternate_names, _keycode_dictionary, _keycode_shifted_keys, _log_error, _metakey, _modifier_event_mapping, _modifier_keys, _validate_combo,
    __hasProp = {}.hasOwnProperty,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  _factory_defaults = {
    is_unordered: false,
    is_counting: false,
    is_exclusive: false,
    is_solitary: false,
    prevent_default: false,
    prevent_repeat: false
  };

  _modifier_keys = ["meta", "alt", "option", "ctrl", "shift", "cmd"];

  _metakey = "ctrl";

  keypress = {};

  keypress.debug = false;

  Combo = (function() {
    function Combo(dictionary) {
      var property, value;
      for (property in dictionary) {
        if (!__hasProp.call(dictionary, property)) continue;
        value = dictionary[property];
        if (value !== false) {
          this[property] = value;
        }
      }
      this.keys = this.keys || [];
      this.count = this.count || 0;
    }

    Combo.prototype.allows_key_repeat = function() {
      return !this.prevent_repeat && typeof this.on_keydown === "function";
    };

    Combo.prototype.reset = function() {
      this.count = 0;
      return this.keyup_fired = null;
    };

    return Combo;

  })();

  keypress.Listener = (function() {
    function Listener(element, defaults) {
      var attach_handler, property, value;
      this.should_suppress_event_defaults = false;
      this.should_force_event_defaults = false;
      this.sequence_delay = 800;
      this._registered_combos = [];
      this._keys_down = [];
      this._active_combos = [];
      this._sequence = [];
      this._sequence_timer = null;
      this._prevent_capture = false;
      this._defaults = defaults || {};
      for (property in _factory_defaults) {
        if (!__hasProp.call(_factory_defaults, property)) continue;
        value = _factory_defaults[property];
        this._defaults[property] = this._defaults[property] || value;
      }
      element = element || document.body;
      attach_handler = function(target, event, handler) {
        if (target.addEventListener) {
          return target.addEventListener(event, handler);
        } else if (target.attachEvent) {
          return target.attachEvent("on" + event, handler);
        }
      };
      attach_handler(element, "keydown", (function(_this) {
        return function(e) {
          e = e || window.event;
          _this._receive_input(e, true);
          return _this._bug_catcher(e);
        };
      })(this));
      attach_handler(element, "keyup", (function(_this) {
        return function(e) {
          e = e || window.event;
          return _this._receive_input(e, false);
        };
      })(this));
      attach_handler(window, "blur", (function(_this) {
        return function() {
          var key, _i, _len, _ref;
          _ref = _this._keys_down;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            key = _ref[_i];
            _this._key_up(key, {});
          }
          return _this._keys_down = [];
        };
      })(this));
    }

    Listener.prototype._bug_catcher = function(e) {
      var _ref;
      if (_metakey === "cmd" && __indexOf.call(this._keys_down, "cmd") >= 0 && ((_ref = _convert_key_to_readable(e.keyCode)) !== "cmd" && _ref !== "shift" && _ref !== "alt" && _ref !== "caps" && _ref !== "tab")) {
        return this._receive_input(e, false);
      }
    };

    Listener.prototype._cmd_bug_check = function(combo_keys) {
      if (_metakey === "cmd" && __indexOf.call(this._keys_down, "cmd") >= 0 && __indexOf.call(combo_keys, "cmd") < 0) {
        return false;
      }
      return true;
    };

    Listener.prototype._prevent_default = function(e, should_prevent) {
      if ((should_prevent || this.should_suppress_event_defaults) && !this.should_force_event_defaults) {
        if (e.preventDefault) {
          e.preventDefault();
        } else {
          e.returnValue = false;
        }
        if (e.stopPropagation) {
          return e.stopPropagation();
        }
      }
    };

    Listener.prototype._get_active_combos = function(key) {
      var active_combos, keys_down;
      active_combos = [];
      keys_down = _filter_array(this._keys_down, function(down_key) {
        return down_key !== key;
      });
      keys_down.push(key);
      this._match_combo_arrays(keys_down, (function(_this) {
        return function(match) {
          if (_this._cmd_bug_check(match.keys)) {
            return active_combos.push(match);
          }
        };
      })(this));
      this._fuzzy_match_combo_arrays(keys_down, (function(_this) {
        return function(match) {
          if (__indexOf.call(active_combos, match) >= 0) {
            return;
          }
          if (!(match.is_solitary || !_this._cmd_bug_check(match.keys))) {
            return active_combos.push(match);
          }
        };
      })(this));
      return active_combos;
    };

    Listener.prototype._get_potential_combos = function(key) {
      var combo, potentials, _i, _len, _ref;
      potentials = [];
      _ref = this._registered_combos;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        combo = _ref[_i];
        if (combo.is_sequence) {
          continue;
        }
        if (__indexOf.call(combo.keys, key) >= 0 && this._cmd_bug_check(combo.keys)) {
          potentials.push(combo);
        }
      }
      return potentials;
    };

    Listener.prototype._add_to_active_combos = function(combo) {
      var active_combo, active_key, active_keys, already_replaced, combo_key, i, should_prepend, should_replace, _i, _j, _k, _len, _len1, _ref, _ref1;
      should_replace = false;
      should_prepend = true;
      already_replaced = false;
      if (__indexOf.call(this._active_combos, combo) >= 0) {
        return true;
      } else if (this._active_combos.length) {
        for (i = _i = 0, _ref = this._active_combos.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
          active_combo = this._active_combos[i];
          if (!(active_combo && active_combo.is_exclusive && combo.is_exclusive)) {
            continue;
          }
          active_keys = active_combo.keys;
          if (!should_replace) {
            for (_j = 0, _len = active_keys.length; _j < _len; _j++) {
              active_key = active_keys[_j];
              should_replace = true;
              if (__indexOf.call(combo.keys, active_key) < 0) {
                should_replace = false;
                break;
              }
            }
          }
          if (should_prepend && !should_replace) {
            _ref1 = combo.keys;
            for (_k = 0, _len1 = _ref1.length; _k < _len1; _k++) {
              combo_key = _ref1[_k];
              should_prepend = false;
              if (__indexOf.call(active_keys, combo_key) < 0) {
                should_prepend = true;
                break;
              }
            }
          }
          if (should_replace) {
            if (already_replaced) {
              active_combo = this._active_combos.splice(i, 1)[0];
              if (active_combo != null) {
                active_combo.reset();
              }
            } else {
              active_combo = this._active_combos.splice(i, 1, combo)[0];
              if (active_combo != null) {
                active_combo.reset();
              }
              already_replaced = true;
            }
            should_prepend = false;
          }
        }
      }
      if (should_prepend) {
        this._active_combos.unshift(combo);
      }
      return should_replace || should_prepend;
    };

    Listener.prototype._remove_from_active_combos = function(combo) {
      var active_combo, i, _i, _ref;
      for (i = _i = 0, _ref = this._active_combos.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        active_combo = this._active_combos[i];
        if (active_combo === combo) {
          combo = this._active_combos.splice(i, 1)[0];
          combo.reset();
          break;
        }
      }
    };

    Listener.prototype._get_possible_sequences = function() {
      var combo, i, j, match, matches, sequence, _i, _j, _k, _len, _ref, _ref1, _ref2;
      matches = [];
      _ref = this._registered_combos;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        combo = _ref[_i];
        for (j = _j = 1, _ref1 = this._sequence.length; 1 <= _ref1 ? _j <= _ref1 : _j >= _ref1; j = 1 <= _ref1 ? ++_j : --_j) {
          sequence = this._sequence.slice(-j);
          if (!combo.is_sequence) {
            continue;
          }
          if (__indexOf.call(combo.keys, "shift") < 0) {
            sequence = _filter_array(sequence, function(key) {
              return key !== "shift";
            });
            if (!sequence.length) {
              continue;
            }
          }
          for (i = _k = 0, _ref2 = sequence.length; 0 <= _ref2 ? _k < _ref2 : _k > _ref2; i = 0 <= _ref2 ? ++_k : --_k) {
            if (combo.keys[i] === sequence[i]) {
              match = true;
            } else {
              match = false;
              break;
            }
          }
          if (match) {
            matches.push(combo);
          }
        }
      }
      return matches;
    };

    Listener.prototype._add_key_to_sequence = function(key, e) {
      var combo, sequence_combos, _i, _len;
      this._sequence.push(key);
      sequence_combos = this._get_possible_sequences();
      if (sequence_combos.length) {
        for (_i = 0, _len = sequence_combos.length; _i < _len; _i++) {
          combo = sequence_combos[_i];
          this._prevent_default(e, combo.prevent_default);
        }
        if (this._sequence_timer) {
          clearTimeout(this._sequence_timer);
        }
        if (this.sequence_delay > -1) {
          this._sequence_timer = setTimeout(function() {
            return this._sequence = [];
          }, this.sequence_delay);
        }
      } else {
        this._sequence = [];
      }
    };

    Listener.prototype._get_sequence = function(key) {
      var combo, i, j, match, seq_key, sequence, _i, _j, _k, _len, _ref, _ref1, _ref2;
      _ref = this._registered_combos;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        combo = _ref[_i];
        if (!combo.is_sequence) {
          continue;
        }
        for (j = _j = 1, _ref1 = this._sequence.length; 1 <= _ref1 ? _j <= _ref1 : _j >= _ref1; j = 1 <= _ref1 ? ++_j : --_j) {
          sequence = (_filter_array(this._sequence, function(seq_key) {
            if (__indexOf.call(combo.keys, "shift") >= 0) {
              return true;
            }
            return seq_key !== "shift";
          })).slice(-j);
          if (combo.keys.length !== sequence.length) {
            continue;
          }
          for (i = _k = 0, _ref2 = sequence.length; 0 <= _ref2 ? _k < _ref2 : _k > _ref2; i = 0 <= _ref2 ? ++_k : --_k) {
            seq_key = sequence[i];
            if (__indexOf.call(combo.keys, "shift") < 0) {
              if (seq_key === "shift") {
                continue;
              }
            }
            if (key === "shift" && __indexOf.call(combo.keys, "shift") < 0) {
              continue;
            }
            if (combo.keys[i] === seq_key) {
              match = true;
            } else {
              match = false;
              break;
            }
          }
        }
        if (match) {
          return combo;
        }
      }
      return false;
    };

    Listener.prototype._receive_input = function(e, is_keydown) {
      var key;
      if (this._prevent_capture) {
        if (this._keys_down.length) {
          this._keys_down = [];
        }
        return;
      }
      key = _convert_key_to_readable(e.keyCode);
      if (!is_keydown && !this._keys_down.length && (key === "alt" || key === _metakey)) {
        return;
      }
      if (!key) {
        return;
      }
      if (is_keydown) {
        return this._key_down(key, e);
      } else {
        return this._key_up(key, e);
      }
    };

    Listener.prototype._fire = function(event, combo, key_event, is_autorepeat) {
      if (typeof combo["on_" + event] === "function") {
        this._prevent_default(key_event, combo["on_" + event].call(combo["this"], key_event, combo.count, is_autorepeat) !== true);
      }
      if (event === "release") {
        combo.count = 0;
      }
      if (event === "keyup") {
        return combo.keyup_fired = true;
      }
    };

    Listener.prototype._match_combo_arrays = function(potential_match, match_handler) {
      var source_combo, _i, _len, _ref;
      _ref = this._registered_combos;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        source_combo = _ref[_i];
        if ((!source_combo.is_unordered && _compare_arrays_sorted(potential_match, source_combo.keys)) || (source_combo.is_unordered && _compare_arrays(potential_match, source_combo.keys))) {
          match_handler(source_combo);
        }
      }
    };

    Listener.prototype._fuzzy_match_combo_arrays = function(potential_match, match_handler) {
      var source_combo, _i, _len, _ref;
      _ref = this._registered_combos;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        source_combo = _ref[_i];
        if ((!source_combo.is_unordered && _is_array_in_array_sorted(source_combo.keys, potential_match)) || (source_combo.is_unordered && _is_array_in_array(source_combo.keys, potential_match))) {
          match_handler(source_combo);
        }
      }
    };

    Listener.prototype._keys_remain = function(combo) {
      var key, keys_remain, _i, _len, _ref;
      _ref = combo.keys;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        key = _ref[_i];
        if (__indexOf.call(this._keys_down, key) >= 0) {
          keys_remain = true;
          break;
        }
      }
      return keys_remain;
    };

    Listener.prototype._key_down = function(key, e) {
      var combo, combos, event_mod, i, mod, potential, potential_combos, sequence_combo, shifted_key, _i, _j, _k, _len, _len1, _ref;
      shifted_key = _convert_to_shifted_key(key, e);
      if (shifted_key) {
        key = shifted_key;
      }
      this._add_key_to_sequence(key, e);
      sequence_combo = this._get_sequence(key);
      if (sequence_combo) {
        this._fire("keydown", sequence_combo, e);
      }
      for (mod in _modifier_event_mapping) {
        event_mod = _modifier_event_mapping[mod];
        if (!e[event_mod]) {
          continue;
        }
        if (mod === key || __indexOf.call(this._keys_down, mod) >= 0) {
          continue;
        }
        this._keys_down.push(mod);
      }
      for (mod in _modifier_event_mapping) {
        event_mod = _modifier_event_mapping[mod];
        if (mod === key) {
          continue;
        }
        if (__indexOf.call(this._keys_down, mod) >= 0 && !e[event_mod]) {
          if (mod === "cmd" && _metakey !== "cmd") {
            continue;
          }
          for (i = _i = 0, _ref = this._keys_down.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
            if (this._keys_down[i] === mod) {
              this._keys_down.splice(i, 1);
            }
          }
        }
      }
      combos = this._get_active_combos(key);
      potential_combos = this._get_potential_combos(key);
      for (_j = 0, _len = combos.length; _j < _len; _j++) {
        combo = combos[_j];
        this._handle_combo_down(combo, potential_combos, key, e);
      }
      if (potential_combos.length) {
        for (_k = 0, _len1 = potential_combos.length; _k < _len1; _k++) {
          potential = potential_combos[_k];
          this._prevent_default(e, potential.prevent_default);
        }
      }
      if (__indexOf.call(this._keys_down, key) < 0) {
        this._keys_down.push(key);
      }
    };

    Listener.prototype._handle_combo_down = function(combo, potential_combos, key, e) {
      var is_autorepeat, is_other_exclusive, potential_combo, result, _i, _len;
      if (__indexOf.call(combo.keys, key) < 0) {
        return false;
      }
      this._prevent_default(e, combo && combo.prevent_default);
      is_autorepeat = false;
      if (__indexOf.call(this._keys_down, key) >= 0) {
        is_autorepeat = true;
        if (!combo.allows_key_repeat()) {
          return false;
        }
      }
      result = this._add_to_active_combos(combo, key);
      combo.keyup_fired = false;
      is_other_exclusive = false;
      if (combo.is_exclusive) {
        for (_i = 0, _len = potential_combos.length; _i < _len; _i++) {
          potential_combo = potential_combos[_i];
          if (potential_combo.is_exclusive && potential_combo.keys.length > combo.keys.length) {
            is_other_exclusive = true;
            break;
          }
        }
      }
      if (!is_other_exclusive) {
        if (combo.is_counting && typeof combo.on_keydown === "function") {
          combo.count += 1;
        }
        if (result) {
          return this._fire("keydown", combo, e, is_autorepeat);
        }
      }
    };

    Listener.prototype._key_up = function(key, e) {
      var active_combo, active_combos_length, combo, combos, i, sequence_combo, shifted_key, unshifted_key, _i, _j, _k, _l, _len, _len1, _len2, _ref, _ref1, _ref2, _ref3;
      unshifted_key = key;
      shifted_key = _convert_to_shifted_key(key, e);
      if (shifted_key) {
        key = shifted_key;
      }
      shifted_key = _keycode_shifted_keys[unshifted_key];
      if (e.shiftKey) {
        if (!(shifted_key && __indexOf.call(this._keys_down, shifted_key) >= 0)) {
          key = unshifted_key;
        }
      } else {
        if (!(unshifted_key && __indexOf.call(this._keys_down, unshifted_key) >= 0)) {
          key = shifted_key;
        }
      }
      sequence_combo = this._get_sequence(key);
      if (sequence_combo) {
        this._fire("keyup", sequence_combo, e);
      }
      if (__indexOf.call(this._keys_down, key) < 0) {
        return false;
      }
      for (i = _i = 0, _ref = this._keys_down.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        if ((_ref1 = this._keys_down[i]) === key || _ref1 === shifted_key || _ref1 === unshifted_key) {
          this._keys_down.splice(i, 1);
          break;
        }
      }
      active_combos_length = this._active_combos.length;
      combos = [];
      _ref2 = this._active_combos;
      for (_j = 0, _len = _ref2.length; _j < _len; _j++) {
        active_combo = _ref2[_j];
        if (__indexOf.call(active_combo.keys, key) >= 0) {
          combos.push(active_combo);
        }
      }
      for (_k = 0, _len1 = combos.length; _k < _len1; _k++) {
        combo = combos[_k];
        this._handle_combo_up(combo, e, key);
      }
      if (active_combos_length > 1) {
        _ref3 = this._active_combos;
        for (_l = 0, _len2 = _ref3.length; _l < _len2; _l++) {
          active_combo = _ref3[_l];
          if (active_combo === void 0 || __indexOf.call(combos, active_combo) >= 0) {
            continue;
          }
          if (!this._keys_remain(active_combo)) {
            this._remove_from_active_combos(active_combo);
          }
        }
      }
    };

    Listener.prototype._handle_combo_up = function(combo, e, key) {
      var keys_down, keys_remaining;
      this._prevent_default(e, combo && combo.prevent_default);
      keys_remaining = this._keys_remain(combo);
      if (!combo.keyup_fired) {
        keys_down = this._keys_down.slice();
        keys_down.push(key);
        if (!combo.is_solitary || _compare_arrays(keys_down, combo.keys)) {
          this._fire("keyup", combo, e);
          if (combo.is_counting && typeof combo.on_keyup === "function" && typeof combo.on_keydown !== "function") {
            combo.count += 1;
          }
        }
      }
      if (!keys_remaining) {
        this._fire("release", combo, e);
        this._remove_from_active_combos(combo);
      }
    };

    Listener.prototype.simple_combo = function(keys, callback) {
      return this.register_combo({
        keys: keys,
        on_keydown: callback
      });
    };

    Listener.prototype.counting_combo = function(keys, count_callback) {
      return this.register_combo({
        keys: keys,
        is_counting: true,
        is_unordered: false,
        on_keydown: count_callback
      });
    };

    Listener.prototype.sequence_combo = function(keys, callback) {
      return this.register_combo({
        keys: keys,
        on_keydown: callback,
        is_sequence: true
      });
    };

    Listener.prototype.register_combo = function(combo_dictionary) {
      var combo, property, value, _ref;
      if (typeof combo_dictionary["keys"] === "string") {
        combo_dictionary["keys"] = combo_dictionary["keys"].split(" ");
      }
      _ref = this._defaults;
      for (property in _ref) {
        if (!__hasProp.call(_ref, property)) continue;
        value = _ref[property];
        if (combo_dictionary[property] === void 0) {
          combo_dictionary[property] = value;
        }
      }
      combo = new Combo(combo_dictionary);
      if (_validate_combo(combo)) {
        this._registered_combos.push(combo);
        return combo;
      }
    };

    Listener.prototype.register_many = function(combo_array) {
      var combo, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = combo_array.length; _i < _len; _i++) {
        combo = combo_array[_i];
        _results.push(this.register_combo(combo));
      }
      return _results;
    };

    Listener.prototype.unregister_combo = function(keys_or_combo) {
      var combo, unregister_combo, _i, _len, _ref;
      if (!keys_or_combo) {
        return false;
      }
      unregister_combo = (function(_this) {
        return function(combo) {
          var i, _i, _ref, _results;
          _results = [];
          for (i = _i = 0, _ref = _this._registered_combos.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
            if (combo === _this._registered_combos[i]) {
              _this._registered_combos.splice(i, 1);
              break;
            } else {
              _results.push(void 0);
            }
          }
          return _results;
        };
      })(this);
      if (keys_or_combo.keys) {
        return unregister_combo(keys_or_combo);
      } else {
        _ref = this._registered_combos;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          combo = _ref[_i];
          if (!combo) {
            continue;
          }
        }
        if (typeof keys_or_combo === "string") {
          keys_or_combo = keys_or_combo.split(" ");
        }
        if ((combo.is_unordered && _compare_arrays(keys_or_combo, combo.keys)) || (!combo.is_unordered && _compare_arrays_sorted(keys_or_combo, combo.keys))) {
          return unregister_combo(combo);
        }
      }
    };

    Listener.prototype.unregister_many = function(combo_array) {
      var combo, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = combo_array.length; _i < _len; _i++) {
        combo = combo_array[_i];
        _results.push(this.unregister_combo(combo));
      }
      return _results;
    };

    Listener.prototype.get_registered_combos = function() {
      return this._registered_combos;
    };

    Listener.prototype.reset = function() {
      return this._registered_combos = [];
    };

    Listener.prototype.listen = function() {
      return this._prevent_capture = false;
    };

    Listener.prototype.stop_listening = function() {
      return this._prevent_capture = true;
    };

    Listener.prototype.get_meta_key = function() {
      return _metakey;
    };

    return Listener;

  })();

  _decide_meta_key = function() {
    if (navigator.userAgent.indexOf("Mac OS X") !== -1) {
      _metakey = "cmd";
    }
  };

  _change_keycodes_by_browser = function() {
    if (navigator.userAgent.indexOf("Opera") !== -1) {
      _keycode_dictionary["17"] = "cmd";
    }
  };

  _convert_key_to_readable = function(k) {
    return _keycode_dictionary[k];
  };

  _filter_array = function(array, callback) {
    var element;
    if (array.filter) {
      return array.filter(callback);
    } else {
      return (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = array.length; _i < _len; _i++) {
          element = array[_i];
          if (callback(element)) {
            _results.push(element);
          }
        }
        return _results;
      })();
    }
  };

  _compare_arrays = function(a1, a2) {
    var item, _i, _len;
    if (a1.length !== a2.length) {
      return false;
    }
    for (_i = 0, _len = a1.length; _i < _len; _i++) {
      item = a1[_i];
      if (__indexOf.call(a2, item) >= 0) {
        continue;
      }
      return false;
    }
    return true;
  };

  _compare_arrays_sorted = function(a1, a2) {
    var i, _i, _ref;
    if (a1.length !== a2.length) {
      return false;
    }
    for (i = _i = 0, _ref = a1.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
      if (a1[i] !== a2[i]) {
        return false;
      }
    }
    return true;
  };

  _is_array_in_array = function(a1, a2) {
    var item, _i, _len;
    for (_i = 0, _len = a1.length; _i < _len; _i++) {
      item = a1[_i];
      if (__indexOf.call(a2, item) < 0) {
        return false;
      }
    }
    return true;
  };

  _is_array_in_array_sorted = function(a1, a2) {
    var index, item, prev, _i, _len;
    prev = 0;
    for (_i = 0, _len = a1.length; _i < _len; _i++) {
      item = a1[_i];
      index = a2.indexOf(item);
      if (index >= prev) {
        prev = index;
      } else {
        return false;
      }
    }
    return true;
  };

  _log_error = function() {
    if (keypress.debug) {
      return console.log.apply(console, arguments);
    }
  };

  _key_is_valid = function(key) {
    var valid, valid_key, _;
    valid = false;
    for (_ in _keycode_dictionary) {
      valid_key = _keycode_dictionary[_];
      if (key === valid_key) {
        valid = true;
        break;
      }
    }
    if (!valid) {
      for (_ in _keycode_shifted_keys) {
        valid_key = _keycode_shifted_keys[_];
        if (key === valid_key) {
          valid = true;
          break;
        }
      }
    }
    return valid;
  };

  _validate_combo = function(combo) {
    var alt_name, i, key, mod_key, non_modifier_keys, property, validated, value, _i, _j, _k, _len, _len1, _ref, _ref1;
    validated = true;
    if (!combo.keys.length) {
      _log_error("You're trying to bind a combo with no keys:", combo);
    }
    for (i = _i = 0, _ref = combo.keys.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
      key = combo.keys[i];
      alt_name = _keycode_alternate_names[key];
      if (alt_name) {
        key = combo.keys[i] = alt_name;
      }
      if (key === "meta") {
        combo.keys.splice(i, 1, _metakey);
      }
      if (key === "cmd") {
        _log_error("Warning: use the \"meta\" key rather than \"cmd\" for Windows compatibility");
      }
    }
    _ref1 = combo.keys;
    for (_j = 0, _len = _ref1.length; _j < _len; _j++) {
      key = _ref1[_j];
      if (!_key_is_valid(key)) {
        _log_error("Do not recognize the key \"" + key + "\"");
        validated = false;
      }
    }
    if (__indexOf.call(combo.keys, "meta") >= 0 || __indexOf.call(combo.keys, "cmd") >= 0) {
      non_modifier_keys = combo.keys.slice();
      for (_k = 0, _len1 = _modifier_keys.length; _k < _len1; _k++) {
        mod_key = _modifier_keys[_k];
        if ((i = non_modifier_keys.indexOf(mod_key)) > -1) {
          non_modifier_keys.splice(i, 1);
        }
      }
      if (non_modifier_keys.length > 1) {
        _log_error("META and CMD key combos cannot have more than 1 non-modifier keys", combo, non_modifier_keys);
        validated = false;
      }
    }
    for (property in combo) {
      value = combo[property];
      if (_factory_defaults[property] === "undefined") {
        _log_error("The property " + property + " is not a valid combo property. Your combo has still been registered.");
      }
    }
    return validated;
  };

  _convert_to_shifted_key = function(key, e) {
    var k;
    if (!e.shiftKey) {
      return false;
    }
    k = _keycode_shifted_keys[key];
    if (k != null) {
      return k;
    }
    return false;
  };

  _modifier_event_mapping = {
    "cmd": "metaKey",
    "ctrl": "ctrlKey",
    "shift": "shiftKey",
    "alt": "altKey"
  };

  _keycode_alternate_names = {
    "escape": "esc",
    "control": "ctrl",
    "command": "cmd",
    "break": "pause",
    "windows": "cmd",
    "option": "alt",
    "caps_lock": "caps",
    "apostrophe": "\'",
    "semicolon": ";",
    "tilde": "~",
    "accent": "`",
    "scroll_lock": "scroll",
    "num_lock": "num"
  };

  _keycode_shifted_keys = {
    "/": "?",
    ".": ">",
    ",": "<",
    "\'": "\"",
    ";": ":",
    "[": "{",
    "]": "}",
    "\\": "|",
    "`": "~",
    "=": "+",
    "-": "_",
    "1": "!",
    "2": "@",
    "3": "#",
    "4": "$",
    "5": "%",
    "6": "^",
    "7": "&",
    "8": "*",
    "9": "(",
    "0": ")"
  };

  _keycode_dictionary = {
    0: "\\",
    8: "backspace",
    9: "tab",
    12: "num",
    13: "enter",
    16: "shift",
    17: "ctrl",
    18: "alt",
    19: "pause",
    20: "caps",
    27: "esc",
    32: "space",
    33: "pageup",
    34: "pagedown",
    35: "end",
    36: "home",
    37: "left",
    38: "up",
    39: "right",
    40: "down",
    44: "print",
    45: "insert",
    46: "delete",
    48: "0",
    49: "1",
    50: "2",
    51: "3",
    52: "4",
    53: "5",
    54: "6",
    55: "7",
    56: "8",
    57: "9",
    65: "a",
    66: "b",
    67: "c",
    68: "d",
    69: "e",
    70: "f",
    71: "g",
    72: "h",
    73: "i",
    74: "j",
    75: "k",
    76: "l",
    77: "m",
    78: "n",
    79: "o",
    80: "p",
    81: "q",
    82: "r",
    83: "s",
    84: "t",
    85: "u",
    86: "v",
    87: "w",
    88: "x",
    89: "y",
    90: "z",
    91: "cmd",
    92: "cmd",
    93: "cmd",
    96: "num_0",
    97: "num_1",
    98: "num_2",
    99: "num_3",
    100: "num_4",
    101: "num_5",
    102: "num_6",
    103: "num_7",
    104: "num_8",
    105: "num_9",
    106: "num_multiply",
    107: "num_add",
    108: "num_enter",
    109: "num_subtract",
    110: "num_decimal",
    111: "num_divide",
    124: "print",
    144: "num",
    145: "scroll",
    186: ";",
    187: "=",
    188: ",",
    189: "-",
    190: ".",
    191: "/",
    192: "`",
    219: "[",
    220: "\\",
    221: "]",
    222: "\'",
    223: "`",
    224: "cmd",
    225: "alt",
    57392: "ctrl",
    63289: "num"
  };

  _decide_meta_key();

  _change_keycodes_by_browser();

  if (typeof define === "function" && define.amd) {
    define([], function() {
      return keypress;
    });
  } else {
    window.keypress = keypress;
  }

}).call(this);

},{}]},{},[1]);