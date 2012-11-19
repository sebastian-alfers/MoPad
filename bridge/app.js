var WebSocketServer = require('websocket').server;
var http = require('http');
var port = 8081;

// Websocket server will be bound to a http server
var server = http.createServer(function (req, res) { 
	res.writeHead(200, {'Content-Type': 'text/plain'});
  	res.end('Placeholder\n'); 
}).listen(port, function() { console.log('Listening on port '+port) });

// create the server
wsServer = new WebSocketServer({
    httpServer: server
});

var game;
var controller;

// Registered Games
var games = [];
games.push({id: 1, gameName: "Move the box", publicKey: '123456', ip: '127.0.0.1'});


// Current connections
var connections = []; //id, connectiongame, connectionController, timestamp, gameId


function originIsAllowed(peername){
	for(var i = 0; i < games.length; i++){
	  if(games[i].ip == peername.address) return true;
	  else return false;
	}
}

function keyIsAllowed(key){
	for(var i = 0; i < games.length; i++){
	  if(games[i].publicKey == key) return true;
	  else return false;
	}
}

function time(){
	return '['+ new Date().toString().substr(0,21) +'] ';
}


// WebSocket server
wsServer.on('request', function(request) {

	// Check if connection is allowed
    if (!originIsAllowed(request.socket._peername)) {
      // Make sure we only accept requests from an allowed origin
      request.reject();
      console.log(time() + 'WebSocket connection from origin ' + request.socket._peername.address + ' rejected.');
      return;
    }

	var connection = request.accept(null, null);
	// console.log(connection); // Log connection object
	connection.verified = false; // Connection accepted, but not verified/identified
	connection.id = '123456'; // https://github.com/Worlize/WebSocket-Node/wiki
	console.log(time() + 'WebSocket connection from origin ' + request.socket._peername.address + ' accepted.');

	// Incoming message
    connection.on('message', function(message) {
        if (message.type === 'utf8') {
        	try {
	        	var json = JSON.parse(message.utf8Data);
        	} catch(exception) {
        		console.log(time() + 'Parsing error: '+exception);
        		return;
        	}
        	
            // process WebSocket message
            console.log(json);
            console.log('-------------');
           if (json.type == 'identify'){ // First message identifies the websocket type (game/controller) TODO First message has to be identify, otherwise reject connection
            	if(json.data.type == 'game'){
            		if(keyIsAllowed(json.data.publicKey)){
            			game = connection;
	           			connection.verified = true;
            			console.log('Game registered ('+request.socket._peername.address+')');
            		} else { 
	           			console.log(time() + 'Invalid identifier for '+request.socket._peername.address+'. Connection closed.');
            			connection.close();
            		}
            	}
            	else if(json.data.type == 'controller'){ 
            		controller = connection;
            		connection.verified = true;
            		console.log(time() + 'Controller registered  ('+request.socket._peername.address+')');
            	}
            } else if(json.type == 'buttonClick' && connection.verified){
	            game.sendUTF(JSON.stringify(json)); //Redirect TODO check if game exists
	            console.log(time() + 'Sent to game: '+JSON.stringify(json));
           } else if(json.type == 'verifyController' && connection.verified){
               console.log(json);
            } else { console.log(time() + 'Invalid message type '+JSON.stringify(json)); }
        } else {
        	console.log(time() + 'Invalid message format');
        }
    });

    connection.on('close', function(connection) {
        // close user connection
    });
});