define(['jquery', 'backbone','models/GameCenterModel', 'views/GameListView', 'views/PlayerListView'], function($, Backbone, GameCenterModel, GameListView, PlayerListView){

    var GameCenterView = Backbone.View.extend({
        /**
         * @author Sebastian Alfers
         *
         * @class View to render the entire GameCenter
         *
         * @constructs
         *
         * WebSocketModel
         */
        defaults:{
            games:null,
            gameCenterModel: null,
            webSocketModel: null
        },

        initialize:function () {
            gameCenterModel = new GameCenterModel({publicKey: 123456});

            gameCenterModel.on('successOnGenerateUnidqueAppId', function(data){
                this.games = new GameListView({ el:$('#list_games_li'),games:this.games });
                this.player = new PlayerListView({el:$('#player_slider'), games:this.games});
            });

            gameCenterModel.on('errorOnGenerateUnidqueAppId', function(data){
                console.log('Event errorOnGenerateUnidqueAppId: ' + data);
            });
        }
    });

    return GameCenterView;

});

