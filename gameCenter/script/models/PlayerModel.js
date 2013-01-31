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
        }

        /**
         * @memberof PlayerModel
         * @member username
         * @type String
         * @desc the username of the player
         */

        /**
         * @memberof PlayerModel
         * @member pin
         * @type String
         * @desc store the pin that the player has to enter on the controller
         */

    });


    return PlayerModel;

});