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