var App = require('../../../client/app');
var Router = require('../../../client/router');
var HomePage = require('../../../client/pages/home.js');
var PlayersForm = require('../../../client/forms/players');


describe('Home', function () {
    beforeEach(function() {
        this.homePage = new HomePage({
            model: this.game
        });

        spyOn(this.homePage, 'fetchCollection').and.stub();
        spyOn(this.homePage, 'renderCollection').and.stub();
    });

    describe('render', function () {
        it('should do proper actions', function () {
            this.homePage.render();

            expect(this.homePage.fetchCollection).toHaveBeenCalled();
            expect(this.homePage.renderCollection).toHaveBeenCalled();

            //expect(this.app.router.navigate).toHaveBeenCalledWith('/game');
            //expect(this.app.game).toBeDefined();
            // expect(this.app.game.player1.name).toEqual('Max');
            // expect(this.app.game.player2.name).toEqual('Jose');
        });
    });
});