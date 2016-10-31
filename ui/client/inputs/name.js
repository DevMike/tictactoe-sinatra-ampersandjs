var InputView = require('ampersand-input-view');
var templates = require('../templates');

module.exports =  InputView.extend({
    initialize: function () {
        InputView.prototype.initialize.apply(this, {template: templates.includes.formInput()});
    }
});