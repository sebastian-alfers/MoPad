var WebSocketServer = require('websocket').server;
var http = require('http');

var server = http.createServer(function(request, response) {
    // process HTTP request. Since we're writing just WebSockets server
    // we don't have to implement anything.
});
server.listen(8081, function() { console.log('Listening on port 8081') });

// create the server
wsServer = new WebSocketServer({
    httpServer: server
});

var application;
var controller;

// WebSocket server
wsServer.on('request', function(request) {

	var connection = request.accept(null, request.origin);	//TODO check origin

	// Incoming message
    connection.on('message', function(message) {
        if (message.type === 'utf8') {
        	try {
	        	var json = JSON.parse(message.utf8Data);
        	} catch(exception) {
        		console.log('Parsing error: '+exception);
        		return;
        	}
        	
            // process WebSocket message
           if (json.type == 'identify'){
            	if(json.data == 'application'){
            		application = connection;
            		console.log('Application registered');
            	}
            	else if(json.data == 'controller'){ 
            		controller = connection;
            		console.log('Controller registered');
            	}
            } else if(json.type == 'buttonClick'){
	            application.sendUTF(JSON.stringify(json)); //Redirect TODO check if application exists
	            console.log('Sent to application: '+JSON.stringify(json));
            } else { console.log('Invalid message type '+JSON.stringify(json)); }
        } else {
        	console.log('Invalid message format');
        }
    });

    connection.on('close', function(connection) {
        // close user connection
    });
});