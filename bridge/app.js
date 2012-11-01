var WebSocketServer = require('websocket').server;
var http = require('http');
var port = 8081;

// Websocket server will be bound to a http server
var server = http.createServer(function (req, res) {}).listen(port, function() { console.log('Listening on port '+port) });

// create the server
wsServer = new WebSocketServer({
    httpServer: server
});

var application;
var controller;

var vendors = [];
var applications = [];
var connections = []; //id (pin), connectionApplication, connectionController, timestamp

vendors.push({id: 1, vendorName: 'vendor1', publicKey: '123456', ip: '127.0.0.1'});
vendors.push({id: 2, vendorName: 'vendor2', publicKey: '123457', ip: '127.0.0.1'});
vendors.push({id: 3, vendorName: 'vendor2', publicKey: '123458', ip: '127.0.0.1'});

applications.push({id: 1, applicationName: "application1", vendorId: 1});

function originIsAllowed(peername){
	for(var i = 0; i < vendors.length; i++){
	  if(vendors[i].ip == peername.address) return true;
	  else return false;
	}
}

function keyIsAllowed(key){
	for(var i = 0; i < vendors.length; i++){
	  if(vendors[i].publicKey == key) return true;
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
	connection.verified = false;
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
           if (json.type == 'identify'){ // First message identifies the websocket type (game/controller) TODO First message has to be identify, otherwise reject connection
            	if(json.data.type == 'application'){
            		if(keyIsAllowed(json.data.publicKey)){
            		application = connection;
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
	            application.sendUTF(JSON.stringify(json)); //Redirect TODO check if application exists
	            console.log(time() + 'Sent to application: '+JSON.stringify(json));
            } else { console.log(time() + 'Invalid message type '+JSON.stringify(json)); }
        } else {
        	console.log(time() + 'Invalid message format');
        }
    });

    connection.on('close', function(connection) {
        // close user connection
    });
});