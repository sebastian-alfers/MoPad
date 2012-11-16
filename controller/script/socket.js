// modified from: http://net.tutsplus.com/tutorials/javascript-ajax/start-using-html5-websockets-today/

window.loadSocket = function(){
	if (!("WebSocket" in window)) {
		$('#controller').fadeOut("fast");
		$('<p>Whoops, you need a browser that supports WebSockets.</p>').appendTo('body');
	} else {
		//$('<p>Websockets supported!</p>').appendTo('body');

		//The browser supports WebSockets  
		connect();

		function connect() {
			var socket;
			var host = "ws://localhost:8081/";
			try {
				var socket = new WebSocket(host);
				console.log('Websocket: Status: ' + socket.readyState);
				socket.onopen = function () {
					console.log('Websocket: Status ' + socket.readyState + ' (open)');
					socket.send(JSON.stringify({'type':'identify', 'data': {'type':'controller','publicKey':'123456'}}));
				}
				socket.onmessage = function (msg) {
					console.log('Websocket: Received ' + msg.data);
				}
				socket.onclose = function () {
					console.log('Websocket: Status: ' + socket.readyState + ' (Closed)');
				}
			} catch (exception) {
				console.log('Websocket: Error ' + exception);
			}

			window.send = function(buttonId) {
				if (buttonId == "" || buttonId == undefined) {
					console.log('Websocket: No buttonId set');
					return;
				}
				try {
					socket.send(JSON.stringify({'type':'buttonClick', 'data': buttonId}));
					console.log('Websocket: Sent ' + buttonId)
				} catch (exception) {
					console.log('Websocket: Error '+exception);
				}
			}
					
		} //End connect  
	} //End else
}