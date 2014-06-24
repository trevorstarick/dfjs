var stats = window.stats || {};
var $ = window.jQuery || {};

var App = {};

var Game = {},
  Entity = {},
  Config = {},
  Map = {},
  Settings = {};

Game = {
  map: [],
  entityMap: {},
  version: 1,
};

Settings = {
  tick: 100, // max ticks per second
  size: 8, // size in pixels of block
  width: 640, // size in pixels of width
  height: 360 // size in pixels of height
};

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


// @ENTITY_MAIN
Entity.createNew = function(data, x, y) {
  var id = Object.keys(Game.entityMap).length;

  if (Game.map[x][y] === -1) {
    data.coordinates = [x, y];
    Game.entityMap[id] = data;
    Game.map[x][y] = id;
  }
};

Entity.AI = function(id, task) {

};

// @ENTITY_MOVEMENT
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
};

// @MAP
Map.init = function() {
  var size = Settings.size;
  for (var x = 0; x <= 80 - 1; x++) {
    var row = [];
    for (var y = 0; y <= 45 - 1; y++) {
      row.push(-1);
    }
    Game.map.push(row);
  }
  this.setViewport(Settings.width / 2, Settings.height / 2);
  console.log('Map initialized...');
};

Map.setViewport = function(x, y) {

};

// @GAME
Game.init = function() {
  Game.canvas = document.getElementById("canvas");
  Game.ctx = canvas.getContext("2d");

  Map.init();

  Game.spawn('player');

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
};

Game.update = function() {
  stats.update();
  Game.populate('beast', 3);
  Game.populate('npc', 5);
  Game.populate('block', 10);
};

Game.populate = function(type, limit) {
  if (Object.keys(Game.entityMap).length < limit) {
    var x = getRandomInt(0, 80 - 1),
      y = getRandomInt(0, 45 - 1);
    Entity.createNew({
      type: type
    }, x, y);
  }
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
        Game.ctx.fillStyle = "rgba(255, 255, 255, 1)";
        break;
      case 'npc':
        Game.ctx.fillStyle = "rgba(0, 255, 0, 1)";
        break;
      case 'beast':
        Game.ctx.fillStyle = "rgba(255, 0, 0, 1)";
        break;
      default:
        Game.ctx.fillStyle = "rgba(128, 128, 128, 1)";
    }
    Game.ctx.fillRect(x * size, y * size, 1 * size, 1 * size);
  }
};

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
  clearInterval(Game._interval);
};

Game.start = function() {
  if (Game._interval) {
    clearInterval(Game._interval);
  }
  Game._interval = setInterval(Game.run, 1000 / Settings.tick);
};

Game.clearScreen = function() {
  Game.canvas.width = Game.canvas.width;
};

Game.reset = function() {
  Game.canvas.width = Game.canvas.width;
  Game.map = [];
};

Game.spawn = function(entity) {
  var x = getRandomInt(0, 80 - 1),
    y = getRandomInt(0, 45 - 1);
  Entity.createNew({
    type: entity
  }, x, y);
};


// Start Game
Game.start();