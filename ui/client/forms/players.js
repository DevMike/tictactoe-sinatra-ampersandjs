var FormView = require('ampersand-form-view');
var InputView = require('ampersand-input-view');
var templates = require('../templates');
var Game = require('../models/game');
var Player = require('../models/player');

module.exports = FormView.extend({
    fields: function() {
        return [1, 2].map(function(i){
            return new InputView({
                template: templates.includes.formInput(),
                label: 'Player' + i,
                name: 'name' + i,
                placeholder: 'Name',
                parent: this,
                tests: [
                    function (value) {
                        if (value.length > 100) {
                            return "Player name can be no more than 100 characters";
                        }
                    }
                ]
            });
        })
    },
    submitCallback: function (data) {
        if(this.validateUniqueness(data)) return false;
        
        var player1 = new Player({name: data.name1}),
            player2 = new Player({name: data.name2});

        // save players if they haven't created yet
        try {
            player1.save();
            player2.save();
        } catch(err) {
            console.log(err);
        };

        // initialize a new game with the players
        app.game = new Game({
            player1: player1,
            player2: player2
        });
        app.navigate('/game');
    },
    
    validateUniqueness: function(data){
        return data.name1 === data.name2;
    }
});
