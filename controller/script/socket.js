window.connectionId = null;
window.failedConnectionTrials = 0;

window.Socket = {

	// Initialize
	init : function(ip) {
		console.log(ip);
		// Try to get the IP
		if (ip != null) {
			console.log('ws://' + ip + ':8081/');
		} else {
			ip = 'localhost';
		}

		if (!("WebSocket" in window)) {
			console.log("Websockets not supported");
		} else {

			$webSocketModel = this;
			$socket = new WebSocket('ws://' + ip + ':8081/');

			$socket.onopen = function() {

				window.failedConnectionTrials = 0;
				console.log('Websocket: Status ' + $socket.readyState + ' (open)');

				this.send(JSON.stringify({
					type : 'identify',
					connectionType : 'controller',
					data : {
						publicKey : '123456'
					}
				})), (console.log('Sent identify msg'));

			}

			$socket.onmessage = function(msg) {

				var json = JSON.parse(msg.data);
				console.log(json);

				if (json.type == 'cacheConnectionIdOnController' && true) {
					connectionId = json.pin;
					//TODO Pin?
					// Load specified controller
					switch(json.controllerType) {
						case "Joystick" :
							new Joystick();
							break;
						case "Joypad" :
							new Joypad();
							break;
						default :
							console.log("Unkown controllerType");
					}
				} else if (json.type == 'wrongPin') {
					alert('Wrong pin!');
					// TODO integrate into UI
					$('#pinInput').val('');
				} else if (json.type == 'lostGameConnection') {
					$('#.helpOverlay').remove();
					$('#controller').append('<div class="helpOverlay">Lost connection to the game <a onclick="resetController()">ok</a></div>');
					// TODO implement on server side
				}

			}

			$socket.onerror = function(msg) {
				console.log('WebSocket error', msg);
			}

			$socket.onclose = function(msg) {
				window.failedConnectionTrials++;
				console.log('WebSocket connection closed');

				if (failedConnectionTrials < 5) {
					window.socket = Socket.init();
					// Reconnect
				} else {
					$('body').html('Can\'t connect to WebSocket server - Please reload! Sorry :(');
				}
			}
			
			
		}

		return this;
	},

	// Send data
	send : function(data) {

		if (data == "" || data == undefined) {
			console.log('Websocket: No data set');
			return;
		}

		if (data.type == "" || data.type == undefined) {
			console.log('Websocket: no type set for web socket message');
			return;
		}

		try {
			socket.send(JSON.stringify(data));
			console.log('Websocket: Sent ')
			console.log(data);
		} catch (exception) {
			console.log('Websocket: Error ' + exception);
		}
	}
}