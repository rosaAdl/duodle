var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io').listen(http);


app.use(express.static('app'));


io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  socket.on('join room', function(newUser) {
    socket.join(newUser.room);
    console.log('user ' + newUser.name + ' joined the room ' + newUser.room);
  });
});


http.listen(process.env.PORT, function(){
  console.log('listening on *:' + process.env.PORT);
});
