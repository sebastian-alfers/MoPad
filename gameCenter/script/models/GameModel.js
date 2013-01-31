define(["jquery", "backbone"], function($, Backbone) {

    /**
     * models
     * @type {*}
     */
    GameModel = Backbone.Model.extend({
        /**
         * @author Sebastian Alfers
         *
         * @class Store all data for a Game
         *
         * @constructs
         *
         * GameModel
         */
        defaults:{
            icon:"",
            name:"",
            description:""
        },

        /**
         * @memberof GameModel
         * @member icon
         * @type String
         * @desc absolute icon url for the game for the list
         */

        /**
         * @memberof GameModel
         * @member name
         * @type String
         * @desc name of the game
         */

        /**
         * @memberof GameModel
         * @member description
         * @type String
         * @desc description of the game ( currently not needet)
         */

        /**
         * @memberof GameModel
         * @function initialize
         *
         * @desc constructor
         */
        initialize:function () {
            //init code
        }
    });

    return GameModel;

});