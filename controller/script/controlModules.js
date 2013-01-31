/**
 * Creates a Joystick controller
 *
 * @constructor
 *
 */


window.BenchmarkController = function() {

	init();

	/*
	 * Adds a Benchmark view to the #controller div
	 */

	function init() {
		console.log('Loading Benchmark');
		loadControllerInterface();

		$('#controller').append('<div class="controlModule benchmark" id="bench"><div id="bench_btn"></div></div>');
		$('#joystickWrapper').css('visibility', 'hidden');


    }

}
/**
 * Creates a Joypad controller
 *
 * @constructor
 *
 */


window.Joystick = function() {

	init();

	/*
	 * Adds a Joystick to the #controller div
	 */

	function init() {
		console.log('Loading Joystick');
		loadControllerInterface();

		$('#controller').append('<div class="controlModule joystick" id="joystick1"><div id="joystickField"><div class="helpOverlay">Tap anywhere to reveal the joystick.</div><div id="joystickWrapper"><div id="joystickNub" /></div></div></div>');
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

		$('#joystickField').bind('touchstart', function(e) {
			e.preventDefault();
			// Bugfix; compare https://code.google.com/p/android/issues/detail?id=19827
			$('.helpOverlay').hide();

			var touch = e.originalEvent.touches[0];

			//Display joystickWrapper at tap position
			$('#joystickWrapper').offset({
				left : touch.pageX - ($('#joystickWrapper').width() / 2),
				top : touch.pageY - ($('#joystickWrapper').width() / 2)
			})
			var joystickNubOffset = $('#joystickNub').offset();
			joystickLeft = joystickNubOffset.left;
			joystickTop = joystickNubOffset.top;
			$('#joystickWrapper').css('visibility', 'visible');
			dragging = true;
		});

		$('#joystickField').bind('touchmove', function(e) {
			e.preventDefault();
			if (dragging) {

				var touch = e.originalEvent.touches[0];

				// Position of the nub on the page
				var joystickNubOffset = {
					'left' : touch.pageX - ($('#joystickNub').width() / 2),
					'top' : touch.pageY - ($('#joystickNub').width() / 2)
				};

				// Nub distance and angle relative to wrapper center
				var distance = calcDistance(joystickNubOffset.left, joystickLeft, joystickNubOffset.top, joystickTop);

				var joystickRadius = $('#joystickWrapper').width() / 2 - $('#joystickNub').width() / 2;

				if (distance > joystickRadius) {// Out of bounds
					var coordinates = calcCoordinates(joystickRadius, distance, joystickNubOffset.left - joystickLeft, joystickNubOffset.top - joystickTop);
					offsetLeft = joystickLeft + coordinates.opposite;
					offsetTop = joystickTop + coordinates.adjacent;
					x = (joystickNubOffset.left - joystickLeft);
					y = ((joystickNubOffset.top - joystickTop) * -1);
					distance = 1;

				} else {// Nub is within joystick
					offsetLeft = joystickNubOffset.left;
					offsetTop = joystickNubOffset.top;
					x = (joystickNubOffset.left - joystickLeft);
					y = ((joystickNubOffset.top - joystickTop) * -1);
					distance = distance / joystickRadius;
				}

				angle = calcAngle(x, y);
				if (angle == -1)
					console.log('Angle calculation failed');

				console.log('distance ' + distance.toFixed(2) + ' angle ' + angle.toFixed(0));

				// Example-translation to x and y in a game:

				//console.log('x: '+Math.round((Math.sin(angle* (Math.PI/180)))*distance*10));
				//console.log('y: '+Math.round((Math.cos(angle* (Math.PI/180)))*distance*10));

				$('#joystickNub').offset({
					left : offsetLeft,
					top : offsetTop
				})

				if (socket != undefined) {
					socket.send({// TODO auslagern!!
						type : 'sendCommandToGame',
						data : {
							angle : angle,
							distance : distance,
							connectionId : connectionId,
							pin : $('#pinInput').val() // TODO: Automatic identification on bridge, not via pin. pin input might also be removed already
						}
					});
				}
			}
		});

		$('#joystickField').bind('touchend', function(e) {
			e.preventDefault();
			dragging = false;
			$('#joystickNub').css({
				left : '0',
				top : '0'
			})
			$('#joystickWrapper').css('visibility', 'hidden');
		});

	}

	function calcDistance(x1, x2, y1, y2) {// Pythagoras
		return Math.sqrt(Math.pow(y2 - y1, 2) + Math.pow(x2 - x1, 2));
	}

	// Takes two coordinates (opposite and adjacent) and calculates the angle
	function calcAngle(x, y) {

		if (x >= 0 && y > 0) {// 0�
			return Math.atan(Math.abs(x) / Math.abs(y)) / (Math.PI / 2) * 90 + 0;
		} else if (x > 0 && y <= 0) {// 90�
			return Math.atan(Math.abs(y) / Math.abs(x)) / (Math.PI / 2) * 90 + 90;
		} else if (x <= 0 && y < 0) {// 180�
			return Math.atan(Math.abs(x) / Math.abs(y)) / (Math.PI / 2) * 90 + 180;
		} else if (x < 0 && y >= 0) {// 270�
			return Math.atan(Math.abs(y) / Math.abs(x)) / (Math.PI / 2) * 90 + 270;
		}

		return -1;
	}

	function calcCoordinates(new_hypotenuse, old_hypotenuse, old_opposite, old_adjacent) {
		// Calculate the coordinates if out of bounds

		var sinA = old_opposite / old_hypotenuse;
		var tanA = old_opposite / old_adjacent;
		var opposite = (sinA * new_hypotenuse);

		return {
			'opposite' : opposite,
			'adjacent' : (opposite / tanA)
		};
	}

}
/**
 * Creates a Joypad controller
 *
 * @constructor
 *
 */

window.Joypad = function() {

	init();

	/*
	 * Adds a Joypad to the #controller div
	 */

	function init() {
		console.log('Loading Joypad');
		loadControllerInterface();

		$('#controller').append('<div class="controlModule joypad" id="joypad1"><div class="borderBox"><div class="helpOverlay">Drag # to move the touchpad to the desired position.</div><table class="dPad"><tr><td colspan="3"><div class="button continuous up" id="up">&uarr;</div></td></tr><tr><td><div class="button left" id="left">&larr;</div></td><td><div class="button drag"><span id="dragDpad">#</span></div></td><td><div class="button continuous right" id="right">&rarr;</div></td></tr><tr><td colspan="3"><div class="button continuous down" id="down">&darr;</div></td></tr></table><table class="buttonGrid" id="buttonGrid1" hidden="hidden"><tr><td><div class="button blue" id="blue">B</div></td></tr><tr><td><div class="button red" id="red">A</div></td></tr></table></div></div><div class="clear"/>');
		// TODO display buttongroup

		var intervalTriggers = new Array();

		$('.controlModule.joypad .button').bind('touchstart', function(e) {//When button is pressed
			e.preventDefault();
			$(this).addClass('active');
			var id = this.id;
			//send(id);

			if ( typeof connectionId != 'undefined') {
				socket.send({// TODO auslagern!!
					type : 'sendCommandToGame',
					data : {
						keycode : id,
						connectionId : connectionId,
						pin : $('#pinInput').val() // TODO: Automatic identification on bridge, not via pin. pin input might also be removed already
					}
				});

			} else {
				console.log('connectionId unknown');
			}

			if ($(this).hasClass('continuous')) {
				intervalTriggers[id] = setInterval(function() {
					//send(id); // TODO funktionlität nachrüsten
				}, 50);
			}
		});

		$('.controlModule.joypad .button').bind('touchend', function(e) {//When button is pressed
			e.preventDefault();
			$(this).addClass('active');
			var id = this.id;
			//send(id);

			if ( typeof connectionId != 'undefined') {
				socket.send({// TODO auslagern!!
					type : 'sendCommandToGame',
					data : {
						keycode : id,
						connectionId : connectionId,
						pin : $('#pinInput').val() // TODO: Automatic identification on bridge, not via pin. pin input might also be removed already
					}
				});

			} else {
				console.log('connectionId unknown');
			}

			if ($(this).hasClass('continuous')) {
				intervalTriggers[id] = setInterval(function() {
					//send(id); // TODO funktionlit�t nachr�sten
				}, 50);
			}
		});

		$('.controlModule.joypad .button').bind('touchend', function(e) {//When button is pressed
			e.preventDefault();
			$(this).removeClass('active');
		});

		$('.controlModule.joypad .button.continuous').bind('touchend', function(e) {//When button is released
			e.preventDefault();
			var id = this.id;
			window.clearInterval(intervalTriggers[id]);
			delete intervalTriggers[id];
		});

		// Dragging Source: http://stackoverflow.com/questions/8569095/draggable-div-without-jquery-ui

		var dragging = null;

		$('#dragDpad').bind('touchstart', function(e) {
			e.preventDefault();
			// Bugfix; compare https://code.google.com/p/android/issues/detail?id=19827
			console.log('Dragging dPad..');
			dragging = true;
			$('.helpOverlay').hide();
		});

		$('#dragDpad').bind('touchmove', function(e) {
			e.preventDefault();
			var touch = e.originalEvent.touches[0];

			if (dragging) {
				$('.dPad').offset({
					top : touch.pageY - e.target.offsetTop - e.target.offsetHeight / 2 - $('.button.left').height(),
					left : touch.pageX - e.target.offsetLeft - e.target.offsetWidth / 2 - $('.button.left').width()
				});
			}
		});

		$('#dragDpad').bind('touchend', function(e) {
			e.preventDefault();
			console.log('Dragging dPad end');
			dragging = false;
		});

	}

}
/*
 * Clears pin view to display controller
 */

function loadControllerInterface() {
	$("#header").hide();
	$("#pinInputWrapper").hide();
	$("#controller").show();
}

/*
 * Clears controller to display pin view
 */

window.resetController = function() {
	$('#controller').html('');
	$('#header').show();
	$('#pinInputWrapper').show();
}