define(['jquery', 'backbone','models/GameCenterModel', 'views/GameListView', 'views/PlayerListView'], function($, Backbone, GameCenterModel, GameListView, PlayerListView){

    var GameCenterView = Backbone.View.extend({

        defaults:{
            games:null,
            gameCenterModel: null,
            webSocketModel: null
        },

        initialize:function () {

            this.options.gameCenterModel.on('successOnGenerateUnidqueAppId', function(data){


                this.games = new GameListView({ el:$('#list_games_li') });
                this.player = new PlayerListView({el:$('#player_slider'), games:this.games});

                //console.log(this.options.publicKey);
                //console.log(this.options.uniqueAppIdForBridge);

                $('#get_controller_for_pins').click(function(){
                    send({type: 'getControllersForGame'});
                    console.log('jea did');
                });

            });
            this.options.gameCenterModel.on('errorOnGenerateUnidqueAppId', function(data){
                //more error logic if needed
            });

        }
    });

    return GameCenterView;

});

