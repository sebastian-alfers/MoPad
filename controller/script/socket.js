window.connectionId = null;
window.failedConnectionTrials = 0;

window.Socket = {

		// 'class' variables
		defaults : {
			host : 'ws://localhost:8081/',
			$socket : null
		},

		// Initialize
		init : function() {
			// Try to get the IP
			if(window.location.search.substring(1) != undefined && window.location.search.substring(1) != ''){
	      		alert(window.location.search.substring(1));
	      		this.defaults.host = 'ws://' + window.location.search.substring(1) + ':8081/';
	    	}

			if (!("WebSocket" in window)) {
				console.log("Websockets not supported");
			} else {

				// Websockets supported

				$webSocketModel = this;
				$socket = new WebSocket(this.defaults.host);

				$socket.onopen = function() {

					window.failedConnectionTrials = 0;
					console.log('Websocket: Status ' + $socket.readyState + ' (open)');

					this.send(JSON.stringify({
						type : 'identify',
						connectionType : 'controller',
						data : {
							publicKey : '123456'
						}
					})),(console.log('Sent identify msg'));

				}

				$socket.onmessage = function(msg) {

					var json = JSON.parse(msg.data);
					console.log(json);

					if(json.type == 'cacheConnectionIdOnController' && true){
						connectionId = json.pin; //TODO Pin?
						// Load specified controller
						switch(json.controllerType){
							case "joystick" : new Joystick();
																break;
							case "joypad" : new Joypad();
															break;
							default : console.log("Unkown controllerType");
						}
					} else if(json.type == 'wrongPin'){
						alert('Wrong pin!'); // TODO integrate into UI
						$('#pinInput').val('');
					} else if(json.type == 'lostGameConnection'){
						$('#.helpOverlay').remove();
						$('#controller').append('<div class="helpOverlay">Lost connection to the game <a onclick="resetController()">ok</a></div>'); // TODO implement on server side
					}

				}

				$socket.onerror = function(msg) {
					console.log('WebSocket error',msg);
				}

				$socket.onclose = function(msg) {
					window.failedConnectionTrials++;
					console.log('WebSocket connection closed');

					if(failedConnectionTrials <5){
						window.socket = Socket.init(); // Reconnect
					} else {
						$('body').html('Can\'t connect to WebSocket server - Please reload! Sorry :(');
					}
				}

			}

			this.defaults.$socket = $socket;

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
				this.defaults.$socket.send(JSON.stringify(data));
				console.log('Websocket: Sent ')
				console.log(data);
			} catch (exception) {
				console.log('Websocket: Error ' + exception);
			}
		}

}