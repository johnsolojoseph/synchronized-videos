const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);


//Port for localhost or production
const port = 5000 || process.env.PORT;

//Serve user static files
app.use(express.static('public'));

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
