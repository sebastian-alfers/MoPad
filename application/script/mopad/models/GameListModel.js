define(["jquery", "backbone", 'collections/GameCollection'], function($, Backbone, GameCollection) {

    var GameListModel = Backbone.Model.extend({
        defaults:{
            gameCollection:null,
            currentGame:null
        },
        url:'/application/games-json.php',
        parse:function (data) {
            gameCollection = new GameCollection();

            _.each(data.games, function (game) {
                gameCollection.add(new Game(game));
            });

            this.gameCollection = gameCollection;
            this.trigger('afterLoadGameCollection', this.gameCollection);
        },
        initialize:function () {
            this.fetch({
                success:function (games) {
                    //console.log(games);
                }
            });
        },

        render:function (gameCollection) {

            $list = $('#list_games_li');
            gameCollection.forEach(function (game) {
                $list.append('<li><a href="#" class="game-link">' + game.get('name') + '</a></li>');
            });
        }

    });


    // Returns the Model class
    return GameListModel;

});