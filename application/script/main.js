(function ($) {

    /**
     * models
     * @type {*}
     */
    Game = Backbone.Model.extend({
        defaults:{
            icon:"",
            name:"",
            description:""
        },
        initialize:function () {
            //init code
        }
    });

    Player = Backbone.Model.extend({
        urlRoot: '/application/getPinForUser.php',
        idAttribute: 'userName',
        defaults:{
            userName: null,
            pin: null
        },
        pending: function(totalFetched, playerCount){
            console.log('ja, am waiting ' + totalFetched +', ' + playerCount );
            if(totalFetched == playerCount){
                //listen to sockets
            }
        }
    });

    /**
     * collections
     *
     * @type {*}
     */
    var GameListCollection = Backbone.Collection.extend({model:Game});
    var PlayerCollection = Backbone.Collection.extend({ model:Player });

    var GameListModel = Backbone.Model.extend({
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

    var GameListView = Backbone.View.extend({
        defaults:{
            model:null
        },

        initialize:function () {
            this.model = new GameListModel({ el:this.$el });
            this.render();
            this.model.bind('afterLoadGameListCollection', this.drawGameMenu, this);
        },

        events:{
            'click a':'choseGame'
        },

        drawGameMenu:function (games) {

            var el = $(this.el);
            games.each(function (game) {
                var html = _.template($('#template_list_games_li').html(), game.toJSON());
                el.append(html);
            });
        },

        choseGame:function (event) {
            event.preventDefault();
            var id = $(event.currentTarget).data("id");
            this.model.set({currentGame:this.model.gameListCollection.get(id)});
        },

        render:function () {
            //var template = _.template( $('#template_list_games_ul').html(), {});
            //this.$el.html( template );
        }
    });


    var PendingPlayerView = Backbone.View.extend({
        defaults:{
            playerCollection:null
        },
        initialize: function(){
            this.render();
        },
        render: function(){

            console.log(this.$el);

            this.options.playerCollection.each(function(player){
                var template = _.template( $('#template_pending_player').html(), player.toJSON());
                this.$el.append(template);
            }, this);
        }
    });

    var PlayerChooserView = Backbone.View.extend({
        defaults:{
            numberPlayer:null,
            playerCollection: null,
            pendingPlayer:null
        },
        events:{
            'click button':'startGame'
        },
        drawPlayer: function(numberPlayer){
            this.$el.html("");
            for (i = 0; i < numberPlayer; i++) {
                var template = _.template($('#template_input_username').html(), {i:i});
                this.$el.append(template);
            }
            var template = _.template($('#template_submit_username').html(), {sum:i});
            this.$el.append(template);
        },

        startGame:function () {
            console.log('start');
            var valid = 0;
            playerCollection = new PlayerCollection();
            $('.username').each(function(el){
                var userName = $(this).val();
                if(userName != ''){
                    var player = new Player({userName: userName});
                    valid++;
                    playerCollection.add(player);
                }
            });

            if(valid <= 0){
                alert('At least one player');
            }
            else{
                fetched = 0;
                playerCollection.forEach(function(player){
                    player.fetch({
                            //data: {userName: user.get('userName')},  NOT REQUIRED
                            success: function(player){
                                fetched++;
                                //player.pending(fetched, playerCollection.length);

                                if(fetched == playerCollection.length){
                                    console.log('jeaaa');
                                    this.pendingPlayer = new PendingPlayerView( {el: $('#pins'), playerCollection: playerCollection});
                                }
                            }
                        }
                    );
                });
            }
        },
        parse:function (data) {
            console.log(data);
        },
        drawPendingPins: function(){
            if(this.fetched == this.playerCollection.size){
                alert('jeaaa alle');
            }
        }
    });


    var PlayerListView = Backbone.View.extend({
        defaults:{
            games:null,
            playerChooser:null
        },
        events:{
            'change input':'changeNumberPlayer'
        },
        initialize:function () {
            this.options.games.model.on("change:currentGame", function (gameListModel) {
                game = gameListModel.get('currentGame');
                $('#player_headline').html(game.get('name'));

                var template = _.template($('#template_player_slider').html(), {});
                this.$el.html(template);
            }, this);
        },

        changeNumberPlayer:function (event) {
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


    var GameCenterView = Backbone.View.extend({

        defaults:{
            games:null
        },

        initialize:function () {
            this.games = new GameListView({ el:$('#list_games_li') });
            this.player = new PlayerListView({el:$('#player_slider'), games:this.games});
        }
    });

    var gc = new GameCenterView({ el:$('#tab_content') });


    /*
     var ListView = Backbone.View.extend({
     el: $('#wizzard'), // attaches `this.el` to an existing element.

     initialize: function(){
     _.bindAll(this, 'render'); // fixes loss of context for 'this' within methods

     this.render(); // not all views are self-rendering. This one is.
     },

     render: function(){
     //load games from symfony2
     var gameCenter = new GameCenter();


     }
     });
     var listView = new ListView();
     */


})(jQuery);