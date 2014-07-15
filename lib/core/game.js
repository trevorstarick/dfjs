'use strict';

window.Game = {};

var Map = require('./map.js'),
  Entity = require('./entities.js'),
  Input = require('../input/keypress.js'),
  Pathfinding = require('../ai/pathfinding.js'),
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
  var finder = new Pathfinding.AStarFinder();


  listener.simple_combo("shift d", function() {
    gui.Window.get().showDevTools();
  });

  listener.simple_combo("shift r", function() {
    // run pathfinding
    var grid = new Pathfinding.Grid(Settings.width, Settings.height, map);
    var path = finder.findPath(1, 2, 4, 2, grid);
    for (var coords in path) {
      console.log(path[coords]);
    }
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
  Game.ctx.imageSmoothingEnabled = false;
  Game.ctx.webkitImageSmoothingEnabled = false;
  Game.ctx.mozImageSmoothingEnabled = false;
  Game.ctx.oImageSmoothingEnabled = false;

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
  // Entity.populate('liquid', {}, 10);
  Entity.populate('beast', {}, 1);
  // Entity.populate('npc', {}, 15);
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