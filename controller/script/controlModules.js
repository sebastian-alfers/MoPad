// Joystick

window.Joystick = function(){

	init();
	
	//init
	function init(){
		$('#controller').append('<div class="controlModule joystick" id="joystick1"><div id="joystickField"><div id="helpOverlay">Tap anywhere to reveal the joystick</div><div id="joystickWrapper"><div id="joystickNub" /></div></div></div>');
		$('#joystickWrapper').css('visibility', 'hidden');
		
		// Source: http://stackoverflow.com/questions/8569095/draggable-div-without-jquery-ui
		var dragging = null;
		
		// Initial coordinates of the nub relative to the page
		var joystickLeft = null;
		var joystickTop = null;
		
		// Current coordinates of the nub relative to the page
		var offsetLeft = null;
		var offsetTop = null;
		
		// Coordinates within wrapper
		var x = null;
		var y = null;
		
		
		$('#joystickField').bind('touchstart', function(e){
			e.preventDefault(); // Bugfix; compare https://code.google.com/p/android/issues/detail?id=19827
			$('#helpOverlay').hide();
		
			var touch = e.originalEvent.touches[0];
			
			//Display joystickWrapper at tap position
			$('#joystickWrapper').offset({left: touch.pageX-($('#joystickWrapper').width()/2), top: touch.pageY-($('#joystickWrapper').width()/2)})
			var joystickNubOffset = $('#joystickNub').offset();
			joystickLeft = joystickNubOffset.left;
			joystickTop = joystickNubOffset.top;
			$('#joystickWrapper').css('visibility', 'visible');
			dragging = true;
		});
		
		$('#joystickField').bind('touchmove', function(e){
			e.preventDefault();
			if (dragging) {
				
				var touch = e.originalEvent.touches[0];
				
				// Position of the nub on the page
				var joystickNubOffset = {'left':touch.pageX-($('#joystickNub').width()/2),'top':touch.pageY-($('#joystickNub').width()/2)};
				
				// Nub distance and angle relative to wrapper center
				var distance = calcDistance(joystickNubOffset.left,joystickLeft,joystickNubOffset.top,joystickTop);								

				var joystickRadius = $('#joystickWrapper').width()/2-$('#joystickNub').width()/2;
						
				if(distance>joystickRadius){ // Out of bounds
					var coordinates = calcCoordinates(joystickRadius, distance, joystickNubOffset.left-joystickLeft, joystickNubOffset.top-joystickTop);
					offsetLeft = joystickLeft+coordinates.opposite;
					offsetTop = joystickTop+coordinates.adjacent;
					x = (joystickNubOffset.left-joystickLeft);
					y = ((joystickNubOffset.top-joystickTop)*-1);
					distance = 1;
					
				} else { // Nub is within joystick
					offsetLeft = joystickNubOffset.left;
					offsetTop = joystickNubOffset.top;
					x = (joystickNubOffset.left-joystickLeft);
					y = ((joystickNubOffset.top-joystickTop)*-1);
					distance = distance/joystickRadius;
				}
				
				angle = calcAngle(x,y);
				console.log('x '+x+' y '+y+' angle '+angle.toFixed(2)+' distance '+distance.toFixed(2)); // X+Y-koordinaten, müssen auf 1 normiert werden
				
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

	function calcDistance(x1,x2,y1,y2){ // Pythagoras
		return Math.sqrt(Math.pow(y2-y1, 2)+Math.pow(x2-x1, 2));
	}
	
	function calcAngle(opposite, adjacent){
		if(opposite == 0) opposite == 1;
		if(adjacent == 0) adjacent == 1;
		return 180/Math.atan(opposite*10/adjacent*10);
	}
		
	function calcCoordinates(new_hypotenuse, old_hypotenuse, old_opposite, old_adjacent){
		// Calculate the coordinates if out of bounds
		
		var sinA = old_opposite / old_hypotenuse;
		var tanA = old_opposite / old_adjacent;
		var opposite = (sinA*new_hypotenuse);
		
		return {'opposite': opposite, 'adjacent': (opposite/tanA)};
	}

}


// Joypad

window.Joypad = function(){

	$('#controller').append('<div class="controlModule joypad" id="joypad1"><table class="dPad"><tr><td colspan="2"><div class="button continuous up" id="up">&uarr;</div></td></tr><tr><td><div class="button continuous left" id="left">&larr;</div></td><td><div class="button continuous right" id="right">&rarr;</div></td></tr><tr><td colspan="2"><div class="button continuous down" id="down">&darr;</div></td></tr></table><table class="buttonGrid" id="buttonGrid1"><tr><td><div class="button blue" id="blue">B</div></td></tr><tr><td><div class="button red" id="red">A</div></td></tr></table></div><div class="clear"/>');

	var intervalTriggers = new Array();

	$('.controlModule.joypad .button').bind('touchstart', function (e) { //When button is pressed
		e.preventDefault();
		$(this).addClass('active');
		var id = this.id;
		send(id);
		if($(this).hasClass('continuous')){
			intervalTriggers[id] = setInterval(function(){
			  send(id);
			}, 50);
		}
	});
	
	$('.controlModule.joypad .button').bind('touchend', function (e) { //When button is pressed
		e.preventDefault();
		$(this).removeClass('active');
	});
	
	$('.controlModule.joypad .button.continuous').bind('touchend', function (e) { //When button is released
		e.preventDefault();
		var id = this.id;
		window.clearInterval(intervalTriggers[id]);
		delete intervalTriggers[id];
	});

}


// Accelerometer

window.Accelerometer = function(){

	if(!window.DeviceOrientationEvent) { 
		$('#controller').fadeOut("fast");
		$('<p>Whoops, your device doesn\'t seem to have an accelerometer.</p>').appendTo('body');
	}
	
	$(window).bind("deviceorientation", function(e){
					// compare: http://www.html5rocks.com/en/tutorials/device/orientation/?redirect_from_locale=de
					console.log('Device moves!',e);
					var orientation = e.originalEvent;
                    var x = orientation.gamma;
                    var y = orientation.beta;
                    var z = orientation.alpha;
 
                    $("body").html(
                        "x = <b>" + x + "</b><br/>" +
                        "y = <b>" + y + "</b><br/>" +
                        "z = <b>" + z + "</b>"
                    );
                });

}