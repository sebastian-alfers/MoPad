$(document).ready(function() {

	$('#controller').html('<ul><li>- <a href="javascript:void(0)">Joystick</a></li><li>- <a href="javascript:void(0)">Joypad</a></li><li>- <a href="javascript:void(0)">Accelerometer</a></li></ul>');
	
	$('a').click(function(e){
	
		if($(this).text()=='Joystick'){
			$('#controller').html('');
			Joystick();
		} else if ($(this).text()=='Joypad'){
			$('#controller').html('');
			Joypad();
		} else if ($(this).text()=='Accelerometer'){
			$('#controller').html('');
			Accelerometer();
		}
		
		loadSocket();
		
		this.removeEventListener('click',arguments.callee,false);
	
	})

});