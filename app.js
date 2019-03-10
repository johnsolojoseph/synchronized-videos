const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);


//Port for localhost or production
const port =  process.env.PORT || 5000;

//Serve user static files
app.use(express.static(__dirname + '/public/'));

//Socket.io Handler
io.on('connection', function(socket) {

  socket.on('state', function (data) {
    io.emit('state', data);
  });

  socket.on('progress', function (data) {
    io.emit('progress', data);
  });

  socket.on('video', function (data) {
    io.emit('video', data);
  });

});


server.listen(port);
