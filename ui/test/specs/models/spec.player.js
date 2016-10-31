Player = require('../../../client/models/player');

describe('Player model', function () {
    beforeEach(function () {
        this.player = new Player();
    });

    describe('props', function () {
        it('should have id not to be defined', function () {
            expect(this.player.id).not.toBeDefined();
        });

        it('should have name not to be defined', function () {
            expect(this.player.id).not.toBeDefined();
        });

        it('should have stats params = 0', function () {
            expect(this.player.wins).toBe(0);
            expect(this.player.draws).toBe(0);
            expect(this.player.looses).toBe(0);
        });
    });
});