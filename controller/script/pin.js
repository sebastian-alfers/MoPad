$(document).ready(function() {

    window.gameConnectionId = null;

    loadSocket();


	$('#button').click(function(e){

        $('#free_button').show();
        $('#pin').attr("disabled", "disabled");

        $(this).attr("value", "send command to game");

        console.log(gameConnectionId);
        if(gameConnectionId != null){
            send({type: 'sendCommandToGame', data: { connectionId: window.gameConnectionId, pin: $('#pin').val()}});
        }
        else{
            send({type: 'getConnectionForPin', data: { pin: $('#pin').val()}});
        }

	})

    $('#free_button').click(function(){
        $('#pin').removeAttr("disabled");
        $(this).hide();
        $('#button').attr("value", "submit pin");
    });

});