var View = require('ampersand-view');
var templates = require('../templates');


module.exports = View.extend({
    template: templates.includes.player,
    bindings: {
        'model.name': '[data-hook~=name]',
        'model.wins': '[data-hook~=wins]',
        'model.draws': '[data-hook~=draws]',
        'model.looses': '[data-hook~=looses]'
    }    
});
