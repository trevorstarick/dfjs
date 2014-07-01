var PF = require('pathfinding');

var blockMap = [
  [0, 0, 0, 0, 0],
  [1, 0, 0, 0, 2],
  [0, 0, 1, 0, 0],
];

var width = blockMap[0].length;
var height = blockMap.length;
console.log(width, height);
var entityMap = {
  1: {
    type: 'beast',
    strength: 100,
    name: 'Foo',
    coords: [0, 1]
  },
  4: {
    type: 'player',
    strength: 100,
    name: 'Bar',
    coords: [4, 2]
  }
};

var player = entityMap[4];

var grid = new PF.Grid(width, height, blockMap);
var finder = new PF.AStarFinder();
var path = finder.findPath(1, 2, 4, 2, grid);
console.log(path);

function pathGen(pos1, pos2, grid) {
  var x1 = pos1[0],
    x2 = pos2[0],
    y1 = pos1[1],
    y2 = pos2[1];
  console.log(x1, y1, x2, y2);
  return finder.findPath(x1, y1, x2, y2, grid);
}

// beast --> player
// beast --> npc.*
// npc.warrior --> beast
// npc.*-warrior --> garrison

// BEAST CALC
function beastToPlayer() {
  for (var id = 1; id < 2; id++) {
    console.log(id);
    var entity = entityMap[id];
    var pos1 = entity.coords;
    var pos2 = player.coords;

    var gridPrime = grid.clone();
    var path = pathGen(pos1, pos2, gridPrime);
    console.dir(path);
  }
}

// beastToPlayer();