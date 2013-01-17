define(["jquery","backbone","models/PlayerModel"], function($, Backbone, PlayerModel) {

    /**
     * @author Sebastian Alfers
     *
     * @class Collection to list Models of type PlayerModel
     * @constructs
     *
     * PlayerCollection
     */
    var PlayerCollection = Backbone.Collection.extend({
        model:PlayerModel

    });

    // Returns the Model class
    return PlayerCollection;

});

