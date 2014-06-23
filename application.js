var stats = window.stats || {};
var $ = window.jQuery || {};

var Game = {
    map: [],
    entityMap: {},
    settings: {
        version: 1,
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
    var size = Game.settings.size;
    var type = data.type || 'block';
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
    Game.entityMap[id] = data;
    Game.map[x][y] = id;
}

// @ENTITY_MOVEMENT
Entity.MoveLeft = function(id) {
    var Entity = Game.entityMap[id];
    updatePoint(id)
}

Entity.MoveUp = function(id) {
    console.log(Game.entityMap[id]);
}

Entity.MoveRight = function(id) {
    console.log(Game.entityMap[id]);
}

Entity.MoveDown = function(id) {
    console.log(Game.entityMap[id]);
}

// @GAME
Game.init = function() {
    Game.canvas = document.getElementById("canvas");
    Game.ctx = canvas.getContext("2d");
    Game.initMap();
    // choosePoint('player', '0');
    $(document).keydown(function(event) {
        switch (event.keyCode) {
            case 37:
                move.Left(0);
                break
            case 38:
                move.Up(0);
                break;
            case 39:
                move.Right(0);
                break;
            case 40:
                move.Down(0);
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
    var x = getRandomInt(0, 80 - 1),
        y = getRandomInt(0, 45 - 1);
    Entity.createNew({
        type: 'block'
    }, x, y);
};

Game.draw = function() {};

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

Game.reset = function() {
    Game.canvas.width = Game.canvas.width;
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