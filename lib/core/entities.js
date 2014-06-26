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