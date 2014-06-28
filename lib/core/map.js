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