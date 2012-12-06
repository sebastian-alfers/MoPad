define(['jquery', 'backbone', 'collections/GameCollection', 'models/GameModel'], function($, Backbone, GameCollection, GameModel) {

    var GameListModel = Backbone.Model.extend({
        defaults:{
            gameCollection:null,
            currentGame:null
        },
        url:'games-json.php',
        //url:'http://mopad-symfony.de/mopad/api/getgames',
        parse:function (data) {

            console.log(data);

            var gameCollection = new GameCollection();

            _.each(data.games, function (game) {
                gameCollection.add(new GameModel(game));
            });

            console.log(gameCollection);

            this.gameCollection = gameCollection;
            this.trigger('afterLoadGameCollection', this.gameCollection);
        },
        initialize:function () {
            console.log('iiiinit');
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