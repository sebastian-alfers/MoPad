// modified from: http://net.tutsplus.com/tutorials/javascript-ajax/start-using-html5-websockets-today/

$(document).ready(function () {

	var intervalTriggers = new Array();

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
					socket.send(JSON.stringify({'type':'identify', 'data': {'type':'controller','publicKey':'123456'}}));
				}
				socket.onmessage = function (msg) {
					log('Received: ' + msg.data, 'message');
				}
				socket.onclose = function () {
					log('Socket Status: ' + socket.readyState + ' (Closed)','event');
				}
			} catch (exception) {
				log('Error' + exception, 'error');
			}

			function send(buttonId) {
				if (buttonId == "" || buttonId == undefined) {
					log('No buttonId set','warning');
					return;
				}
				try {
					socket.send(JSON.stringify({'type':'buttonClick', 'data': buttonId}));
					log('Sent: ' + buttonId,'event')
				} catch (exception) {
					log('Error '+exception, 'warning');
				}
			}

			$('.button').mousedown(function () { //When button is pressed
				var id = this.id;
				send(id);
				if($(this).hasClass('continuous')){ //TODO: Fires twice if only pressed shortly
					intervalTriggers[id] = setInterval(function(){
					  send(id);
					}, 50);
				}
			});
			
			$('.button.continuous').mouseup(function () { //When button is released TODO doesn't clear if button is released outside of the button scope
				var id = this.id;
				window.clearInterval(intervalTriggers[id]);
				delete intervalTriggers[id];
			});

			function log(msg, type) {
				if(type==undefined) type = 'message';
				$('#log ol').append('<li class="' + type + '">' + new Date().toString().substring(16,24) + ' - ' + msg + '</li>');
				$('#log').scrollTop($('#log').prop("scrollHeight"));
			}
					
		} //End connect  
	} //End else

});