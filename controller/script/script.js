$(document).ready(function() {
	
	var urlParam = function(name){
    	var results = new RegExp('[\\?&amp;]' + name + '=([^&amp;#]*)').exec(window.location.href);
	    return results && results[1] || null; ;
	}

	//Joystick();
	if(urlParam('controller') == null){
		window.socket = Socket.init();
	} else {

		switch (urlParam('controller')) {
			case "joystick":
				Joystick();
				break;
			case "joypad": // doesn't work
				Joypad();
				break;
			default: 
				console.log('Unkown controller specified in URL');
				break;
		}
	}

	$('#pinInput').keyup(function(){
		var value = $('#pinInput').val();
		var length = value.length;

		if(length == 4 && !isNaN(value))	$('#submitPin').removeAttr('disabled');
		else $('#submitPin').attr('disabled','disabled');
	});

	$('#submitPin').click(function(){ // TODO enable "enter" to send
		var pin = $('#pinInput').val();
        console.log(socket);
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