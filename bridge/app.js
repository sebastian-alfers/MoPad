/************************************/
/*                                  */
/*  MoPad - Mobile Game Controller  */
/*                                  */
/*        by Janina Trost           */
/*           Sebastian Alfers       */
/*           Jonas Hartweg          */
/*                                  */
/************************************/


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
	console.log(time() + 'Listening on port ' + port)
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

//for controller
games.push({
	id : 1,
	gameName : "Move the box",
	publicKey : '123456',
	ip : '192.168.1.36'
});

// Current connections
var connections = new Array();

//id, connectiongame, connectionController, timestamp, gameId
var connectionIDCounter = 0;

function originIsAllowed(peername) {
	for (var i = 0; i < games.length; i++) {
        console.log(games[i].ip);
        console.log(peername.address);
        console.log('+++++++++++');
		if (games[i].ip == peername.address)
			return true;
	}
    return false;
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
	return '[' + new Date().toString().substring(4, 21) + '] ';
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
				} else if (json.vendor == 'controller') {

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

			if (json.type == 'getControllersForGame') {
				// Send all the existing canvas commands to the new client
				connection.sendUTF(JSON.stringify({
					msg : "initCommands",
					id : connectionId
				}));
				console.log(time()+ ' ' +connection.pins.data);

				connection.pins.data.forEach(function(pin) {
					console.log(time() + pin);
				});
            }
            else if(json.type == 'getPinForUser'){
                console.log('---- generate new pin');
                console.log(json);

                connection.sendUTF(JSON.stringify({
                                                    msg: "getPinForUser",
                                                    action: 'new pin',
                                                    data: {
                                                        pin: Math.floor(Math.random()*1001),
                                                        username: json.data.username}
                                                    }
                                                ));




			} else if (json.type == 'registerPinsForGameInstance') {
				console.log(time() + 'Received new pins:');

				connection.pins = json.data;

				json.data.forEach(function(pin) {
					console.log('Pin: ' + pin);
				});
			}  else if (json.type == 'sendCommandToGame') {

				console.log(time() + 'Sent command to game instance');

                console.log(json);

				connections[json.data.connectionId].sendUTF(JSON.stringify({
					msg : "sendCommandToGame",
					action : 'move the box',
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
								console.log('jipp jiopp');

								//send back the connection-id to the controller to cache it
                                //risk?
                                console.log('cache controller');
								connection.sendUTF(JSON.stringify({
									msg : "cacheConnectionIdOnController",
									pin : key
								}));

								//tell the game instance that this pin has been activated by a controller
                                console.log('activate pin ' + json.data.pin);
                                gameConnection.sendUTF(JSON.stringify({
									msg : "activateController",
									pin : json.data.pin
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
					console.log(time()+'Correct pin (id connectionId)');
				} else {
					console.log('Wrong pin (id connectionId)');
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
		return pin;
	}


	connection.on('close', function(connection) {
		if (connectionId != undefined) {
			console.log(time()+'Id "' + connectionId + '" disconnected');
			delete connections[connectionId];
			console.log(time()+'Now ' + arraySize(connections) + ' connections');
		}
	});
});
