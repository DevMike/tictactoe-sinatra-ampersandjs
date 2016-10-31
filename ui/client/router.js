var app = require('ampersand-app');
var Router = require('ampersand-router');
var HomePage = require('./pages/home');
var GamePage = require('./pages/game');


module.exports = Router.extend({
    routes: {
        '': 'home',
        'game': 'game',
        '(*path)': 'catchAll'
    },

    // ------- ROUTE HANDLERS ---------
    home: function () {
        app.trigger('page', new HomePage({
            collection: app.players,
            model: app.player
        }));
    },

    game: function () {
        app.trigger('page', new GamePage({
            model: app.game
        }));
    },
    catchAll: function () {
        this.redirectTo('');
    }
});
