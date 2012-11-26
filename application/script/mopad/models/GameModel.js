define(["jquery", "backbone"], function($, Backbone) {

    /**
     * models
     * @type {*}
     */
    GameModel = Backbone.Model.extend({
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