var io = require('socket.io').listen(8081);

io.sockets.on('connection', function (socket) {
  socket.on('update', function (data) {
  	console.log(data);
    io.sockets.emit('update', { data: data });	  
  });
});