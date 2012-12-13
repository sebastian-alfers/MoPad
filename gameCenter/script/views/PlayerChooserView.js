define(['jquery', 'backbone', 'collections/PlayerCollection', 'models/PlayerModel', 'views/PendingPlayerView'], function($, Backbone, PlayerCollection, PlayerModel, PendingPlayerView) {

	var PlayerChooserView = Backbone.View.extend({
		defaults : {
			numberPlayer : 1,
			playerCollection : null,
			pendingPlayer : null
		},
		events : {
			'click button' : 'startGame'
		},
		initialize : function() {
			$that = this;

			fetched = 0;

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
				console.log('Test');
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
			if(newNumberPlayer>this.numberPlayer){
				var template = _.template($('#template_input_username').html(), {i : newNumberPlayer});
				this.$('ul').append(template);
			} else if (newNumberPlayer<this.numberPlayer){
				this.$('ul li:last-child').remove(); // TODO funktioniert nicht, wenn zu schnell gezogen wird
			}
			
			this.numberPlayer = newNumberPlayer;		
		},

		startGame : function() {
			
			// Check for repeating names
			var tempArray = new Array();
			var abort = false;
			$('.username').each(function(i) {
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

