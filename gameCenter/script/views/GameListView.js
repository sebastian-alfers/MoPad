define(['jquery', 'backbone', 'models/GameListModel'], function($, Backbone, GameListModel){

    var GameListView = Backbone.View.extend({
        defaults:{
            model:null
        },

        initialize:function () {

            console.log('game liist model');

            this.model = new GameListModel({ el:this.$el });
            this.render();
            this.model.bind('afterLoadGameCollection', this.drawGameMenu, this);
        },

        events:{
            'click a':'chooseGame'
        },

        drawGameMenu:function (games) {

            console.log(games);

            var el = $(this.el);
            games.each(function (game) {
                var html = _.template($('#template_list_games_li').html(), game.toJSON());
                el.append(html);
            });
        },

        chooseGame:function (event) {
            $('#player_chooser').html('');
            $('#pins').html('');

            event.preventDefault();
            var id = $(event.currentTarget).data("id");
            this.model.set({currentGame:this.model.gameCollection.get(id)});
        },

        render:function () {
            //var template = _.template( $('#template_list_games_ul').html(), {});
            //this.$el.html( template );
        }
    });


    return GameListView;

});
