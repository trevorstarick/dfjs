(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

window.Settings = {};

var Game = require('./core/game.js');

Settings = {
  tick: 200, // max ticks per second
  size: Math.ceil(window.innerWidth / 80), // size in pixels of block
  maxSize: 8,
  width: 80, // size in pixels of width
  height: 45 // size in pixels of height
};

Settings.updateSize = function() {
  Settings.size = Math.ceil(window.innerWidth / 80);
  Game.canvas.width = Settings.size * Settings.width;
  Game.canvas.height = Settings.size * Settings.height;
  console.log('Size updated...', Settings.size);
};

console.log('%c%c background: #222; color: #bada55', 'background: #222; color: #bada55');

// Start Game
Game.start();
},{"./core/game.js":4}],2:[function(require,module,exports){

},{}],3:[function(require,module,exports){
'use strict';

var Entity = {};

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
  if (Game._interval && !Game.paused) {
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
window.Game = {};

var Map = require('./map.js'),
  Entity = require('./entities.js'),
  AI = require('./ai.js'),
  Physics = require('./physics.js');

Game = {
  map: [],
  entityMap: {},
  version: 1
};

var keysSet = false;

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

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

  Game.spawn('player');

  Game.populate('liquid', {}, 10);
  Game.populate('beast', {}, 7);
  Game.populate('npc', {}, 15);
  Game.populate('block', {}, 100);

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
};

// Initial populating/generation

Game.populate = function(type, data, limit) {
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

Game.spawn = function(type, data) {
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

// Per tick

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

// Controls

Game.run = function() {
  if (Game.map.length) {
    Game.update();
    Game.draw();
  } else {
    Game.init();
    console.log('Game initialized...');
  }
};

Game.pause = function() {
  paused = true;
  clearInterval(Game._interval);
};

Game.start = function() {
  paused = false;
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

module.exports = Game;
},{"./ai.js":2,"./entities.js":3,"./map.js":5,"./physics.js":6}],5:[function(require,module,exports){
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
module.exports=require(2)
},{}]},{},[1]);