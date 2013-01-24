setTimeout((function(){


$('#main').append('<br /><br /> \
    <canvas id="canvas"></canvas>\
\
\
');

    var x_start = 50;
    var y_start = 50;
    var x = 'x';
    var y = 'y';

var playerCount = $playerPins.length;
var colors_i = 0;    
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

    console.log(colors);
    console.log(colors[0]);
    
var playerPositions = Array();
    var color_i = 0;
    var color_i_max = colors.length-1;
for(i = 0; i < playerCount; i++){
    if(color_i > color_i_max){
        color_i = 0;
    }
    else{
        color_i = i;
    }

    playerPositions[$playerPins[i]] = new Array();
    playerPositions[$playerPins[i]]['x'] = x_start;
    playerPositions[$playerPins[i]]['y'] = y_start;
    playerPositions[$playerPins[i]]['color'] = colors[color_i];

    x_start += x_start;
    y_start += y_start;
}
//init the start positions

    console.log(playerPositions);

var canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d"),
    painting = false,
    lastX = 0,
    lastY = 0,
    lineThickness = 1;




canvas.width = 940;
canvas.height = 600;
ctx.fillRect(0, 0, canvas.width, canvas.height);

$('html, body').animate({
    scrollTop: $("#canvas").offset().top
}, 2000);



    var FRAMES = 10;

    function drawLine(){
        for(i = 0; i < playerCount; i++){
            ctx.fillRect(playerPositions[$playerPins[i]]['x'], playerPositions[$playerPins[i]]['y'], 1 , 1 );
        }
    }



    var i = 10;
function draw() {
    //ctx.clearRect(0, 0, canvas.width, canvas.height);
    //ctx.fillRect(0, 0, 600, 600);

    for(i = 0; i < playerCount; i++){
        ctx.beginPath();
        ctx.rect(playerPositions[$playerPins[i]]['x'], playerPositions[$playerPins[i]]['y'], 1, 1);
        ctx.fillStyle = playerPositions[$playerPins[i]]['color'];
        ctx.fill();
    }


    //ctx.lineWidth = 7;
    //ctx.strokeStyle = 'yellow';
    //ctx.stroke();

}

var intervalls = new Array();



$webSocketModel.on('sendCommandToGame', function(json){ // TODO move to central event handler

    console.log(json);

    if(intervalls[json.pin] != undefined || intervalls[json.pin] != null){
        console.log('clear');
        window.clearInterval(intervalls[json.pin]);
        intervalls[json.pin] = null;
    }
    else{
        switch(json.keycode){
           		case 'up':
                       intervalls[json.pin] = new Array();
                       intervalls[json.pin] = window.setInterval(function(){playerPositions[json.pin]['y']-=1},FRAMES)
           			   break;
           		case 'down':
                        intervalls[json.pin] = new Array();
                        intervalls[json.pin] = window.setInterval(function(){playerPositions[json.pin]['y']+=1},FRAMES)
           				break;
           		case 'left':
                        intervalls[json.pin] = new Array();
                        intervalls[json.pin] = window.setInterval(function(){playerPositions[json.pin]['x']-=1},FRAMES)
           				break;
           		case 'right':
                        intervalls[json.pin] = new Array();
                        intervalls[json.pin] = window.setInterval(function(){playerPositions[json.pin]['x']+=1},FRAMES)
           				break;
           		default: console.log('Unkown key command');
    }
    }

});

    setInterval(draw, 10);

}), 2000);