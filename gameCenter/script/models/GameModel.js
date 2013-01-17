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
        initialize:function () {
            //init code
        }
    });

    return GameModel;

});