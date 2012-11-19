$(document).ready(function() {

    loadSocket();
	
	$('#button').click(function(e){

        send({type: 'verifyController', data: { pin: $('#pin').val()}});
	})

});