var Game = require('../../../client/models/game.js');
var GamePage = require('../../../client/pages/game.js');



describe('Game', function () {
    beforeEach(function () {
        this.game = new Game({
            player1: new Player({name: 'Alex'}),
            player2: new Player({name: 'Greg'})
        });

        this.gamePage = new GamePage({
            model: this.game
        });

        this.gamePage.render();
    });

    describe('initialize', function() {
        it('should call proper functions on initialize', function () {
            spyOn(this.gamePage, 'setActivePlayer').and.callThrough();
            spyOn(this.gamePage, 'setBrief').and.callThrough();

            this.gamePage.initialize();

            expect(this.gamePage.setActivePlayer).toHaveBeenCalled();
            expect(this.gamePage.setBrief).toHaveBeenCalled();
        });
    });

    describe('setBrief', function() {
        it('should set briefMessage depends on result', function () {
            this.gamePage.setBrief();
            expect(this.gamePage.brief).toEqual('Now it\'s turn of ' + this.gamePage.model.activePlayer.name);

            this.gamePage.model.result = 'Draw';
            this.gamePage.setBrief();
            expect(this.gamePage.brief).toEqual('Draw');

            this.gamePage.model.result = this.gamePage.model.player1.name;
            this.gamePage.setBrief();
            expect(this.gamePage.brief).toEqual(this.gamePage.model.player1.name + ' won. Congrats!');

            this.gamePage.model.result = this.gamePage.model.player2.name;
            this.gamePage.setBrief();
            expect(this.gamePage.brief).toEqual(this.gamePage.model.player2.name + ' won. Congrats!');
        });
    });

    describe('setActivePlayer', function() {
        it('should toggle players', function () {
            expect(this.gamePage.model.activePlayer).toEqual(this.gamePage.model.player1);

            this.gamePage.setActivePlayer();
            expect(this.gamePage.model.activePlayer).toEqual(this.gamePage.model.player2);
        });
    });

    describe('extractCoordinate', function() {
        beforeEach(function () {
            this.cell = this.gamePage.query('[data-y="0"][data-x="1"]');
            this.cell.target = this.cell;
        });

        it('should extract respective coordinate from passed element', function () {
            expect(this.gamePage.extractCoordinate(this.cell, 'y')).toEqual(0);
        });
    });

    describe('handleMove', function() {
        beforeEach(function () {
            this.cell = this.gamePage.query('[data-y="0"][data-x="1"]');
            this.cell.target = this.cell;
        });

        it('should return false if result is present', function () {
            this.gamePage.model.result = 'Draw';

            expect(this.gamePage.handleMove(this.cell)).toEqual(false);
        });

        it('should set cell target attributes', function () {
            this.gamePage.handleMove(this.cell);

            expect(this.cell.target.textContent).toEqual('X');
            expect(this.cell.target.className).not.toMatch(/empty/);
        });

        it('should update respective cell with active player', function () {
            var currentPlayer = this.gamePage.model.activePlayer;

            this.gamePage.handleMove(this.cell);

            expect(this.gamePage.model.cells[0][1]).toEqual(currentPlayer);
        });

        it('should increment currentGameMoves', function () {
            var currentPlayer = this.gamePage.model.activePlayer;

            this.gamePage.handleMove(this.cell);

            expect(this.gamePage.model.currentGameMoves).toEqual(1);
        });

        it('should set result to Draw when there are no moves anymore', function () {
            this.gamePage.handleMove(this.cell);
            expect(this.gamePage.model.result).not.toEqual('Draw');

            this.gamePage.model.currentGameMoves = 8;
            this.gamePage.handleMove(this.cell);
            expect(this.gamePage.model.result).toEqual('Draw');
        });

        it('should call proper functions', function () {
            spyOn(this.gamePage, 'checkForWin').and.callThrough();
            spyOn(this.gamePage, 'setBrief').and.callThrough();

            this.gamePage.handleMove(this.cell);

            expect(this.gamePage.checkForWin).toHaveBeenCalled();
            expect(this.gamePage.setBrief).toHaveBeenCalled();
        });

        it('should set active player when game is not finished, but not handle results', function () {
            spyOn(this.gamePage, 'setActivePlayer').and.callThrough();
            spyOn(this.gamePage, 'handleResult').and.callThrough();

            this.gamePage.handleMove(this.cell);

            expect(this.gamePage.setActivePlayer).toHaveBeenCalled();
            expect(this.gamePage.handleResult).not.toHaveBeenCalled();
        });

        it('should not set active player when someone won, but handle results', function () {
            var page = this.gamePage;
            this.gamePage.checkForWin = function(){
                page.model.result = page.model.player1.name;
            };
            spyOn(this.gamePage, 'setActivePlayer').and.callThrough();
            spyOn(this.gamePage, 'handleResult').and.callThrough();

            this.gamePage.handleMove(this.cell);

            expect(this.gamePage.setActivePlayer).not.toHaveBeenCalled();
            expect(this.gamePage.handleResult).toHaveBeenCalled();
        });
    });

    describe('checkForWin', function() {
        beforeEach(function () {
            spyOn(this.gamePage, 'checkForWinningCombination').and.callThrough();

            this.gamePage.checkForWin();
        });

        it('should pass proper combinations', function () {
            expect(this.gamePage.checkForWinningCombination).toHaveBeenCalledWith([[0,0], [0,1], [0,2]]);
            expect(this.gamePage.checkForWinningCombination).toHaveBeenCalledWith([[1,0], [1,1], [1,2]]);
            expect(this.gamePage.checkForWinningCombination).toHaveBeenCalledWith([[2,0], [2,1], [2,2]]);
            expect(this.gamePage.checkForWinningCombination).toHaveBeenCalledWith([[0,0], [1,0], [2,0]]);
            expect(this.gamePage.checkForWinningCombination).toHaveBeenCalledWith([[0,1], [1,1], [2,1]]);
            expect(this.gamePage.checkForWinningCombination).toHaveBeenCalledWith([[0,2], [1,2], [2,2]]);
            expect(this.gamePage.checkForWinningCombination).toHaveBeenCalledWith([[0,0], [1,1], [2,2]]);
            expect(this.gamePage.checkForWinningCombination).toHaveBeenCalledWith([[2,0], [1,1], [0,2]]);
        });
    });

    describe('checkForWinningCombination', function() {
        beforeEach(function () {
            this.gamePage.model.cells[2][0] = this.gamePage.model.activePlayer;
            this.gamePage.model.cells[1][1] = this.gamePage.model.activePlayer;
            this.gamePage.model.cells[0][2] = this.gamePage.model.activePlayer;
        });

        it('should update result and show winning cells', function () {
            this.el = this.gamePage.el;
            document.body.appendChild(this.gamePage.el);

            this.gamePage.checkForWin([[0,0], [1,2], [2,2]]);
            expect(this.gamePage.query('[data-y="0"][data-x="0"]').className).not.toMatch(/blue/);

            this.gamePage.checkForWin([[2,0], [1,1], [0,2]]);
            expect(this.gamePage.query('[data-y="2"][data-x="0"]').className).toMatch(/blue/);
            expect(this.gamePage.model.result).toEqual(this.gamePage.model.activePlayer.name);
        });
    });

    describe('handleResult', function() {
        it('should update draws', function () {
            this.gamePage.model.result = 'Draw';
            this.gamePage.handleResult();
            expect(this.gamePage.model.player1.draws).toEqual(1);
            expect(this.gamePage.model.player1.wins).toEqual(0);
            expect(this.gamePage.model.player1.looses).toEqual(0);
            expect(this.gamePage.model.player2.draws).toEqual(1);
            expect(this.gamePage.model.player2.wins).toEqual(0);
            expect(this.gamePage.model.player2.looses).toEqual(0);
        });

        it('should update first player win', function () {
            this.gamePage.model.result = this.gamePage.model.player1.name;
            this.gamePage.handleResult();
            expect(this.gamePage.model.player1.draws).toEqual(0);
            expect(this.gamePage.model.player1.wins).toEqual(1);
            expect(this.gamePage.model.player1.looses).toEqual(0);
            expect(this.gamePage.model.player2.draws).toEqual(0);
            expect(this.gamePage.model.player2.wins).toEqual(0);
            expect(this.gamePage.model.player2.looses).toEqual(1);
        });

        it('should update second player win', function () {
            this.gamePage.model.result = this.gamePage.model.player2.name;
            this.gamePage.handleResult();
            expect(this.gamePage.model.player1.draws).toEqual(0);
            expect(this.gamePage.model.player1.wins).toEqual(0);
            expect(this.gamePage.model.player1.looses).toEqual(1);
            expect(this.gamePage.model.player2.draws).toEqual(0);
            expect(this.gamePage.model.player2.wins).toEqual(1);
            expect(this.gamePage.model.player2.looses).toEqual(0);
        });
    });
});    
