/**
 *
 * Controller-side socket-handling
 *
 * @class
 * 
 * @author Jonas Hartweg
 *
 */

window.connectionId = null;
window.failedConnectionTrials = 0;

window.Socket = {

	/**
	 * Socket initialization
	 *
	 * @constructor
	 */

	init : function(ip) {

		// Try to get the IP
		if (ip == null) {
			ip = 'localhost';
		}

		if (!("WebSocket" in window)) {
			console.log("Websockets not supported");
		} else {
			console.log('Trying to connect to websocket at ' + ip)

			try {

				window.mySocket = new WebSocket('ws://' + ip + ':8081/');
				console.log(mySocket.readyState);

				mySocket.onopen = function() {

					window.failedConnectionTrials = 0;
					console.log('Websocket: Status ' + mySocket.readyState + ' (open)');

					this.send(JSON.stringify({
						type : 'identify',
						connectionType : 'controller',
						data : {
							publicKey : '123456'
						}
					}));
					console.log('Sent identify msg');
				}

				mySocket.onmessage = function(msg) {

					var json = JSON.parse(msg.data);
					console.log(json);

					if (json.type == 'cacheConnectionIdOnController' && true) {
						connectionId = json.pin;
						//TODO Pin?
						// Load specified controller
						switch(json.controllerType) {
							case "joystick" :
								new Joystick();
								break;
							case "joypad" :
								new Joypad();
								break;
							case "benchmark" :
								new Benchmark();
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

				mySocket.onerror = function(msg) {
					console.log('WebSocket error', msg);
				}

				mySocket.onclose = function(msg) {
					window.failedConnectionTrials++;
					console.log('WebSocket connection closed');

					if (failedConnectionTrials < 5) {
						window.socket = Socket.init(ip);
						// Reconnect
					} else {
						$('body').html('Can\'t connect to WebSocket server - Please reload! Sorry :(');
					}
				}
			} catch (exception) {
				console.log("WebSocket error " + expection);
			}

		}

		return this;
	},

	/**
	 * Send data via the socket
	 */
	
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
			mySocket.send(JSON.stringify(data));
			console.log('Websocket: Sent ')
			console.log(data);
		} catch (exception) {
			console.log('Websocket: Error ' + exception);
		}
	}
}