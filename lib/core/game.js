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