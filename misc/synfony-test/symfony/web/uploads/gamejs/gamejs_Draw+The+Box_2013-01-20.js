setTimeout((function(){


$('#main').append('<br /><br /> \
    <canvas id="canvas"></canvas>\
\
\
');

var $playerStatus = Array();



var canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d"),
    painting = false,
    lastX = 0,
    lastY = 0,
    lineThickness = 1;




canvas.width = canvas.height = 600;
ctx.fillRect(0, 0, 600, 600);

    var x = 50;
    var y = 50;

    var FRAMES = 10;

    function drawLine(){
        ctx.fillRect(x, y, 1 , 1 );
    }



    var i = 10;
function draw() {
    //ctx.clearRect(0, 0, canvas.width, canvas.height);
    //ctx.fillRect(0, 0, 600, 600);

    ctx.beginPath();
    ctx.rect(x, y, i, 1);
    ctx.fillStyle = 'yellow';
    ctx.fill();

    ctx.lineWidth = 7;
    ctx.strokeStyle = 'yellow';
    ctx.stroke();

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
                       intervalls[json.pin] = window.setInterval(function(){y-=1},FRAMES)
           			   break;
           		case 'down':
                        intervalls[json.pin] = new Array();
                        intervalls[json.pin] = window.setInterval(function(){y+=1},FRAMES)
           				break;
           		case 'left':
                        intervalls[json.pin] = new Array();
                        intervalls[json.pin] = window.setInterval(function(){x-=1},FRAMES)
           				break;
           		case 'right':
                        intervalls[json.pin] = new Array();
                        intervalls[json.pin] = window.setInterval(function(){x+=1},FRAMES)
           				break;
           		default: console.log('Unkown key command');
    }
    }

});

    setInterval(draw, 10);

}), 2000);