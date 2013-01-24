/*
 * 
 * MoPad server
 * 
 */


var WebSocketServer = require('websocket').server;
var http = require('http');
var port = 8081;


/* 
 * Http server that the WebSocket server is bound to
 * 
 * @constructor
 *  
 */

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

// Registered Games
var games = [];
games.push({
	id : 1,
	gameName : "Move the box",
	publicKey : '123456',
	ip : '127.0.0.1'
});

//for controller
games.push({
	id : 2,
	gameName : "Move the box",
	publicKey : '123456',
	ip : '192.168.1.36'
});

//for controller
games.push({
	id : 3,
	gameName : "Move the box",
	publicKey : '123456',
	ip : '141.45.204.172'
});

// Current connections
var connections = new Array();

//id, connectiongame, connectionController, timestamp, gameId
var connectionIDCounter = 0;

var controllers = [];
controllers.push('127.0.0.1');
controllers.push('localhost');
controllers.push('141.45.204.172');

/*
 * Checks whether a gameCenter connection gets accepted
 * 
 * @param {peername} Peername string of the WebSocket request
 * 
 */

function originIsAllowed(peername) {

	// Check the accepted game origins
	for (var i = 0; i < games.length; i++) {

		if (games[i].ip == peername.address)
			return true;
	}

	// Check the accepted controller origins
	for (var i = 0; i < controllers.length; i++) {

		if (controllers[i].ip == peername.address)
			return true;
	}

	return false;
}

/*
 * Checks whether gameCenter connection gets verified
 * 
 * @param {key} Authorization key 
 */

function keyIsAllowed(key) {
	for (var i = 0; i < games.length; i++) {
		if (games[i].publicKey == key)
			return true;
		else
			return false;
	}
}

/*
 * Checks whether a connection with a certain pin exists already
 * 
 * @param {pin} The pin
 * @param {array} an Array with the connected pins  
 */

function pinExists(pin, array) {
	for (var key in array) {
		if (array.hasOwnProperty(key)) {
			if (array[key].pin == pin)
				return true;
		}
	}
	return false;
}

/*
 * Helper function: Returns the size of an associative Array
 * 
 * @param {obj} A multi-dimensional array
 */

function arraySize(obj) {
	var size = 0, key;
	for (key in obj) {
		if (obj.hasOwnProperty(key))
			size++;
	}
	return size;
}

/*
 * Helper function: Formats a time string
 */

function time() {
	return '[' + new Date().toString().substring(4, 21) + '] ';
}

// WebSocket server
wsServer.on('request', function(request) {

	// Check if connection is allowed
	if (!originIsAllowed(request.socket._peername.address)) {
		// Make sure we only accept requests from an allowed origin
		request.reject();
		console.log(time() + 'WebSocket connection from origin ' + request.socket._peername.address + ' rejected.');
		return;
	} else {
		//console.log(request.socket);

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
				if (json.connectionType == 'game') {

					//identify a controller

					if (keyIsAllowed(json.data.publicKey)) {
						game = connection;
						connection.verified = true;
						connections[connectionId] = connection;
						console.log(time() + 'Game registered (' + request.socket._peername.address + ')');
					} else {
						console.log(time() + 'Invalid identifier for ' + request.socket._peername.address + '. Connection closed.');
						connection.close();
					}

					console.log(time() + 'Now ' + arraySize(connections) + ' connections');

					return;
				} else if (json.connectionType == 'controller') {

					//identify a controller
					controller = connection;
					connection.verified = true;
					connections[connectionId] = connection;
					console.log(time() + 'Controller (' + request.socket._peername.address + ') indentified/registered.  (' + arraySize(connections) + ' connections)');

					return;
				}
			}

			//check if connection is ok
			if (connection.verified != true) {
				console.log(time() + 'Unidentified connection tried to send data [Warning]');
				return;
			}

			if (json.type == 'getPinForUser') {
				console.log('Generate new pin');
				console.log(json);

				var pin = undefined;

				while (pinExists(pin, connections)){
					pin = Math.floor(Math.random() * 9000) + 1000;
				}

				connection.pins = pin;

				connection.sendUTF(JSON.stringify({
					type : "getPinForUser",
					data : {
						pin : pin,
						username : json.data.username
					}
				}));
			
			} else if (json.type == 'kickOffGame') { // Announce to the controllers that the game stars
				
				// TODO Get game controllers and send the kickOff message
			
			} else if (json.type == 'registerPinsForGameInstance') {// TODO remove?
				console.log(time() + 'Received new pins:');

                connection.pins = json.data.pins;
                connection.game = json.data.game;

                //name of gamepade configured by the symfony admin (php)
                console.log(connection.game.accepted_game_pads);

				json.data.pins.forEach(function(pin) {
					console.log('Pin: ' + pin);
				});
			} else if (json.type == 'sendCommandToGame') {

				console.log(time() + 'Sent command to game instance');

				console.log(json);

				connections[json.data.connectionId].sendUTF(JSON.stringify({
					type : 'sendCommandToGame',
					keycode : json.data.keycode,
					pin : json.data.pin
				}));

			} else if (json.type == 'getConnectionForPin') {

				// is set to true, if the pin from the controller
				var successPinMatch = false;

				Object.keys(connections).forEach(function(key) {
					var gameConnection = connections[key];

					if (gameConnection.pins != undefined && gameConnection.pins.length > 0) {
						console.log(gameConnection.pins.length);
						console.log(gameConnection.pins);

						gameConnection.pins.forEach(function(pin) {

							console.log(gameConnection.id);
							console.log(gameConnection.connectionId);
							console.log(json);

							if (json.data.pin == pin) {
								//jip jipp :)
								console.log('jipp jiopp ');
                                console.log(gameConnection.game.accepted_game_pads);

								//send back the connection-id to the controller to cache it
								//TODO risk?
								console.log('cache controller');
								connection.sendUTF(JSON.stringify({
									type : "cacheConnectionIdOnController", // TODO rename
									controllerType : gameConnection.game.accepted_game_pads,
									pin : key // TODO rename
								}));

								//tell the game instance that this pin has been activated by a controller
								console.log('activate pin ' + json.data.pin);
								gameConnection.sendUTF(JSON.stringify({
									type : "activateController",
									pin : json.data.pin,

								}));

								successPinMatch = true;
								/*

								 pass the action to the game instance

								 connection.sendUTF(JSON.stringify({
								 type: "correctPinSubmit",
								 pin: json.data.data.pin
								 }));
								 */

							}
						});
					}
				});

				//if we come here, this means the pin is not correct
				if (successPinMatch == true) {
					console.log(time() + 'Correct pin (id ' + connectionId + ')');
				} else {
					console.log('Wrong pin (id ' + connectionId + ')');
					connection.sendUTF(JSON.stringify({
									type : "wrongPin"
								}));
				}

			} else {
				console.log(time() + 'Invalid message type ' + JSON.stringify(json));
			}
		} else {
			console.log(time() + 'Invalid message format');
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
		if (connectionId != undefined) {
			console.log(time() + 'Id "' + connectionId + '" disconnected');
			delete connections[connectionId];
			console.log(time() + 'Now ' + arraySize(connections) + ' connections');
		}
	});
});
