define(["backbone","models/GameModel"], function(Backbone, GameModel) {

    /**
     *
     * @author Sebastian Alfers
     *
     * @class Collection to list Models of type GamesModel
     * @constructs
     *
     * GameCollection
     */
    var GameCollection = Backbone.Collection.extend({

        model:GameModel
    });

    // Returns the Model class
    return GameCollection;

});

