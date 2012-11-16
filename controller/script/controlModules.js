// Joystick

window.Joystick = function(){

	//init
	
	$('#controller').append('<div class="controlModule joystick" id="joystick1"><div id="joystickField"><div id="helpOverlay">Tap anywhere to reveal the joystick</div><div id="joystickWrapper"><div id="joystickNub" /></div></div></div>');

	function calcDistance(x1,x2,y1,y2){ // Pythagoras
		return Math.sqrt(Math.pow(y2-y1, 2)+Math.pow(x2-x1, 2));
	}
	
	function calcCoordinates(new_hypotenuse, old_hypotenuse, old_opposite, old_adjacent){
		// Calculate the coordinates
		
		var sinA = old_opposite / old_hypotenuse;
		var tanA = old_opposite / old_adjacent;
		var opposite = (sinA*new_hypotenuse);
		
		return {'opposite': opposite, 'adjacent': (opposite/tanA)};
	}

	$('#joystickWrapper').css('visibility', 'hidden');
	
	// Source: http://stackoverflow.com/questions/8569095/draggable-div-without-jquery-ui
	var dragging = null;
	var joystickLeft = null;
	var joystickTop = null;
	
	$('#joystickField').bind('touchstart', function(e){
		e.preventDefault(); // Bugfix; compare https://code.google.com/p/android/issues/detail?id=19827
		$('#helpOverlay').hide();
	
		var touch = e.originalEvent.touches[0];
		
		//Display joystickWrapper at tapposition
		$('#joystickWrapper').offset({left: touch.pageX-($('#joystickWrapper').width()/2), top: touch.pageY-($('#joystickWrapper').width()/2)})
		var joystickOffset = $('#joystickNub').offset();
		joystickLeft = joystickOffset.left;
		joystickTop = joystickOffset.top;
		$('#joystickWrapper').css('visibility', 'visible');
		dragging = true;
	});
	
	$('#joystickField').bind('touchmove', function(e){
		e.preventDefault();
        if (dragging) {
        	
        	var touch = e.originalEvent.touches[0];
        	
   			var joystickOffset = {'left':touch.pageX-($('#joystickNub').width()/2),'top':touch.pageY-($('#joystickNub').width()/2)};
        	var distance = calcDistance(joystickOffset.left,joystickLeft,joystickOffset.top,joystickTop);
        	
        	var joystickRadius = $('#joystickWrapper').width()/2-$('#joystickNub').width()/2;

        	if(distance>joystickRadius){
        		var coordinates = calcCoordinates(joystickRadius, distance, joystickOffset.left-joystickLeft, joystickOffset.top-joystickTop);
        		var offsetLeft = joystickLeft+(coordinates.opposite);
	        	var offsetTop = joystickTop+(coordinates.adjacent);
        		console.log(Math.round(distance)+' (Out of bounds)');
        	} else { // Nub is within joystick
    	    	var offsetLeft = touch.pageX-($('#joystickNub').width()/2);
	        	var offsetTop = touch.pageY-($('#joystickNub').width()/2);
        		console.log(Math.round(distance));
        	}
        	
        	$('#joystickNub').offset({left: offsetLeft, top: offsetTop})
        }
	});
	
	$('#joystickField').bind('touchend', function(e){
		e.preventDefault();
		dragging = false;
		$('#joystickNub').css({left: '0', top: '0'})
		$('#joystickWrapper').css('visibility', 'hidden');
	});
	
}


// Joypad

window.Joypad = function(){

	$('#controller').append('<div class="controlModule joypad" id="joypad1"><table class="dPad"><tr><td colspan="2"><div class="button continuous up" id="up">&uarr;</div></td></tr><tr><td><div class="button continuous left" id="left">&larr;</div></td><td><div class="button continuous right" id="right">&rarr;</div></td></tr><tr><td colspan="2"><div class="button continuous down" id="down">&darr;</div></td></tr></table><table class="buttonGrid" id="buttonGrid1"><tr><td><div class="button blue" id="blue">B</div></td></tr><tr><td><div class="button red" id="red">A</div></td></tr></table></div><div class="clear"/>');

	var intervalTriggers = new Array();

	$('.controlModule.joypad .button').bind('touchstart', function () { //When button is pressed
		var id = this.id;
		send(id);
		if($(this).hasClass('continuous')){
			intervalTriggers[id] = setInterval(function(){
			  send(id);
			}, 50);
		}
	});
	
	$('.controlModule.joypad .button.continuous').bind('touchend', function () { //When button is released
		var id = this.id;
		window.clearInterval(intervalTriggers[id]);
		delete intervalTriggers[id];
	});

}