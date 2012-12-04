var WebSocketServer = require('websocket').server;
var http = require('http');
var port = 8081;

// Websocket server will be bound to a http server
var server = http.createServer(function(req, res) {
	res.writeHead(200, {
		'Content-Type' : 'text/plain'
	});
	res.end('Placeholder\n');
}).listen(port, function() {
	console.log('Listening on port ' + port)
});

// create the server
wsServer = new WebSocketServer({
	httpServer : server
});

// Registered Games
var games = [];
games.push({
	id : 1,
	gameName : "Move the box",
	publicKey : '123456',
	ip : '127.0.0.1'
});

// Current connections
var connections = new Array();

//id, connectiongame, connectionController, timestamp, gameId
var connectionIDCounter = 0;

function originIsAllowed(peername) {
	for (var i = 0; i < games.length; i++) {
		if (games[i].ip == peername.address)
			return true;
		else
			return false;
	}
}

function keyIsAllowed(key) {
	for (var i = 0; i < games.length; i++) {
		if (games[i].publicKey == key)
			return true;
		else
			return false;
	}
}

// Returns the size of an associative Array
function arraySize(obj) {
	var size = 0, key;
	for (key in obj) {
		if (obj.hasOwnProperty(key))
			size++;
	}
	return size;
}

function time() {
	return '[' + new Date().toString().substr(0, 21) + '] ';
}

// WebSocket server
wsServer.on('request', function(request) {

	// Check if connection is allowed
	if (!originIsAllowed(request.socket._peername)) {
		// Make sure we only accept requests from an allowed origin
		request.reject();
		console.log(time() + 'WebSocket connection from origin ' + request.socket._peername.address + ' rejected.');
		return;
	} else {
		var connection = request.accept(null, null);
		connection.verified = false;
		console.log(time() + 'WebSocket connection from origin ' + request.socket._peername.address + ' accepted.');
		// Connection accepted, but not verified/identified
	}

	// https://github.com/Worlize/WebSocket-Node/wiki
	var connectionId = connectionIDCounter++;

	// Incoming message
	connection.on('message', function(message) {
		if (message.type === 'utf8') {
			try {
				var json = JSON.parse(message.utf8Data);
			} catch(exception) {
				console.log(time() + 'Parsing error: ' + exception);
				return;
			}

			// process WebSocket message
			if (json.type == 'identify') {// First message identifies the websocket type (game/controller) TODO First message has to be identify, otherwise reject connection
				if (json.vendor == 'game') {

					//identify a controller

					console.log('Got a game identify msg');
					if (keyIsAllowed(json.data.publicKey)) {
						game = connection;
						connection.verified = true;
						connections[connectionId] = connection;
						console.log('Game registered (' + request.socket._peername.address + ')');
					} else {
						console.log(time() + 'Invalid identifier for ' + request.socket._peername.address + '. Connection closed.');
						connection.close();
					}

					console.log('Now ' + arraySize(connections) + ' connections');

					return;
				} else if (json.vendor == 'controller') {
					console.log(connections.length);

					//identify a controller

					console.log('Got a controller identify msg');
					controller = connection;
					connection.verified = true;
					connections[connectionId] = connection;
					console.log(time() + 'Controller registered  (' + request.socket._peername.address + ')');

					console.log('Now ' + arraySize(connections) + ' connections');

					return;
				}
			}

			//check if connection is ok // TODO Might not work!!!
			if (connection.verified != true) {
				console.log('Not allowed. please "identify" before');
				return;
			}

			if (json.type == 'getControllersForGame') {
				console.log(connectionId);
				// Send all the existing canvas commands to the new client
				connection.sendUTF(JSON.stringify({
					msg : "initCommands",
					id : connectionId
				}));
				console.log(connection.pins.data);

				connection.pins.data.forEach(function(player) {
					console.log(player.pin);
				});
			} else if (json.type == 'registerPinsForGameInstance') {
				console.log('---- jea neue pins');
				console.log(json);

				connection.pins = json.data;

				json.data.forEach(function(player) {
					console.log(player.pin);
				});
			} else if (json.type == 'buttonClick') {
				game.sendUTF(JSON.stringify(json));
				//Redirect TODO check if game exists
				console.log(time() + 'Sent to game: ' + JSON.stringify(json));

			} else if (json.type == 'sendCommandToGame') {

				console.log('send to cached game instance');

				connections[json.data.connectionId].sendUTF(JSON.stringify({
					msg : "testButtonClick",
					action : 'move the box',
					pin : json.data.pin
				}));

				//connections[json.type.]

			} else if (json.type == 'getConnectionForPin') {

				// is set to true, if the pin from the controller
				var successPinMatch = false;

				Object.keys(connections).forEach(function(key) {
					var gameConnection = connections[key];

					console.log('++++++++++++++');
					console.log(gameConnection.pins);

					if (gameConnection.pins != undefined && gameConnection.pins.length > 0) {
						console.log(gameConnection.pins.length);
						console.log(gameConnection.pins);

						gameConnection.pins.forEach(function(player) {

							console.log(json);

							if (json.data.pin == player.pin) {
								//jip jipp :)
								console.log('jipp jiopp');

								//send back the connection-id to the controller to cache it
								connection.sendUTF(JSON.stringify({
									msg : "cacheConnectionIdOnController",
									pin : connectionId,
									userName : player.userName
								}));

								//tell the game instance that this pin has been activated by a controller
								connections[connectionId].sendUTF(JSON.stringify({
									msg : "activateController",
									pin : json.data.pin,
									userName : player.userName
								}));

								successPinMatch = true;
								/*

								 pass the action to the game instance

								 connection.sendUTF(JSON.stringify({
								 msg: "correctPinSubmit",
								 pin: json.data.data.pin
								 }));
								 */

							}
						});
					}
				});

				//if we come here, this means the pin is not correct
				if (successPinMatch == true) {
					console.log('Correct pin');
				} else {
					console.log('Wrong pin');
				}

			} else {
				console.log(time() + 'Invalid message type ' + JSON.stringify(json));
			}
		} else {
			console.log(time() + 'Invalid message format');
		}
	});

	function getConnectionForPin(pin) {
		for (key in connections) {

		}
		console.log('jipp jipp');
		return pin;
	}


	connection.on('close', function(connection) {
		if (connectionId != undefined) {
			console.log('Id "' + connectionId + '" disconnected');
			delete connections[connectionId];
			console.log('Now ' + arraySize(connections) + ' connections');
		}
	});
});
