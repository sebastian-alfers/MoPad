$(document).ready(function() {

    loadSocket();
	
	$('#button').click(function(e){


        send({type: 'getConnectionForPin', data: { pin: $('#pin').val()}});
	})

});