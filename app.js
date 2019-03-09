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

  socket.on('message', function (data) {
    io.emit('message', {msg: data});
  });

});


server.listen(port);
