// modified from: http://net.tutsplus.com/tutorials/javascript-ajax/start-using-html5-websockets-today/

$(document).ready(function(){

  if (!("WebSocket" in window)) {
		$('.controlModule').fadeOut("fast");
		$('<p>Whoops, you need a browser that supports WebSockets.</p>').appendTo('body');
	} else {
		//The browser supports WebSockets  
		connect();

		function connect() {
			var socket;
			var host = "ws://localhost:8081/";
			try {
				var socket = new WebSocket(host);
				log('Socket Status: ' + socket.readyState,'event');
				socket.onopen = function () {
					log('Socket Status: ' + socket.readyState + ' (open)','event');
					socket.send(JSON.stringify({'type':'identify', 'data': {'type':'application','publicKey':'123456'}}));
				}
				socket.onmessage = function (message) {
					
					try {
						var json = JSON.parse(message.data);
					} catch(exception) {
        				log('Parsing error: '+exception,'warning');
						return;
					}
					
					if(json.type=='buttonClick'){
						log('Received: buttonClick '+json.data);
						if(json.data == 'up') up();
						else if(json.data == 'down') down();
						else if(json.data == 'left') left();
						else if(json.data == 'right') right();
						else if(json.data == 'red') red();		
						else if(json.data == 'blue') blue();
						else { log('Unknown button '+json.data); }
						
					} else {
						log('Unknown message type '+json.type,'warning');
					}
					
				}
				socket.onclose = function () {
					log('Socket Status: ' + socket.readyState + ' (Closed)','event');
				}
			} catch (exception) {
				log('Error' + exception, 'error');
			}

			function log(msg, type) {
				if(type==undefined) type = 'message';
				$('#log ol').append('<li class="' + type + '">' + new Date().toString().substring(16,24) + ' - ' + msg + '</li>');
				$('#log').scrollTop($('#log').prop("scrollHeight"));
			}
					
		} //End connect  
	} //End else


  var game = $('#game');
  var x,y;		
  
  function down() {
	game.css({
     'marginTop' : "+=2px"
	});
  };		  
  
  function up() {
	game.css({
     'marginTop' : "-=2px"
	});
  };	
  
  function right() {
	game.css({
     'marginLeft' : "+=2px"
	});
  };		  
  
  function left() {
	game.css({
     'marginLeft' : "-=2px"
	});
  };
    
  function red() {
	game.css({'background-color': 'red'});
  };
    
  function blue() {
	game.css({'background-color': 'blue'});
  };

  });
