/**
 * every web-stocket message must look like this:
 * {type: 'type of the mesage', data:{?????}}
 */
define(["jquery", "backbone"], function($, Backbone) {

	var WebSocketModel = Backbone.Model.extend({

		defaults : {
			socket : null,
			model : null, // the game or the controller
			socketMsgTypeIdentify : 'identify',
			connectionType : 'controller' // identify as a game or controller
		},

		initialize : function() {

			if (!("WebSocket" in window)) {
				this.trigger('errorWebSocketAvailable', data);
			} else {

				// Websockets supported

				$webSocketModel = this;
				$socket = new WebSocket(this.get('host'));

				$socket.onopen = function() {

					console.log('Websocket: Status ' + $socket.readyState + ' (open)');

					$webSocketModel.send({
						type : $webSocketModel.defaults.socketMsgTypeIdentify,
						connectionType : $webSocketModel.attributes.connectionType,
						data : {
							publicKey : '123456'
						}
					});
				}
				$socket.onmessage = function(msg) {

					var json = JSON.parse(msg.data);

					console.log(json);

					//just pass the message type (from node) as an event to be subscribed to
					$webSocketModel.trigger(json.type, json);

				}

				this.defaults.socket = $socket;
				//loadSocket( {type: 'game', gameInstanceId: data.uniqueAppIdForBridge} );
			}

		},	send : function(data) {

			if (data == "" || data == undefined) {
				console.log('Websocket: No data set');
				return;
			}

			if (data.type == "" || data.type == undefined) {
				console.log('Websocket: no type set for web socket message');
				return;
			}

			try {
				this.defaults.socket.send(JSON.stringify(data));
				console.log('Websocket: Sent ')
				console.log(data);
			} catch (exception) {
				console.log('Websocket: Error ' + exception);
			}
		}

	});

	// Returns the Model class
	return WebSocketModel;

}); 