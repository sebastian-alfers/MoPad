define(['jquery', 'backbone'], function($, Backbone){

    var PendingPlayerView = Backbone.View.extend({
        /**
         * @author Sebastian Alfers
         *
         * @class View to render the pending players
         *
         * @constructs
         *
         * PendingPlayerView
         */
        defaults:{
            playerCollection: null
        },
        initialize: function(){
            this.render();
        },
        render: function(){

            $('#cancel_pending_game').show();

            var pins = new Array()
            var i = 0;
            this.options.playerCollection.each(function(player){

                if(player.get('pin') == undefined || player.get('pin') == ''){
                    alert('error. player ' + player.get('username') + ' has no pin');
                }
                else{

                    //generate associative array like [player0] =123, [player1] =456

                    //pins.push(player.toJSON()); //push the player
                    pins.push(player.get('pin')); //push only the pin

                    i++;

                    var template = _.template( $('#template_pending_player').html(), player.toJSON());
                    this.$el.append(template);

                }


            }, this);

            //register the pins on the bridge for this game instance
            $webSocketModel.send({type: 'registerPinsForGameInstance', data : {pins:pins, game: this.options.game} });

            $('#cancel_pending_game').click(function(){
                window.location.reload();

                return
                /*
                //TODO sould be done via events
                $('#pins').html('');
                $(this).hide();

                $('#start_game').removeAttr('disabled');
                $('.username').removeAttr('disabled');
                $('#playerSlider').removeAttr('disabled');
                */
            });

            fetched = 0;

            $playerCount = 0;
            $playerPins = new Array();

            $playerCount = this.options.playerCollection.length;
            console.log('++++++++++++++++++++++');
            console.log(this);
            $game = this.options.game;

            $webSocketModel.on('activateController', function(json){
                console.log('Connection established');

                this.options.playerCollection.each(function(player){

                    if(player.get('pin') == json.pin){
                        fetched++;
                        $playerPins.push(json.pin);
                        $('#pending_bar_'+player.get('pin')).html("<strong>" +player.get('username') + "</strong> ist am start mit pin <strong>" + player.get('pin') + "</strong> :) ");
                    }

                    if(fetched == $playerCount){

                        $('#pins').append('<br /><h2>Ready to rumble</h2>');
                        
                        // Ask before tab close TODO Remove when game is over
                       $(window).on('beforeunload',function() {
  					 		return 'O\'rly? U better not close dat game!';
						});
						
						$webSocketModel.kickOffGame(1); // TODO get real game Id

                        /**
                         * the final start of the game
                         */
                        $.getScript($game.attributes.game_js_url, function(data, textStatus, jqxhr) {
                           //console.log(data); //data returned
                           //console.log(textStatus); //success
                           //console.log(jqxhr.status); //200
                           //console.log('Load was performed.');
                        });

                    }

                });


            }, this);

        }
    });


    return PendingPlayerView;

});

