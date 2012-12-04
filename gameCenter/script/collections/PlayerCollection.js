define(["jquery","backbone","models/PlayerModel"], function($, Backbone, PlayerModel) {

    var PlayerCollection = Backbone.Collection.extend({
        model:PlayerModel
    });

    // Returns the Model class
    return PlayerCollection;

});

