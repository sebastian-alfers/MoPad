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
			$('#sendCommand').show();
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
				$('#username').html(json.userName);
			}, this);
		},

		sendCommand : function() {
			if (this.options.gameConnectionId != null) {
				$webSocketModel.send({
					type : 'sendCommandToGame',
					data : {
						connectionId : this.options.gameConnectionId,
						pin : $('#pinInput').val()
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

