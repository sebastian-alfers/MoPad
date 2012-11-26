define(["jquery","backbone","models/GameModel"], function($, Backbone, GameModel) {

    var GameCollection = Backbone.Collection.extend({
        model:GameModel
    });

    // Returns the Model class
    return GameCollection;

});

