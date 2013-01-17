define(["jquery", "backbone"], function($, Backbone) {

    PlayerModel = Backbone.Model.extend({
        /**
         * @author Sebastian Alfers
         *
         * @class Store all data for a Player
         *
         * @constructs
         *
         * PlayerModel
         */
        idAttribute: 'username',
        defaults:{
            username: null,
            pin: null
        },
        pending: function(totalFetched, playerCount){
            console.log('ja, am waiting ' + totalFetched +', ' + playerCount );
            if(totalFetched == playerCount){
                //listen to sockets
            }
        }
    });


    return PlayerModel;

});