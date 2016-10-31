var PlayersForm = require('../../../client/forms/players');
var Player = require('../../../client/models/player');


describe('Players Form', function () {
    beforeEach(function() {
        this.form = new PlayersForm();
    });

    describe('submitCallback', function () {
        beforeEach(function() {
            spyOn(window, 'Player').and.callFake(function (name) {
                return {
                    name: name,
                    save: function () {
                    }
                }
            });

            spyOn(window.app, 'navigate').and.callThrough()
            window.app.game = undefined;
        });

        it('should not do any actions if invalid', function () {
            this.form.submitCallback({name1: 'Jose', name2: 'Jose'});

            expect(window.app.navigate).not.toHaveBeenCalledWith('/game');
            expect(window.app.game).not.toBeDefined();
        });

        it('should do proper actions', function () {
            this.form.submitCallback({name1: 'Max', name2: 'Jose'});

            expect(window.app.navigate).toHaveBeenCalledWith('/game');
            expect(window.app.game).toBeDefined();
            expect(window.app.game.player1.name).toEqual('Max');
            expect(window.app.game.player2.name).toEqual('Jose');
        });
    });

    describe('validateUniqueness', function () {
        it('should validate name uniqueness', function () {
            expect(this.form.validateUniqueness({name1: 'Mike', name2: 'Mike'})).toBe(true);
            expect(this.form.validateUniqueness({name1: 'Max', name2: 'Mike'})).toBe(false);
        });
    });
});