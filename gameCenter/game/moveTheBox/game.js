/**
 * @memberof PaintTheBox
 * @function loadjscssfile
 *
 * @desc helper do load assets (js and css) files that are required by the game
 */
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
    //first, load the game engine-framework
    loadjscssfile("game/moveTheBox/jquery.gamequery-0.7.0.js", "js") //dynamically load "javascript.php" as a JavaScript file

    setTimeout((function(){
        /**
         * @author Sebastian Alfers
         *
         * @nameSpace MoveTheBox
         * @class Game where each player can move a "box" - here a space ship
         *
         * @name MoveTheBox
         *
         */

        //add the stage to the DOM
        $('#main').append('\
            <div id="playground" style="width: 700px; height: 250px; background: black;margin-left: 125px;">\
                <div id="welcomeScreen" style="width: 700px; height: 250px; position: absolute; z-index: 100; background-image: url(game/moveTheBox/idee6_nina.png); font-family: verdana, sans-serif;">\
                    <div style="position: absolute; top: 120px; left: 100px; width: 700px;  color: white;">\
                        <div id="loadingBar" style="position: relative; left: 100px; height: 15px; width: 0px; background: red;"></div><br />\
                        <center><a style="cursor: pointer;" id="startbutton">Click here to start!</a></center>\
                    </div>\
                </div>\
            </div>\
        \
        ');

        /**
         * @memberof PaintTheBox
         * @member intervalls
         * @type Array
         * @desc store all the intervalls
         */
        var intervalls = new Array();

        /**
         * @memberof PaintTheBox
         * @member playerPositions
         * @type Array
         * @desc array to store all player. each player is represented with an array with the indexes x, y and color. here
         * we could also store the usernames?
         */
        var playerPositions = Array();

        /**
         * @memberof MoveTheBox
         * @member playerCount
         * @type int
         * @desc cache the number of player
         */
        var playerCount = $playerPins.length;

        /**
         * @author Sebastian Alfers
         *
         * @nameSpace Player
         * @class class to store a player
         *
         * @name Player
         *
         */
        function Player(node){

            /**
             * @memberof Player
             * @member node
             * @type {HTML element}
             * @desc store the reference to the player in the DOM
             */
            this.node = node;

            /**
             * @memberof Player
             * @function update
             *
             * @desc method to update each player during the game loop
             */
            this.update = function(){
                //game logic here
            }

            return true;
        }// end class player

        /**
         * @memberof MoveTheBox
         * @member REFRESH_RATE
         * @type int
         * @desc refresh rate of the game loop
         */
        var REFRESH_RATE		= 15;

        /**
         * @memberof MoveTheBox
         * @member PLAYGROUND_WIDTH
         * @type int
         * @desc width of the stage
         */
        var PLAYGROUND_WIDTH	= 700;

        /**
         * @memberof MoveTheBox
         * @member PLAYGROUND_HEIGHT
         * @type int
         * @desc height of the state
         */
        var PLAYGROUND_HEIGHT	= 250;

        /**
         * @memberof MoveTheBox
         * @member background1
         * @type gQ.Animation
         * @desc background for the stage
         */
        var background1 = new $.gQ.Animation({imageURL: "game/moveTheBox/background1.png"});

        /**
         * @memberof MoveTheBox
         * @member background2
         * @type gQ.Animation
         * @desc background for the stage
         */
        var background2 = new $.gQ.Animation({imageURL: "game/moveTheBox/background2.png"});

        /**
         * @memberof MoveTheBox
         * @member background3
         * @type gQ.Animation
         * @desc background for the stage
         */
        var background3 = new $.gQ.Animation({imageURL: "game/moveTheBox/background3.png"});

        /**
         * @memberof MoveTheBox
         * @member background4
         * @type gQ.Animation
         * @desc background for the stage
         */
        var background4 = new $.gQ.Animation({imageURL: "game/moveTheBox/background4.png"});

        /**
         * @memberof MoveTheBox
         * @member background5
         * @type gQ.Animation
         * @desc background for the stage
         */
        var background5 = new $.gQ.Animation({imageURL: "game/moveTheBox/background5.png"});

        /**
         * @memberof MoveTheBox
         * @member background6
         * @type gQ.Animation
         * @desc background for the stage
         */
        var background6 = new $.gQ.Animation({imageURL: "game/moveTheBox/background6.png"});

        /**
         * @memberof MoveTheBox
         * @member playerAnimation
         * @type Array
         * @desc store all animations for the player
         */
        var playerAnimation = new Array();
        playerAnimation["idle"]		= new $.gQ.Animation({imageURL: "game/moveTheBox/player_spaceship.png"});

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

        //initialize each player positions for the websocket events
        for(i = 0; i < playerCount; i++){

            playerPositions[$playerPins[i]] = new Array();
            playerPositions[$playerPins[i]]['x'] = 50;
            playerPositions[$playerPins[i]]['y'] = 100;

            //x_start += 50;
            //y_start += 50;
        }


        // add a group for each player to the stage
        for(i = 0; i < playerCount; i++){
            $.playground().addGroup("player"+$playerPins[i], {posx: 10, posy: 10 + 40*i, width: 100, height: 26})
                .addSprite("playerBody",{animation: playerAnimation["idle"], posx: 0, posy: 0, width: 100, height: 26})
                .end();
        }
        $.playground().end()

        // new player instances
        for(i = 0; i < playerCount; i++){
            $("#player"+$playerPins[i])[0].player = new Player($("#player"));
        }

        //this is the HUD for the player life and shield
        //$("#overlay").append("<div id='shieldHUD'style='color: white; width: 100px; position: absolute; font-family: verdana, sans-serif;'></div><div id='lifeHUD'style='color: white; width: 100px; position: absolute; right: 0px; font-family: verdana, sans-serif;'></div>")

        // this sets the id of the loading bar:
        $.loadCallback(function(percent){
            $("#loadingBar").width(400*percent);
        });

        //initialize the start button
        //$("#startbutton").click(function(){
            $.playground().startGame(function(){
                $("#welcomeScreen").fadeTo(1000,0,function(){$(this).remove();});
            });
        //});

        /**
         * @memberof MoveTheBox
         * @member $playerStatus
         * @type Array
         * @desc store the positions for each player
         */
        var $playerStatus = Array();
        //var $jQuery = jQuery.gameQuery;

        /**
         * @memberof DrawTheBox
         * @function update
         *
         * @desc main game loop
         */
        var update = function(){

            for (var i = 0; i < $playerPins.length; i++) {
                //if($playerStatus[$playerPins[i]] != undefined && $playerStatus[$playerPins[i]]){

                    //update each player each frame
                $("#player"+$playerPins[i])[0].player.update();


                var next_y = playerPositions[$playerPins[i]]['y'];
                if(next_y > 0 && next_y < PLAYGROUND_WIDTH - 100){
                    $("#player"+$playerPins[i]).y(next_y);
                }

                var next_x = playerPositions[$playerPins[i]]['x'];
                if(next_x > 0 && next_x < PLAYGROUND_WIDTH - 100){
                    $("#player"+$playerPins[i]).x(next_x);
                }
            }
        }

        /**
         * @memberof MoveTheBox
         * @function on('sendCommandToGame')
         *
         * @desc listens to the event sendCommandToGame send by the bridge
         */
        $webSocketModel.on('sendCommandToGame', function(user){ // TODO move to central event handler

            /*
             * the first websocket message indicates to start drawing (user.keycode)
             * the second websocket message indicates to stop drawing (user.keycode)
             *
             * 1) user.keycode == 'up'  ->  start the intervall (to update every 10 microseconds the position of a line)
             * 2) user.keycode == 'up'  ->  clear the intervall (to update every 10 microseconds the position of a line)
             */
            if(intervalls[user.pin] != undefined || intervalls[user.pin] != null){
                // clear the intervall for a user (one user can only have one intervall)
                window.clearInterval(intervalls[user.pin]);
                intervalls[user.pin] = null;
            }
            else
            {
                //here, we do not have any intervall for this user (user.pin)
                /*switch(user.keycode){
                        case 'up':
                               intervalls[user.pin] = new Array();
                               intervalls[user.pin] = window.setInterval(function(){playerPositions[user.pin]['y']-=1},REFRESH_RATE)
                               break;

                        case 'down':
                                intervalls[user.pin] = new Array();
                                intervalls[user.pin] = window.setInterval(function(){playerPositions[user.pin]['y']+=1},REFRESH_RATE)
                                break;

                        case 'left':
                                intervalls[user.pin] = new Array();
                                intervalls[user.pin] = window.setInterval(function(){playerPositions[user.pin]['x']-=1},REFRESH_RATE)
                                break;

                        case 'right':
                                intervalls[user.pin] = new Array();
                                intervalls[user.pin] = window.setInterval(function(){playerPositions[user.pin]['x']+=1},REFRESH_RATE)
                                break;

                        default: console.log('Unkown key command');
                }// end switch keycode*/
               
               
               	// Back-calculation of the angle and distance
               
               	var x = Math.round((Math.sin(user.angle* (Math.PI/180)))*user.distance*10);
				var y = Math.round((Math.cos(user.angle* (Math.PI/180)))*user.distance*10);
				
				console.log('x: '+x+' y: '+y);
               
                playerPositions[user.pin]['x']+=x;
               	playerPositions[user.pin]['y']-=y;
               
               
            }// end else
        });// end websocket on message

        // this is the function that control most of the game logic
        $.playground().registerCallback(update, REFRESH_RATE);

    }), 2000)},
2000);

