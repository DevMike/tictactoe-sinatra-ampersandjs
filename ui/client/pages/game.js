var app = require('ampersand-app');
var PageView = require('./base');
var templates = require('../templates');
var Game = require('../models/game');


module.exports = PageView.extend({
    pageTitle: 'Game',
    template: templates.pages.game,
    events: {
        'click .empty[data-hook=move]': 'handleMove'
    },

    render: function () {
        this.renderWithTemplate();
    },

    props: {
      brief: 'string'
    },

    bindings: {
        'brief': '[data-hook=brief]'
    },

    initialize: function() {
        this.setActivePlayer();
        this.setBrief();
    },

    // set a brief message depends on state of result 
    setBrief: function () {
        var model = this.model; 
        if (model.result) {
            this.brief = model.result === 'Draw' ? model.result : model.result + ' won. Congrats!';
        } else {
            this.brief = 'Now it\'s turn of ' + model.activePlayer.name;
        }
    },

    // switch players
    setActivePlayer: function(){
        var model = this.model;
        model.activePlayer = model.activePlayer === model.player1 ? model.player2 : model.player1;
    },

    // extract respective coordinate from clicked element 
    extractCoordinate: function(el, coordinate) {
        return parseInt(el.target.getAttribute('data-'+coordinate));
    },

    // process each 'move'(or a click by board)
    handleMove: function (el) {
        var model = this.model;
        // game has result, there is nothing to do 
        if(model.result) return false;

        // fill respective game cell with respective sign
        el.target.textContent = model.activePlayer === model.player1 ? 'X' : 'O';
        // remove a hook responsible for cell game activity
        el.target.className = el.target.className.replace(/empty/, '');

        // mark cells 'owned' by active player
        model.cells[this.extractCoordinate(el, 'y')][this.extractCoordinate(el, 'x')] = model.activePlayer;

        // increment moves
        model.currentGameMoves++;
        // check if there are available moves
        if(this.model.totalAllowedMoves === model.currentGameMoves) {
            model.result = 'Draw';
        }

        // check if the player won
        this.checkForWin();
        // switch player and ser a new brief if game is not finished
        if(!model.result) this.setActivePlayer();
        this.setBrief();

        // handle result if it is
        if(model.result) this.handleResult();
    },

    // check for win by combinations
    checkForWin: function() {
        var that = this;
        [0,1,2].map(function(i) {
            that.checkForWinningCombination([[i,0], [i,1], [i,2]]); // column
            that.checkForWinningCombination([[0,i], [1,i], [2,i]]); // row
        });

        // diagonals
        this.checkForWinningCombination([[0,0], [1,1], [2,2]]);
        this.checkForWinningCombination([[2,0], [1,1], [0,2]]);
    },

    // check if passed combination is winning
    checkForWinningCombination: function(coordinatesArray) {
        var that = this;
        // extract cells to check
        var cells = coordinatesArray.map(function(coordinates){
            return that.model.cells[coordinates[0]][coordinates[1]];
        });

        // check if winning combination is comparing cells
        if(!!cells.reduce(function(a, b){ return (a && b && a === b) ? a : false; })) {
            // set winner
            this.model.result = this.model.activePlayer.name;
            // show winning combination on game board
            coordinatesArray.map(function(coordinates){
                var cell = document.querySelector('[data-y="'+coordinates[0]+'"][data-x="'+coordinates[1]+'"]');
                cell.className += ' blue';
            });
        }
    },

    handleResult: function() {
        var model = this.model;

        // update players with results
        switch (model.result) {
            case 'Draw':
                model.player1.draws++;
                model.player2.draws++;
                break;
            case model.player1.name:
                model.player1.wins++;
                model.player2.looses++;
                break;
            case model.player2.name:
                model.player1.looses++;
                model.player2.wins++;
                break;
        };

        // save data on backend side and redirect to dashboard
        setTimeout(function() {
            model.player1.save();
            model.player2.save();
            app.navigate('home');
        }, 2000);
    }
});
