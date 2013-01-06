$(document).ready(function() {

	//Joystick();

	window.socket = Socket.init(); 

	$('#pinInput').keyup(function(){
		var value = $('#pinInput').val();
		var length = value.length;

		if(length == 4 && !isNaN(value))	$('#submitPin').removeAttr('disabled');
		else $('#submitPin').attr('disabled','disabled');
	});

	$('#submitPin').click(function(){ // TODO enable "enter" to send
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