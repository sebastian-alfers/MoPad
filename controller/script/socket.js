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

                    var json = JSON.parse(msg.data);

                    console.log(json);

                    //this code is only for controller -> should be triggered by an event (Backbone?)
                    if(json.msg == 'cacheConnectionIdOnController'){
                        console.log('+++++++');
                        window.gameConnectionId = json.pin;

                        console.log(json);
                        $('#username').html(json.userName);

                        console.log(window.gameConnectionId);
                        console.log('+++++++');
                    }

                    //this code is only for controller -> should be triggered by an event (Backbone?)
                    if(json.msg == 'activateController'){

                        console.log('remove pending bar');
                        console.log(json);
                        $('#pending_bar_'+json.pin).html("<strong>" +json.userName + "</strong> ist am start mit pin <strong>" + json.pin + "</strong> :) ");

                        //console.log();
                    }

                    //this code is only for controller -> should be triggered by an event (Backbone?)
                    if(json.msg == 'testButtonClick'){
                        alert('react to the controller input form pin ' + json.pin + ' for action ' + json.action)
                        //console.log();
                    }


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