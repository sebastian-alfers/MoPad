
setTimeout((function(){
    /**
     * @author Sebastian Alfers
     *
     * @nameSpace Benchmark
     * @class Display benchmarks for each player
     *
     * @name Benchmark
     *
     */


    //we append the game container to the DOM
    $('#main').append('<br /><br /> \
        <div id="stage"></div>\
        \
    ');


    /**
     * @memberof Benchmark
     * @member intervalls
     * @type Array
     * @desc store all the intervalls
     */
    var intervalls = new Array();

    /**
     * @memberof Benchmark
     * @member playerCount
     * @type int
     * @desc cache count player. immutable during a game session
     */
    var playerCount = $playerPins.length;

    //initialize each player
    for(i = 0; i < playerCount; i++){
        playerPositions[$playerPins[i]] = new Array();
        playerPositions[$playerPins[i]]['bench'] = 0;
    }


    //scroll down to view the game
    $('html, body').animate({
        scrollTop: $("#stage").offset().top
    }, 2000);

    var $el = $('stage');

    /**
     * @memberof Benchmark
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
            $el.html(playerPositions[$playerPins[i]]['bench']);
        }
    }

    /**
     * @memberof Benchmark
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