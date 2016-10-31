var AmpersandModel = require('ampersand-model');


module.exports = AmpersandModel.extend({
    url: 'http://0.0.0.0:4567/api/v1/people/',
    props: {
        id: ['number', true, undefined],
        name: 'string',
        wins: ['number', true, 0],
        draws: ['number', true, 0],
        looses: ['number', true, 0]
    }
});
