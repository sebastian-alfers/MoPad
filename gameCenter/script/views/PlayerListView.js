define(['jquery', 'backbone', 'views/PlayerChooserView'], function($, Backbone, PlayerChooserView){

    var PlayerListView = Backbone.View.extend({
        /**
         * @author Sebastian Alfers
         *
         * @class React on change of number of player slider
         *
         * @constructs
         *
         * PlayerListView
         */
        defaults:{
            currentGame: null,
            games: null,
            playerChooser: null
        },
        events:{
            'change input':'changeNumberPlayer'
        },
        initialize:function () {

            this.options.games.model.on("change:currentGame", function (gameListModel) {
                game = gameListModel.get('currentGame');

                //set headline text
                $('#player_headline').html(game.get('name'));

                var template = _.template($('#template_player_slider').html(), {});
                
                this.$el.html(template);

                this.options.game = game;

                this.drawPlayerChooser(1);
            }, this);
        },

        changeNumberPlayer:function (event) {
            event.preventDefault();
            var el = $(event.currentTarget);
            this.drawPlayerChooser(el.context.value);
        },
        drawPlayerChooser:function (numberPlayer) {
            if(this.playerChooser == null){

                this.playerChooser = new PlayerChooserView({ el:$('#player_chooser'), game: this.options.game});
            }
            this.playerChooser.drawPlayer(numberPlayer);
        }
    });


    return PlayerListView;

});

