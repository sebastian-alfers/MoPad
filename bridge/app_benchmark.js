/*
 * 
 * MoPad server
 * 
 */


var WebSocketServer = require('websocket').server;
var http = require('http');
var port = 8082;


/* 
 * Http server that the WebSocket server is bound to
 * 
 * @constructor
 *  
 */


function time() {
	return '[' + new Date().toString().substring(4, 21) + '] ';
}

var server = http.createServer(function(req, res) {
	res.writeHead(200, {
		'Content-Type' : 'text/plain'
	});
	res.end('Placeholder\n');
}).listen(port, function() {
	console.log(time() + 'Listening on port ' + port)
});

/*
 * WebSocket server
 */

wsServer = new WebSocketServer({
	httpServer : server
});



// Current connections
var connections = new Array();


var connectionIDCounter = 0;


// WebSocket server
wsServer.on('request', function(request) {

		//console.log(request.socket);

        var connectionId = connectionIDCounter++;

		var connection = request.accept(null, null);
		connection.verified = false;
        connections[connectionId] = connection;

        console.log(connections.length);
		//console.log(time() + 'WebSocket connection from origin ' + request.socket._peername.address + ' accepted.');
		// Connection accepted, but not verified/identified

	// Incoming message
	connection.on('message', function(message) {

		if (message.type === 'utf8') {
			try {
				var json = JSON.parse(message.utf8Data);

                connection.sendUTF(JSON.stringify({
                    type : "pong",
                    data : {
                        time : json.data.time,
                        i: json.data.i
                    }
                }));



			} catch(exception) {
                console.log(exception);
				console.log(time() + 'Psdfarsing error: ' + exception);


				//return;
			}
        }



	});

	/*
	 * Returns the connection for a certain pin
	 * 
	 * @param {pin} The pin
	 */

	function getConnectionForPin(pin) {
		for (key in connections) {

		}
		return pin;
	}


	connection.on('close', function(connection) {
        console.log('close');
	});
});
