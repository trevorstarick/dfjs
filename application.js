var stats = window.stats || {};
var $ = window.jQuery || {};

var Game = {
    map: [],
    entityMap: {},
    stopped: 1,
    version: 1,
    settings: {
        size: 8,
        tick: 100,
        xMulti: 1,
        yMulti: 1
    }
};

var Entity = {};

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
}

// @ENTITY_MOVEMENT
Entity.MoveLeft = function(id) {
    // check colision with blocks
    // check map bounding
    var that = Game.entityMap[id];
    var cord = that.coordinates;

    Game.map[cord[0]][cord[1]] = -1;
    var next = Game.map[cord[0] - 1][cord[1]];
    console.log(next);

    Game.map[cord[0] - 1][cord[1]] = id;
    that.coordinates = [cord[0] - 1, cord[1]];
}

Entity.MoveUp = function(id) {
    var that = Game.entityMap[id];
    var cord = that.coordinates;

    Game.map[cord[0]][cord[1]] = -1;
    var next = Game.map[cord[0]][cord[1] - 1];
    console.log(next);

    Game.map[cord[0]][cord[1] - 1] = id;
    that.coordinates = [cord[0], cord[1] - 1];
}

Entity.MoveRight = function(id) {
    var that = Game.entityMap[id];
    var cord = that.coordinates;

    Game.map[cord[0]][cord[1]] = -1;
    var next = Game.map[cord[0] + 1][cord[1]];
    console.log(next);

    Game.map[cord[0] + 1][cord[1]] = id;
    that.coordinates = [cord[0] + 1, cord[1]];
}

Entity.MoveDown = function(id) {
    var that = Game.entityMap[id];
    var cord = that.coordinates;

    Game.map[cord[0]][cord[1]] = -1;
    var next = Game.map[cord[0]][cord[1] + 1];
    console.log(next);

    Game.map[cord[0]][cord[1] + 1] = id;
    that.coordinates = [cord[0], cord[1] + 1];
}

// @GAME
Game.init = function() {
    Game.canvas = document.getElementById("canvas");
    Game.ctx = canvas.getContext("2d");

    Game.initMap();

    Game.spawn('player');

    $(document).keydown(function(event) {
        switch (event.keyCode) {
            case 37:
                Entity.MoveLeft(0);
                break
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

Game.initMap = function() {
    var size = Game.settings.size;
    for (var x = 0; x <= 80 - 1; x++) {
        var row = [];
        for (var y = 0; y <= 45 - 1; y++) {
            row.push(-1);
        }
        Game.map.push(row);
    }
}

Game.update = function() {
    stats.update();
    if (Object.keys(Game.entityMap).length < 1000) {
        var x = getRandomInt(0, 80 - 1),
            y = getRandomInt(0, 45 - 1);
        Entity.createNew({
            type: 'block'
        }, x, y);
    }
};

Game.draw = function() {
    var ids = Object.keys(Game.entityMap).length;
    var size = Game.settings.size;
    Game.canvas.width = Game.canvas.width;
    for (var i = 0; i < ids; i++) {
        var that = Game.entityMap[i];
        var x = that.coordinates[0];
        var y = that.coordinates[1];
        var type = that.type;
        switch (type) {
            case 'player':
                Game.ctx.fillStyle = "rgba(0, 0, 256, 1)";
                break;
            case 'npc':
                Game.ctx.fillStyle = "rgba(0, 256, 0, 1)";
                break;
            case 'beast':
                Game.ctx.fillStyle = "rgba(256, 0, 0, 1)";
                break;
            case 'block':
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
        console.log('Game initialized...');
        Game.init();
    }
};

Game.pause = function() {
    clearInterval(Game._interval);
};

Game.start = function() {
    if (Game._interval) {
        clearInterval(Game._interval);
    }
    Game._interval = setInterval(Game.run, 1000 / Game.settings.tick);
};

Game.clearScreen = function() {
    Game.canvas.width = Game.canvas.width;
}

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