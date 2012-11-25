define(["jquery", "backbone"], function($, Backbone) {

    var GameModel = Backbone.Model.extend({
        defaults:{
            gameListCollection:null,
            currentGame:null
        },
        url:'/application/games-json.php',
        parse:function (data) {
            gameListCollection = new GameListCollection();

            _.each(data.games, function (game) {
                gameListCollection.add(new Game(game));
            });

            this.gameListCollection = gameListCollection;
            this.trigger('afterLoadGameListCollection', this.gameListCollection);
        },
        initialize:function () {
            this.fetch({
                success:function (games) {
                    //console.log(games);
                }
            });
        },

        render:function (gameListCollection) {

            $list = $('#list_games_li');
            gameListCollection.forEach(function (game) {
                $list.append('<li><a href="#" class="game-link">' + game.get('name') + '</a></li>');
            });
        }

    });


    // Returns the Model class
    return GameModel;

});