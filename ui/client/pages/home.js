var PageView = require('./base');
var PlayerView = require('../views/player');
var templates = require('../templates');
var PlayersForm = require('../forms/players');


module.exports = PageView.extend({
    pageTitle: 'home',
    template: templates.pages.home,

    fetchCollection: function () {
        this.collection.fetch({
            reset: true,
            success: function(collection){
                if(collection.length>0)
                    document.querySelector('.people-list-container').classList.remove('hidden');
            }
        });
        return false;
    },

    render: function () {
        this.renderWithTemplate();

        // get collection
        this.renderCollection(
            this.collection,
            PlayerView,
            this.queryByHook('people-list')
        );
        this.fetchCollection();
    },

    subviews: {
        form: {
            container: 'form',
            prepareView: function (el) {
                var model = this.model;
                return new PlayersForm({
                    el: el
                });
            }
        }
    }

});
