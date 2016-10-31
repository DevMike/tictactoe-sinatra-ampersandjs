var Game = require('../../../client/models/game.js');
var Player = require('../../../client/models/player.js');

describe('Game', function () {
    beforeEach(function () {
        this.game = new Game();
    });

    describe('props', function () {
        it('should have players not to be defined', function () {
            expect(this.game.player1).not.toBeDefined();
            expect(this.game.player2).not.toBeDefined();
            expect(this.game.activePlayer).not.toBeDefined();
        });

        it('should have totalAllowedMoves = 9', function () {
            expect(this.game.totalAllowedMoves).toBe(9);
        });

        it('should have currentGameMoves = 0', function () {
            expect(this.game.currentGameMoves).toBe(0);
        });

        it('should have result to be undefined', function () {
            expect(this.game.result).not.toBeDefined();
        });

        it("matches arrays with some of the values", function () {
            var row = [undefined, undefined, undefined];
            expect(this.game.cells).toEqual([row, row, row]);
        });
    })
});
