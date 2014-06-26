(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

window.Settings = {};

var Game = require('./core/game.js');

Settings = {
  tick: 200, // max ticks per second
  size: Math.ceil(window.innerWidth / 80), // size in pixels of block
  maxSize: 8,
  width: 80, // size in pixels of width
  height: 45, // size in pixels of height
  seed: Math.ceil(Math.random() * Date.now()).toString(36).substring(0, 8),
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
},{"./core/game.js":4}],2:[function(require,module,exports){

},{}],3:[function(require,module,exports){
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
    return cb(true);
  } else {
    return cb(false);
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
},{}],4:[function(require,module,exports){
'use strict';

window.Game = {};

var Map = require('./map.js'),
  Entity = require('./entities.js'),
  AI = require('./ai.js'),
  Physics = require('./physics.js'),
  MersenneTwister = require('./mersennetwister');

Game = {
  map: [],
  entityMap: {},
  version: 1,
  state: 'paused'
};

var seed = parseInt(Settings.seed, 36);
var m = new MersenneTwister(seed);
console.log(seed, m.random());

var keysSet = false; // Still not sure what this is for

// @GAME
Game.init = function() {

  if (Settings.size > Settings.maxSize) {
    Settings.size = Settings.maxSize;
  }

  Game.canvas = document.getElementById("canvas");
  Game.canvas.width = Settings.size * Settings.width;
  Game.canvas.height = Settings.size * Settings.height;
  Game.ctx = canvas.getContext("2d");

  Map.init();

  Entity.spawn('player');

  Entity.populate('liquid', {}, 10);
  Entity.populate('beast', {}, 7);
  Entity.populate('npc', {}, 15);
  Entity.populate('block', {}, 100);

  if (!keysSet) {
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
    keysSet = true;
  }
  console.log('Game initialized...');
};

Game.update = function() {
  window.stats.update();
  // AI.update();
  // Physics.update();
  // window.onresize = Settings.updateSize; // Comment out to disable auto resize
};

Game.draw = function() {
  var ids = Object.keys(Game.entityMap).length;
  var size = Settings.size;
  Game.canvas.width = Game.canvas.width;
  for (var i = 0; i < ids; i++) {
    var that = Game.entityMap[i];
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
};

Game.pause = function() {
  Game.state = 'paused';
  clearInterval(Game._interval);
};

Game.start = function() {
  Game.state = 'running';
  if (Game._interval) {
    clearInterval(Game._interval);
  }
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
},{"./ai.js":2,"./entities.js":3,"./map.js":5,"./mersennetwister":6,"./physics.js":7}],5:[function(require,module,exports){
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
  foobar: function(argument) {
    var result = argument.substring(0, 16);
    return result;
  }
};

module.exports = new Map();
},{}],6:[function(require,module,exports){
'use strict';

/*
 I've wrapped Makoto Matsumoto and Takuji Nishimura's code in a namespace
 so it's better encapsulated. Now you can have multiple random number generators
 and they won't stomp all over eachother's state.

 If you want to use this as a substitute for Math.random(), use the random()
 method like so:

 var m = new MersenneTwister();
 var randomNumber = m.random();

 You can also call the other genrand_{foo}() methods on the instance.

 If you want to use a specific seed in order to get a repeatable random
 sequence, pass an integer into the constructor:

 var m = new MersenneTwister(123);

 and that will always produce the same random sequence.

 Sean McCullough (banksean@gmail.com)
 */

/*
 A C-program for MT19937, with initialization improved 2002/1/26.
 Coded by Takuji Nishimura and Makoto Matsumoto.

 Before using, initialize the state by using init_genrand(seed)
 or init_by_array(init_key, key_length).

 Copyright (C) 1997 - 2002, Makoto Matsumoto and Takuji Nishimura,
 All rights reserved.

 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions
 are met:

 1. Redistributions of source code must retain the above copyright
 notice, this list of conditions and the following disclaimer.

 2. Redistributions in binary form must reproduce the above copyright
 notice, this list of conditions and the following disclaimer in the
 documentation and/or other materials provided with the distribution.

 3. The names of its contributors may not be used to endorse or promote
 products derived from this software without specific prior written
 permission.

 THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT OWNER OR
 CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
 PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.


 Any feedback is very welcome.
 http://www.math.sci.hiroshima-u.ac.jp/~m-mat/MT/emt.html
 email: m-mat @ math.sci.hiroshima-u.ac.jp (remove space)
 */

var MersenneTwister = function(seed) {
  if (seed == undefined) {
    seed = new Date().getTime();
  }
  /* Period parameters */
  this.N = 624;
  this.M = 397;
  this.MATRIX_A = 0x9908b0df;
  /* constant vector a */
  this.UPPER_MASK = 0x80000000;
  /* most significant w-r bits */
  this.LOWER_MASK = 0x7fffffff;
  /* least significant r bits */

  this.mt = new Array(this.N);
  /* the array for the state vector */
  this.mti = this.N + 1;
  /* mti==N+1 means mt[N] is not initialized */

  this.init_genrand(seed);
};

/* initializes mt[N] with a seed */
MersenneTwister.prototype.init_genrand = function(s) {
  this.mt[0] = s >>> 0;
  for (this.mti = 1; this.mti < this.N; this.mti++) {
    var s = this.mt[this.mti - 1] ^ (this.mt[this.mti - 1] >>> 30);
    this.mt[this.mti] = (((((s & 0xffff0000) >>> 16) * 1812433253) << 16) + (s & 0x0000ffff) * 1812433253) + this.mti;
    /* See Knuth TAOCP Vol2. 3rd Ed. P.106 for multiplier. */
    /* In the previous versions, MSBs of the seed affect   */
    /* only MSBs of the array mt[].                        */
    /* 2002/01/09 modified by Makoto Matsumoto             */
    this.mt[this.mti] >>>= 0;
    /* for >32 bit machines */
  }
};

/* initialize by an array with array-length */
/* init_key is the array for initializing keys */
/* key_length is its length */
/* slight change for C++, 2004/2/26 */
MersenneTwister.prototype.init_by_array = function(init_key, key_length) {
  var i, j, k;
  this.init_genrand(19650218);
  i = 1;
  j = 0;
  k = (this.N > key_length ? this.N : key_length);
  for (; k; k--) {
    var s = this.mt[i - 1] ^ (this.mt[i - 1] >>> 30)
    this.mt[i] = (this.mt[i] ^ (((((s & 0xffff0000) >>> 16) * 1664525) << 16) + ((s & 0x0000ffff) * 1664525))) + init_key[j] + j;
    /* non linear */
    this.mt[i] >>>= 0;
    /* for WORDSIZE > 32 machines */
    i++;
    j++;
    if (i >= this.N) {
      this.mt[0] = this.mt[this.N - 1];
      i = 1;
    }
    if (j >= key_length) j = 0;
  }
  for (k = this.N - 1; k; k--) {
    var s = this.mt[i - 1] ^ (this.mt[i - 1] >>> 30);
    this.mt[i] = (this.mt[i] ^ (((((s & 0xffff0000) >>> 16) * 1566083941) << 16) + (s & 0x0000ffff) * 1566083941)) - i;
    /* non linear */
    this.mt[i] >>>= 0;
    /* for WORDSIZE > 32 machines */
    i++;
    if (i >= this.N) {
      this.mt[0] = this.mt[this.N - 1];
      i = 1;
    }
  }

  this.mt[0] = 0x80000000;
  /* MSB is 1; assuring non-zero initial array */
};

/* generates a random number on [0,0xffffffff]-interval */
MersenneTwister.prototype.genrand_int32 = function() {
  var y;
  var mag01 = new Array(0x0, this.MATRIX_A);
  /* mag01[x] = x * MATRIX_A  for x=0,1 */

  if (this.mti >= this.N) { /* generate N words at one time */
    var kk;

    if (this.mti == this.N + 1) /* if init_genrand() has not been called, */
      this.init_genrand(5489);
    /* a default initial seed is used */

    for (kk = 0; kk < this.N - this.M; kk++) {
      y = (this.mt[kk] & this.UPPER_MASK) | (this.mt[kk + 1] & this.LOWER_MASK);
      this.mt[kk] = this.mt[kk + this.M] ^ (y >>> 1) ^ mag01[y & 0x1];
    }
    for (; kk < this.N - 1; kk++) {
      y = (this.mt[kk] & this.UPPER_MASK) | (this.mt[kk + 1] & this.LOWER_MASK);
      this.mt[kk] = this.mt[kk + (this.M - this.N)] ^ (y >>> 1) ^ mag01[y & 0x1];
    }
    y = (this.mt[this.N - 1] & this.UPPER_MASK) | (this.mt[0] & this.LOWER_MASK);
    this.mt[this.N - 1] = this.mt[this.M - 1] ^ (y >>> 1) ^ mag01[y & 0x1];

    this.mti = 0;
  }

  y = this.mt[this.mti++];

  /* Tempering */
  y ^= (y >>> 11);
  y ^= (y << 7) & 0x9d2c5680;
  y ^= (y << 15) & 0xefc60000;
  y ^= (y >>> 18);

  return y >>> 0;
};

/* generates a random number on [0,0x7fffffff]-interval */
MersenneTwister.prototype.genrand_int31 = function() {
  return (this.genrand_int32() >>> 1);
};

/* generates a random number on [0,1]-real-interval */
MersenneTwister.prototype.genrand_real1 = function() {
  return this.genrand_int32() * (1.0 / 4294967295.0);
  /* divided by 2^32-1 */
};

/* generates a random number on [0,1)-real-interval */
MersenneTwister.prototype.random = function() {
  return this.genrand_int32() * (1.0 / 4294967296.0);
  /* divided by 2^32 */
};

/* generates a random number on (0,1)-real-interval */
MersenneTwister.prototype.genrand_real3 = function() {
  return (this.genrand_int32() + 0.5) * (1.0 / 4294967296.0);
  /* divided by 2^32 */
};

/* generates a random number on [0,1) with 53-bit resolution*/
MersenneTwister.prototype.genrand_res53 = function() {
  var a = this.genrand_int32() >>> 5,
    b = this.genrand_int32() >>> 6;
  return (a * 67108864.0 + b) * (1.0 / 9007199254740992.0);
};
/* These real versions are due to Isaku Wada, 2002/01/09 added */

//Export the Browserify module
module.exports = MersenneTwister;
},{}],7:[function(require,module,exports){
module.exports=require(2)
},{}]},{},[1])