define(["jquery","backbone", "models/WebSocketModel", 'views/WebSocketConnectionStatusView'], function($, Backbone, WebSocketModel, WebSocketConnectionStatusView){

    var Router = Backbone.Router.extend({
        /**
         * @author Sebastian Alfers
         *
         * @class Router to Bootstrap the GameCenter
         *
         * @constructs
         *
         * GameCenterRouter
         */
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
            var $playerPins = new Array();
            $webSocketModel = new WebSocketModel({connectionType: 'game'});

            //richtig hier?
            var webSocketConnectionStatusView = new WebSocketConnectionStatusView({el: $('#template_websocket_connection_status')});

            /*
            $webSocketModel.on('sendCommandToGame', function(json){
                console.log(json);
            });

            console.log($webSocketModel.attributes.connected);
              */


        }
    });

    // Returns the Router class
    return Router;

});