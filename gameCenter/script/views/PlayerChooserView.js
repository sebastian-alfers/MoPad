define(['jquery', 'backbone', 'collections/PlayerCollection', 'models/PlayerModel', 'views/PendingPlayerView'], function($, Backbone, PlayerCollection, PlayerModel, PendingPlayerView){

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
            $('#start_game').attr("disabled", "disabled");
            $('.username').attr("disabled", "disabled");
            $('#game_link').click(function(e) {
                e.preventDefault();
                //do other stuff when a click happens
            });

            var valid = 0;
            playerCollection = new PlayerCollection();
            $('.username').each(function(el){
                var userName = $(this).val();
                if(userName != ''){
                    var player = new PlayerModel({userName: userName});
                    valid++;
                    playerCollection.add(player);
                }
            });

            if(valid <= 0){
                alert('At least one player');
            }
            else{
                fetched = 0;
                console.log('fetch for ' + playerCollection.length);

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
        }
    });


    return PlayerChooserView;

});

