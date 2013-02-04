
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
    $('#main').append('\
    <span id="conns"></span> <span id="result"></span>\
                                                             \
<div id="pong">\
<ul id="pong_li"></ul></div>                                         \
        \
    ');

    /**
     * @memberof Benchmark
     * @member playerPositions
     * @type Array
     * @desc store the last benchmark result
     */
    var playerPositions = Array();

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
    var $playerPins = Array();
    $playerPins[0] = 'asdf';
    var playerCount = $playerPins.length;

    //initialize each player
    for(i = 0; i < playerCount; i++){
        playerPositions[$playerPins[i]] = new Array();
        playerPositions[$playerPins[i]]['bench'] = 0;
    }


    //scroll down to view the game
    $('html, body').animate({
        scrollTop: $("#pong").offset().top
    }, 2000);

    var $el = $('stage');

    /**
     * @memberof Benchmark
     * @function draw
     *
     * @desc main "game" loop do update the positions of the players

    function draw() {

        for(i = 0; i < playerCount; i++){
            $el.html(playerPositions[$playerPins[i]]['bench']);
        }
    }
     */

    var $window = window;

    var ws_message_times = new Array();

    var date2 =  new Date().getTime();
    var json = '';
    $webSocketModel.on('sendCommandToGame', function(json){ // TODO move to central event handler

        if(json.keycode == 'plus_one'){
            connections++;
            updateConns();
        }
        else if(json.keycode == 'minus_one'){


            $window.clearInterval(benchs[connections-1]['intervall']);

            $('#pong_bench_'+connections).remove();

            benchs.remove(connections-1);
            ws_message_times.remove(connections-1);

            connections--;
            setTimeout(function(){
                updateConns();
            }, 100);
        }
    });

// Array Remove - By John Resig (MIT Licensed)
Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};


    $webSocketModel.on('pong', function(json){ // TODO move to central event handler

        //console.log(json)
        date2 =  new Date().getTime();
        //console.log('#pong_bench_' + json.data.i + '');
        var duration = date2 - json.data.time
        ws_message_times[json.data.i] = duration;
        $('#pong_bench_' + (json.data.i) + '').html(duration);
    });


    var benchs = Array();

    var connections = 0;



    //calculate the ~ time / we message once per second
    window.setInterval(function(){

        var sum = 0;

        for(k = 0; k < ws_message_times.length; k++){
            sum += ws_message_times[k];
        }
        if(sum > 0){
            $('#result').html(' ~= ' +Math.round(((sum / connections*100)/100 )) + 'ms / per message');
        }
        else{
            $('#result').html('');
        }


    },1000);

    function updateConns(){

        console.log('upd conns');

        if(connections == 0){
            $('#conns').html('please add messages with the controller');
        }
        else{
            $('#conns').html(connections * 10 + ' WS message / second');
        }

        $('#pong_li').html('');
        for(i = 0; i < connections; i++){

            var $j = i;

            if(benchs[i] != undefined){

            }
            else{
                benchs[i] = new Array();


                benchs[i]['intervall'] =  $window.setInterval(function(){

                    var date1 =  new Date().getTime();
                    $webSocketModel.send({
                        type : 'ping',
                        data : {
                            i: $j,
                            time : date1
                        }});

                },100);
                console.log('new for ' + $j);
            }
            //first, erase all intervalls


            $('#pong_li').append('<li id="pong_bench_'+i+'"></li>');
        }
    }



}), 2000);//end setTimeout