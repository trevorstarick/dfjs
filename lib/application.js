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