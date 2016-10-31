var Collection = require('ampersand-rest-collection');
var Player = require('./Player');


module.exports = Collection.extend({
    model: Player,
    url: '/api/v1/people/'
});
