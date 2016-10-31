var AmpersandModel = require('ampersand-model');
var Player = require('./player');

module.exports = AmpersandModel.extend({
    props: {
        player1: 'object',
        player2: 'object',
        activePlayer: 'object',
        totalAllowedMoves: ['number', true, 9],
        currentGameMoves: ['number', true, 0],
        result: 'string',
        cells: {
            type: 'object',
            default: function () {
                var cells = [];
                return [0, 1, 2].map(function (y) {
                    cells[y] = [];
                    return [0, 1, 2].map(function (x) {
                        cells[y][x] = undefined;
                    });
                });
            }
        }
    }
});
