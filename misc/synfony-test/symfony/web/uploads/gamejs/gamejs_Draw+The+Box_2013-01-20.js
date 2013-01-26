
setTimeout((function(){
    /**
     * @author Sebastian Alfers
     *
     * @nameSpace PaintTheBox
     * @class Game where each player can draw a Line
     *
     * @name PaintTheBox
     *
     */


    //we append the game container to the DOM
    $('#main').append('<br /><br /> \
        <canvas id="canvas"></canvas>\
        \
    ');

    /**
     * @memberof PaintTheBox
     * @member canvas
     * @type {HTMLElement}
     * @desc canvas stage to render the game
     */
    var canvas = document.getElementById("canvas"),
        ctx = canvas.getContext("2d");

    //bounds of our stage
    canvas.width = 940;
    canvas.height = 600;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    /**
     * @memberof PaintTheBox
     * @member FRAMES
     * @type int
     * @desc intervall (microseconds) to update the player´s position
     */
    var FRAMES = 10;

    /**
     * @memberof PaintTheBox
     * @member x_start
     * @type int
     * @desc x coordinate to start for the first player
     */
    var x_start = 50;

    /**
     * @memberof PaintTheBox
     * @member y_start
     * @type int
     * @desc y coordinate to start for the first player
     */
    var y_start = 50;

    /**
     * @memberof PaintTheBox
     * @member intervalls
     * @type Array
     * @desc store all the intervalls
     */
    var intervalls = new Array();

    /**
     * @memberof PaintTheBox
     * @member playerCount
     * @type int
     * @desc cache count player. immutable during a game session
     */
    var playerCount = $playerPins.length;

    /**
     * @memberof PaintTheBox
     * @member playerPositions
     * @type Array
     * @desc array to store all playerrrrrr - each player is represented with an array with the index x, y and color. here
     * we could also store the usernames?
     */
    var playerPositions = Array();

    /**
     * @memberof PaintTheBox
     * @member colors_i
     * @type int
     * @desc index for the colors array for each color
     */
    var colors_i = -1;

    /**
     * @memberof PaintTheBox
     * @member colors
     * @type Array
     * @desc different colors for differend player
     */
    var colors = new Array();
    colors[colors_i++] ='F0F8FF';
    colors[colors_i++] ='ff0000';
    colors[colors_i++] ='DC143C';
    colors[colors_i++] ='00FFFF';
    colors[colors_i++] ='FAEBD7';
    colors[colors_i++] ='7FFFD4';
    colors[colors_i++] ='F0FFFF';
    colors[colors_i++] ='F5F5DC';
    colors[colors_i++] ='FFE4C4';
    colors[colors_i++] ='000000';
    colors[colors_i++] ='FFEBCD';
    colors[colors_i++] ='0000FF';
    colors[colors_i++] ='8A2BE2';
    colors[colors_i++] ='A52A2A';
    colors[colors_i++] ='DEB887';
    colors[colors_i++] ='5F9EA0';
    colors[colors_i++] ='7FFF00';
    colors[colors_i++] ='D2691E';
    colors[colors_i++] ='FF7F50';
    colors[colors_i++] ='6495ED';
    colors[colors_i++] ='FFF8DC';
    colors[colors_i++] ='00FFFF';
    colors[colors_i++] ='00008B';
    colors[colors_i++] ='008B8B';
    colors[colors_i++] ='B8860B';
    colors[colors_i++] ='A9A9A9';
    colors[colors_i++] ='A9A9A9';
    colors[colors_i++] ='006400';
    colors[colors_i++] ='BDB76B';
    colors[colors_i++] ='8B008B';
    colors[colors_i++] ='556B2F';
    colors[colors_i++] ='FF8C00';

    //initialize each player
    for(i = 0; i < playerCount; i++){

        playerPositions[$playerPins[i]] = new Array();
        playerPositions[$playerPins[i]]['x'] = x_start;
        playerPositions[$playerPins[i]]['y'] = y_start;
        playerPositions[$playerPins[i]]['color'] = colors[i];

        x_start += 50;
        y_start += 50;
    }


    //scroll down to view the game
    $('html, body').animate({
        scrollTop: $("#canvas").offset().top
    }, 2000);


    /**
     * @memberof PaintTheBox
     * @function draw
     *
     * @desc main "game" loop do update the positions of the players
     */
    function draw() {
        /*
         * always draw every player
         * if the position of a particular player was changed from the web-sockets,
         * a new poision is filled with color
         */
        for(i = 0; i < playerCount; i++){
            ctx.beginPath();
            ctx.rect(playerPositions[$playerPins[i]]['x'], playerPositions[$playerPins[i]]['y'], 1, 1);
            ctx.fillStyle = playerPositions[$playerPins[i]]['color'];
            ctx.fill();
        }
    }

    /**
     * @memberof PaintTheBox
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
            //here, wo do not have any intervall for this user (user.pin)
            switch(user.keycode){
                    case 'up':
                           intervalls[user.pin] = new Array();
                           intervalls[user.pin] = window.setInterval(function(){playerPositions[user.pin]['y']-=1},FRAMES)
                           break;

                    case 'down':
                            intervalls[user.pin] = new Array();
                            intervalls[user.pin] = window.setInterval(function(){playerPositions[user.pin]['y']+=1},FRAMES)
                            break;

                    case 'left':
                            intervalls[user.pin] = new Array();
                            intervalls[user.pin] = window.setInterval(function(){playerPositions[user.pin]['x']-=1},FRAMES)
                            break;

                    case 'right':
                            intervalls[user.pin] = new Array();
                            intervalls[user.pin] = window.setInterval(function(){playerPositions[user.pin]['x']+=1},FRAMES)
                            break;

                    default: console.log('Unkown key command');
            }// end switch keycode
        }// end else
    });// end websocket on message

    //our main game loop
    setInterval(draw, FRAMES);

}), 2000);//end setTimeout