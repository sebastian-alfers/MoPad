define(['jquery', 'backbone', "views/GameCenterView"], function($, Backbone, GameCenterView){

    var WebSocketConnectionStatusView = Backbone.View.extend({
        /**
         * @author Sebastian Alfers
         *
         * @class Represents the status of the WebSocket connection
         *
         * @constructs
         *
         * WebSocketConnectionStatusView
         */

        initialize:function () {
            $webSocketModel.on("onopen", function () {
                this.connectionOk();
            }, this);

            $webSocketModel.on("onclose", function () {
                this.connectionError();
            }, this);
        },

        connectionOk: function(){
            console.log(this.$el.addClass('connection-ok'));
            gameCenterView = new GameCenterView({ el:$('#template_register_controller'), webSocketModel: $webSocketModel});
        },
        connectionError: function(){
            console.log(this.$el.removeClass('connection-ok'));
        }
    });


    return WebSocketConnectionStatusView;

});

