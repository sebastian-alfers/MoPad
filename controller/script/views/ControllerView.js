define(['jquery', 'backbone'], function($, Backbone) {

	var ControllerView = Backbone.View.extend({

		events : {
			'click #sendPin' : 'registerController',
			'touchstart #sendCommand' : 'sendCommand'
		},

		initialize : function() {
			this.render();
		},

		registerController : function() {
			$('#sendPin').hide();
			$('#sendCommand').show(); // TODO wait with this until connection is actually established
			$('#pinInput').attr("disabled", "disabled");

			$webSocketModel.send({
				type : 'getConnectionForPin',
				data : {
					pin : $('#pinInput').val()
				}
			});

			$webSocketModel.on('cacheConnectionIdOnController', function(json) {

				console.log('Cache pin ' + json.pin);

				this.options.gameConnectionId = json.pin;
				$('#username').html(json.username);
				
				// Initialize controller, when ready
				connId = this.options.gameConnectionId; // TODO remove!! hilfsvariable
				new Joypad();
			}, this);
		},

		sendCommand : function() {
			if (this.options.gameConnectionId != null) {
				$webSocketModel.send({
					type : 'sendCommandToGame',
					data : {
						connectionId : this.options.gameConnectionId,
						keycode: 'testButton',
						pin : $('#pinInput').val() // TODO: Automatic identification on bridge, not via pin. pin input might also be removed already
					}
				});
			}
		},

		render : function() {
			var template = _.template($('#template_register_controller').html(), {});
			this.$el.html(template);
		}
	});

	return ControllerView;

});

