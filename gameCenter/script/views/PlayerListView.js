define(['jquery', 'backbone', 'views/PlayerChooserView'], function($, Backbone, PlayerChooserView){

    var PlayerListView = Backbone.View.extend({
        defaults:{
            games: null,
            playerChooser: null
        },
        events:{
            'change input':'changeNumberPlayer'
        },
        initialize:function () {

            console.log('PlayerList');

            this.options.games.model.on("change:currentGame", function (gameListModel) {
                game = gameListModel.get('currentGame');

                //set headline text
                $('#player_headline').html(game.get('name'));

                var template = _.template($('#template_player_slider').html(), {});
                this.$el.html(template);
                
                this.drawPlayerChooser(1);

            }, this);
        },

        changeNumberPlayer:function (event) {
            $('#pins').html(''); // TODO Delete pins

            event.preventDefault();
            var el = $(event.currentTarget);
            this.drawPlayerChooser(el.context.value);
        },
        drawPlayerChooser:function (numberPlayer) {
            if(this.playerChooser == null){
                this.playerChooser = new PlayerChooserView({ el:$('#player_chooser')});
            }
            this.playerChooser.drawPlayer(numberPlayer)
        }
    });


    return PlayerListView;

});

