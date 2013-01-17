define(['jquery', 'backbone', 'collections/PlayerCollection', 'models/PlayerModel', 'views/PendingPlayerView'], function($, Backbone, PlayerCollection, PlayerModel, PendingPlayerView) {

	var PlayerChooserView = Backbone.View.extend({
        /**
         * @author Sebastian Alfers
         *
         * @class View to render the Form to chose player with names
         *
         * @constructs
         *
         * PlayerChooserView
         */
		defaults : {
			numberPlayer : 1,
			playerCollection : null,
			pendingPlayer : null
		},
		events : {
			'click #start_game' : 'startGame'
		},
		initialize : function() {

            if($webSocketModel.get("connected") == false){
                alert('no websocket connection :(');
                return;
            }

			$that = this;

			fetched = 0;
			numberPlayer = 1;

			// listen for new pins
			$webSocketModel.on($webSocketModel.defaults.socketMsgTypePinForUser, function(json) {

				//update the player with the id
				$that.defaults.playerCollection.forEach(function(player) {

					console.log(player);
					console.log($that.defaults.playerCollection);

					if (player.get('username') == json.data.username) {
						fetched++;
						player.set('pin', json.data.pin);
					}
				});

				console.log(fetched);
				console.log($that.defaults.playerCollection.length);

				if (fetched == $that.defaults.playerCollection.length) {
					this.pendingPlayer = new PendingPlayerView({
						el : $('#pins'),
						playerCollection : $that.defaults.playerCollection
					});
				}

			});

			this.$el.append('<ul class="nav nav-tabs nav-stacked" id="list_player_li"></ul>');

			var template = _.template($('#template_input_username').html(), {i : 1});
			$('#list_player_li').append(template);

			var template = _.template($('#template_submit_username').html());
			this.$el.append(template);

		},
		drawPlayer : function(newNumberPlayer) {
			console.log(newNumberPlayer);
			if(newNumberPlayer>this.defaults.numberPlayer){
				while(newNumberPlayer>this.defaults.numberPlayer){
					var template = _.template($('#template_input_username').html(), {i : ++this.defaults.numberPlayer });
					
					this.$('ul').append(template);
				}
				
			} else if (newNumberPlayer<this.defaults.numberPlayer){
				while(newNumberPlayer<this.defaults.numberPlayer){
					this.$('ul li:last-child').remove();
					this.defaults.numberPlayer--;
				}
			}
			console.log(this.defaults.numberPlayer);	
		},

		startGame : function() {


			// Check for repetitive and empty usernames
			var tempArray = new Array();
			var abort = false;
			$('.username').each(function(i) {
				if($(this).val()<=1){
					alert('Please fill in all usernames!');
	    			abort=true;
	    			return false;
				}
    			if(tempArray.indexOf($(this).val()) >= 0){
	    			alert('Please pick unique names!');
	    			abort=true;
	    			return false;
    			}
    			tempArray.push($(this).val());
			});
			if(abort) return false;


			
			$('#start_game').attr("disabled", "disabled");
			$('.username').attr("disabled", "disabled");
			$('#playerSlider').attr("disabled", "disabled");
			$('#game_link').click(function(e) {
				e.preventDefault();
				//do other stuff when a click happens
			});

			var valid = 0;
			playerCollection = new PlayerCollection();
			$('.username').each(function(el) {
				var username = $(this).val();
				if (username != '') {
					console.log('player');
					var player = new PlayerModel({
						username : username
					});
					valid++;
					playerCollection.add(player);
				}
			});
			this.defaults.playerCollection = playerCollection;

			if (valid <= 0) {
				alert('At least one player');
			} else {
                alert('start');
				playerCollection.forEach(function(player) {
                    /**
                     * the PendingPlayerView now listens on an event "activateController"
                     */
					console.log('Get new pin');
					$webSocketModel.getPinForPlayer(player);
				});
				console.log('fetch for ' + playerCollection.length);
			}

		},
		parse : function(data) {
			console.log(data);
		}
	});

	return PlayerChooserView;

});

