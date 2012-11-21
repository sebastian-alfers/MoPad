// modified from: http://net.tutsplus.com/tutorials/javascript-ajax/start-using-html5-websockets-today/

window.loadSocket = function(type){
	if (!("WebSocket" in window)) {
		$('#controller').fadeOut("fast");
		$('<p>Whoops, you need a browser that supports WebSockets.</p>').appendTo('body');
	} else {
		//$('<p>Websockets supported!</p>').appendTo('body');

        // :(
        // oop would be better
        console.log(type);
        if (type == "" || type == undefined) {
            type = {type: 'controller'};
        }

        console.log(type);

		//The browser supports WebSockets  
		connect();

		function connect() {
			var socket;

            /**
             * make this configurable
             *
             * @type {String}
             */
			var host = "ws://localhost:8081/";
			try {
				var socket = new WebSocket(host);
				console.log('Websocket: Status: ' + socket.readyState);
				socket.onopen = function () {
					console.log('Websocket: Status ' + socket.readyState + ' (open)');
					socket.send(JSON.stringify({'type':'identify', 'data': {type:type.type, publicKey:'123456'}}));
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

                // :(
                // oop better
                if(buttonId.type == "" || buttonId.type == undefined){
                    buttonId = {type: 'buttonClick', data: buttonId.data}
                }

				try {
					socket.send(JSON.stringify({'type':buttonId.type, 'data': buttonId}));
					console.log('Websocket: Sent ' + buttonId)
				} catch (exception) {
					console.log('Websocket: Error '+exception);
				}
			}
					
		} //End connect  
	} //End else
}