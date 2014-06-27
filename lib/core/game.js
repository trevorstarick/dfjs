'use strict';

window.Game = {};

var Map = require('./map.js'),
  Entity = require('./entities.js'),
  AI = require('./ai.js'),
  Physics = require('./physics.js'),
  seedrandom = require('./seedrandom.js');

Game = {
  map: [],
  entityMap: {},
  version: 1,
  state: 'paused',
  seed: QueryString.seed || Math.ceil(Math.random() * Date.now()).toString(36).substring(0, 8)
};

var keysSet = false; // Still not sure what this is for
// @GAME

Game.init = function() {
  // Game = this.readCookie('save');
  this.loops = 0;
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
  if (this.loops % 1000) {
    // Save game
  }
  this.loops += 1;
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