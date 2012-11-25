define(["jquery","backbone","models/GameCenterModel", "models/WebSocketModel", "views/GameCenterView"], function($, Backbone, GameCenterModel, WebSocketModel, GameCenterView){

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

            gameCenterModel = new GameCenterModel({publicKey: 123456});
            webSocketModel = new WebSocketModel();
            gameCenterView = new GameCenterView({ el:$('#tab_content'), gameCenterModel: gameCenterModel, webSocketModel: webSocketModel});


        }
    });

    // Returns the Router class
    return Router;

});