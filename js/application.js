var stats = window.stats || {};
var $ = window.jQuery || {};

var Game = {},
  Entity = {},
  Config = {},
  Map = {},
  Settings = {},
  AI = {},
  Physics = {};

Game = {
  map: [],
  entityMap: {},
  version: 1
};

Settings = {
  tick: 200, // max ticks per second
  size: Math.ceil(window.innerWidth / 80), // size in pixels of block
  maxSize: 8,
  width: 80, // size in pixels of width
  height: 45 // size in pixels of height
};

var keysSet = false; // 

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function say(msg, color) {
  color = color || 'black';
  console.log("%c" + msg, "color:" + color + ";font-weight:bold;");
}

Settings.updateSize = function() {
  Settings.size = Math.ceil(window.innerWidth / 80);
  Game.canvas.width = Settings.size * Settings.width;
  Game.canvas.height = Settings.size * Settings.height;
  console.log('Size updated...', Settings.size);
};

console.log('%c Oh my heavens! ', 'background: #222; color: #bada55');

// @ENTITY_MAIN
Entity.createNew = function(data, pos, cb) {
  var id = Object.keys(Game.entityMap).length;
  var x = pos[0],
    y = pos[1];

  if (Game.map[x][y] === -1) {
    data.coordinates = [x, y];
    Game.entityMap[id] = data;
    Game.map[x][y] = id;
    console.log('g');
    return cb(true);
  } else {
    console.log('b');
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
  if (Game._interval && !paused) {
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

// @MAP
Map.init = function() {
  for (var x = 0; x <= 80 - 1; x++) {
    var row = [];
    for (var y = 0; y <= 45 - 1; y++) {
      row.push(-1);
    }
    Game.map.push(row);
  }
  console.log('Map initialized...');
};

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
  while (spawned < limit) {
    var x = getRandomInt(0, 80 - 1),
      y = getRandomInt(0, 45 - 1);
    Entity.createNew({
      type: type,
      data: data
    }, [x, y], function(success) {
      if (success) spawned += 1;
    });
  }
};

Game.spawn = function(type, data) {
  data = data || {};
  var spawned = 0;
  while (spawned < 1) {
    var x = getRandomInt(0, 80 - 1),
      y = getRandomInt(0, 45 - 1);
    Entity.createNew({
      type: type,
      data: data
    }, [x, y], function(success) {
      if (success) spawned += 1;
    });
  }
};

// Per tick

Game.update = function() {
  stats.update();
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

// Start Game
Game.start();