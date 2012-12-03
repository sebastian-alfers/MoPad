define(['jquery', 'backbone'], function($, Backbone){

    var PendingPlayerView = Backbone.View.extend({
        defaults:{
            playerCollection:null
        },
        initialize: function(){
            this.render();
        },
        render: function(){
            $('#cancel_pending_player').show();

            console.log(this.$el);


            var pins = new Array()
            var i = 0;
            this.options.playerCollection.each(function(player){

                //generate associative array like [player0] =123, [player1] =456
                pins.push(player.toJSON());

                i++;

                var template = _.template( $('#template_pending_player').html(), player.toJSON());
                this.$el.append(template);
            }, this);


            //register the pins on the bridge for this game instance
            $webSocketModel.send({type: 'registerPinsForGameInstance', data : pins });

            $('#cancel_pending_player').click(function(){

                //sould be done via events
                $('#pins').html('');
                $(this).hide();

                $('#start_game').removeAttr('disabled');
                $('.username').removeAttr('disabled');
            });
        }
    });


    return PendingPlayerView;

});

