define(['jquery', 'backbone', 'collections/PlayerCollection', 'models/PlayerModel', 'views/PendingPlayerView'], function($, Backbone, PlayerCollection, PlayerModel, PendingPlayerView) {

	var PlayerChooserView = Backbone.View.extend({
		defaults : {
			numberPlayer : null,
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

					if (player.get('userName') == json.data.username) {
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

				//$('#pending_bar_'+json.pin).html("<strong>" +json.userName + "</strong> ist am start mit pin <strong>" + json.pin + "</strong> :) ");
			});

			var template = _.template($('#template_input_username').html(), {i : 1});
			this.$el.append(template);

			var template = _.template($('#template_submit_username').html());
			this.$el.append(template);

		},
		drawPlayer : function(newNumberPlayer) {
			if(newNumberPlayer>this.numberPlayer){
				var template = _.template($('#template_input_username').html(), {i : newNumberPlayer});
				this.$el.append(template);
			} else if (newNumberPlayer>this.numberPlayer){
				// TODO add code for player removal
			}
			
			this.numberPlayer = newNumberPlayer;
			// TODO check if correct amount of players is displayed/requested			

		},

		startGame : function() {
			$('#start_game').attr("disabled", "disabled");
			$('.username').attr("disabled", "disabled");
			$('#game_link').click(function(e) {
				e.preventDefault();
				//do other stuff when a click happens
			});

			var valid = 0;
			playerCollection = new PlayerCollection();
			$('.username').each(function(el) {
				var userName = $(this).val();
				if (userName != '') {
					console.log('player');
					var player = new PlayerModel({
						userName : userName
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
					console.log('gen new pin');
					$webSocketModel.getPinForPlayer(player);
				});

				console.log('fetch for ' + playerCollection.length);
				/*

				 old php pin generate
				 player.fetch({
				 //data: {userName: user.get('userName')},  NOT REQUIRED
				 success: function(player){
				 fetched++;
				 //player.pending(fetched, playerCollection.length);

				 }
				 });

				 */

			}

		},
		parse : function(data) {
			console.log(data);
		}
	});

	return PlayerChooserView;

});

