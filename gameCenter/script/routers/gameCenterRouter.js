define(["jquery","backbone", "models/WebSocketModel", "views/GameCenterView"], function($, Backbone, WebSocketModel, GameCenterView){

    var Router = Backbone.Router.extend({

        initialize: function(){
        
            // Tells Backbone to start watching for hashchange events
            Backbone.history.start();

        },

        // All of your Backbone Routes (add more)
        routes: {

            // When there is no hash bang on the url, the home method is called
            "": "home"

        },

        home: function() {
            $webSocketModel = new WebSocketModel({vendorType: 'game'});
            gameCenterView = new GameCenterView({ el:$('#template_register_controller'), webSocketModel: $webSocketModel});


            $webSocketModel.on('sendCommandToGame', function(json){
                console.log(json);
                //$('#userLog').append('<li>'+json.pin+' did a click</li>');
            });



        }
    });

    // Returns the Router class
    return Router;

});