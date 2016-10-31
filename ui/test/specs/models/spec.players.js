var Players = require('../../../client/models/players');

describe('Players model', function () {
    beforeEach(function () {
        this.players = new Players();
    });

    it('should relate to Player', function () {
        expect(this.players.model).not.toBe(Player);
    });
});