

function loadjscssfile(filename, filetype){
 if (filetype=="js"){ //if filename is a external JavaScript file
  var fileref=document.createElement('script')
  fileref.setAttribute("type","text/javascript")
  fileref.setAttribute("src", filename)
 }
 else if (filetype=="css"){ //if filename is an external CSS file
  var fileref=document.createElement("link")
  fileref.setAttribute("rel", "stylesheet")
  fileref.setAttribute("type", "text/css")
  fileref.setAttribute("href", filename)
 }
 if (typeof fileref!="undefined")
  document.getElementsByTagName("head")[0].appendChild(fileref)
}

loadjscssfile("http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js", "js") //dynamically load and add this .js file


setTimeout(function(){
loadjscssfile("game/jquery.gamequery-0.7.0.js", "js") //dynamically load "javascript.php" as a JavaScript file



setTimeout((function(){	


$('#main').append('<br /><br /> \
	<div id="playground" style="width: 700px; height: 250px; background: black;">\
		<div id="welcomeScreen" style="width: 700px; height: 250px; position: absolute; z-index: 100; background-image: url(game/idee6_nina.png); font-family: verdana, sans-serif;">\
			<div style="position: absolute; top: 120px; width: 700px; color: white;">\
				<div id="loadingBar" style="position: relative; left: 100px; height: 15px; width: 0px; background: red;"></div><br />\
				<center><a style="cursor: pointer;" id="startbutton">Click here to start!</a></center>\
			</div>\
		</div>\
	</div>\
\
');


    console.log($playerPins);

var playerCount = $playerPins.length;

    console.log(playerCount);

// Game state
var bossMode = false;
var bossName = null;
var playerHit = false;
var timeOfRespawn = 0;
var gameOver = false;
// Game objects:
function Player(node){

	this.node = node;
	//this.animations = animations;

	this.grace = false;
	this.replay = 3; 
	this.shield = 3; 
	this.respawnTime = -1;
	
	// This function damage the ship and return true if this cause the ship to die 
	this.damage = function(){
		if(!this.grace){
			this.shield--;
			if (this.shield == 0){
				return true;
			}
			return false;
		}
		return false;
	};
	
	// this try to respawn the ship after a death and return true if the game is over
	this.respawn = function(){
		this.replay--;
		if(this.replay==0){
			return true;
		}
		
		this.grace 	= true;
		this.shield	= 3;
		
		this.respawnTime = (new Date()).getTime();
		$(this.node).fadeTo(0, 0.5); 
		return false;
	};
	
	this.update = function(){
		if((this.respawnTime > 0) && (((new Date()).getTime()-this.respawnTime) > 3000)){
			this.grace = false;
			$(this.node).fadeTo(500, 1); 
			this.respawnTime = -1;
		}
	}
	
	return true;
}	



var PLAYGROUND_WIDTH	= 700;
var PLAYGROUND_HEIGHT	= 250;
var REFRESH_RATE		= 15;	
	
        var PLAYGROUND_WIDTH	= 700;
        var PLAYGROUND_HEIGHT	= 250;
	// The background:
	var background1 = new $.gQ.Animation({imageURL: "game/background1.png"});
	var background2 = new $.gQ.Animation({imageURL: "game/background2.png"});
	var background3 = new $.gQ.Animation({imageURL: "game/background3.png"});
	var background4 = new $.gQ.Animation({imageURL: "game/background4.png"});
	var background5 = new $.gQ.Animation({imageURL: "game/background5.png"});
	var background6 = new $.gQ.Animation({imageURL: "game/background6.png"});
 
	var playerAnimation = new Array(); 
	playerAnimation["idle"]		= new $.gQ.Animation({imageURL: "game/player_spaceship.png"});
	
	
	 

	// Initialize the game:
	$("#playground").playground({height: PLAYGROUND_HEIGHT, width: PLAYGROUND_WIDTH, keyTracker: true});
				
	// Initialize the background
	$.playground().addGroup("background", {width: PLAYGROUND_WIDTH, height: PLAYGROUND_HEIGHT})
						.addSprite("background1", {animation: background1, width: PLAYGROUND_WIDTH, height: PLAYGROUND_HEIGHT})
						.addSprite("background2", {animation: background2, width: PLAYGROUND_WIDTH, height: PLAYGROUND_HEIGHT, posx: PLAYGROUND_WIDTH})
						.addSprite("background3", {animation: background3, width: PLAYGROUND_WIDTH, height: PLAYGROUND_HEIGHT})
						.addSprite("background4", {animation: background4, width: PLAYGROUND_WIDTH, height: PLAYGROUND_HEIGHT, posx: PLAYGROUND_WIDTH})
						.addSprite("background5", {animation: background5, width: PLAYGROUND_WIDTH, height: PLAYGROUND_HEIGHT})
						.addSprite("background6", {animation: background6, width: PLAYGROUND_WIDTH, height: PLAYGROUND_HEIGHT, posx: PLAYGROUND_WIDTH})
					.end()
					.addGroup("actors", {width: PLAYGROUND_WIDTH, height: PLAYGROUND_HEIGHT});
					
	for(i = 0; i < playerCount; i++){
						$.playground().addGroup("player"+$playerPins[i], {posx: 10, posy: 10 + 40*i, width: 100, height: 26})
							.addSprite("playerBody",{animation: playerAnimation["idle"], posx: 0, posy: 0, width: 100, height: 26})
						.end();
	}					

		$.playground().end()





					
	for(i = 0; i < playerCount; i++){
		console.log($playerPins[i]);
		$("#player"+$playerPins[i])[0].player = new Player($("#player"));
	}					
//	$("#player")[0].player = new Player($("#player"));
					
					
	
	//this is the HUD for the player life and shield
	$("#overlay").append("<div id='shieldHUD'style='color: white; width: 100px; position: absolute; font-family: verdana, sans-serif;'></div><div id='lifeHUD'style='color: white; width: 100px; position: absolute; right: 0px; font-family: verdana, sans-serif;'></div>")
	
	// this sets the id of the loading bar:
	$.loadCallback(function(percent){
		$("#loadingBar").width(400*percent);
	});
	
	//initialize the start button
	$("#startbutton").click(function(){
		$.playground().startGame(function(){
			$("#welcomeScreen").fadeTo(1000,0,function(){$(this).remove();});
		});
	});

    var $playerStatus = Array();
    var $jQuery = jQuery.gameQuery;
    var update = function(){
        console.log($jQuery);
            for (var i = 0; i < $playerPins.length; ++i) {


                if($playerStatus[$playerPins[i]] != undefined && $playerStatus[$playerPins[i]]){

                    $("#player"+$playerPins[i])[0].player.update();
                				if($jQuery.keyTracker[65]){ //this is left! (a)
                					var nextpos = $("#player"+$playerPins[i]).x()-5;
                					if(nextpos > 0){
                						$("#player"+$playerPins[i]).x(nextpos);
                					}
                				}

                				if($jQuery.keyTracker[68]){ //this is right! (d)
                					var nextpos = $("#player"+$playerPins[i]).x()+5;
                					if(nextpos < PLAYGROUND_WIDTH - 100){
                						$("#player"+$playerPins[i]).x(nextpos);
                					}
                				}

                				if($jQuery.keyTracker[87]){ //this is up! (w)
                					var nextpos = $("#player"+$playerPins[i]).y()-3;
                					if(nextpos > 0){
                						$("#player"+$playerPins[i]).y(nextpos);
                					}
                				}
                				if($jQuery.keyTracker[83]){ //this is down! (s)
                					var nextpos = $("#player"+$playerPins[i]).y()+3;
                					if(nextpos < PLAYGROUND_HEIGHT - 30){
                						$("#player"+$playerPins[i]).y(nextpos);
                					}
                				}

                }



            }

    					}
	
	// this is the function that control most of the game logic 
	$.playground().registerCallback(update, REFRESH_RATE);





$webSocketModel.on('sendCommandToGame', function(json){ // TODO move to central event handler
    console.log("***");
	console.log(json);
    console.log("***");


    if($playerStatus[json.pin] == undefined){
        $playerStatus[json.pin] = true;
    }
    else{
        $playerStatus[json.pin] = !$playerStatus[json.pin];
    }

	//just pass the message type (from node) as an event to be subscribed to
	
	switch(json.keycode){
		case 'up': jQuery.gameQuery.keyTracker[87] = !jQuery.gameQuery.keyTracker[87];
					break;
		case 'down': jQuery.gameQuery.keyTracker[83] = !jQuery.gameQuery.keyTracker[83];
					break;
		case 'left': jQuery.gameQuery.keyTracker[65] = !jQuery.gameQuery.keyTracker[65];
					break;
		case 'right': jQuery.gameQuery.keyTracker[68] = !jQuery.gameQuery.keyTracker[68];
					break;
		default: console.log('Unkown key command');
	}


});





}), 2000)}, 2000);

