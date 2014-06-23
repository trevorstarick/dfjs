var stats = window.stats || {};
var $ = window.jQuery || {};

var Game = {
    version: 1,
    size: 64,
    tick: 30,
    map: []
};

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function choosePoint() {
    var x = getRandomInt(0, Game.size - 1),
        y = getRandomInt(0, Game.size - 1);
    Game.map[x][y].data = 'player';
    console.log(Game.map[x][y]);
}

function initMap() {
    for (var x = 0; x <= Game.size - 1; x++) {
        var row = [];
        for (var y = 0; y <= Game.size - 1; y++) {
            var data = {
                coordinates: [x, y],
                data: 0
            };
            row.push(data);
        }
        Game.map.push(row);
    }
}

Game.init = function() {
    initMap();
    choosePoint();
};

Game.update = function() {
    stats.update();
    choosePoint();
};

Game.draw = function() {
    var table = document.createElement('table'),
        tableBody = document.createElement('tbody');

    Game.map.forEach(function(rowData) {
        var row = document.createElement('tr');

        rowData.forEach(function(cellData) {
            var cell = document.createElement('td');
            cell.className = cellData.data;
            row.appendChild(cell);
        });

        tableBody.appendChild(row);
    });

    table.appendChild(tableBody);
    if ($('table').length) {
        $('table').replaceWith(table);
    } else {
        document.body.appendChild(table);
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
    Game._interval = setInterval(Game.run, 1000 / Game.tick);
};

Game.reset = function() {
    Game.map = [];
};

Game.start();
