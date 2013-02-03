$(document).ready(function() {

	var urlParam = location.search.replace('?', '').split('='); // Fetches first Get variable

	//Joystick();
	if (urlParam[0] == 'ip') {
		window.socket = Socket.init(urlParam[1]);
	} else if (urlParam[0] == 'controller') {
		switch (urlParam[1]) {
			case "joystick":
				Joystick();
				break;
			case "joypad":
				Joypad();
				break;
            case "benchmark":
                Benchmark();
                break;
			default:
				console.log('Unkown controller specified in URL');
				break;
		}
	} else {
		window.socket = Socket.init(window.location.origin.substr(7,window.location.origin.length));
	}

	$('#pinInput').keyup(function() {
		var value = $('#pinInput').val();
		var length = value.length;

		if (length == 4 && !isNaN(value))
			$('#submitPin').removeAttr('disabled');
		else
			$('#submitPin').attr('disabled', 'disabled');
	});

	$('#submitPin').click(function() { // TODO enable "enter" to send
		var pin = $('#pinInput').val();
		socket.send({
			type : 'getConnectionForPin',
			data : {
				pin : pin
			}
		});
	})
	// Manual loading of the controllers..
	$('#pinInputWrapper').append('(Or launch <a href="javascript:void(0)" onclick="javascript:Joystick();">Joystick</a>, <a href="javascript:void(0)" onclick="javascript:Joypad()">Joypad</a>)');

});
