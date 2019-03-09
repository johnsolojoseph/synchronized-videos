//Initialize all Materialize JavaScript
M.AutoInit();

var socket = io.connect('http://localhost:5000');

socket.on('message', function(data) {
  console.log(data.msg);
  document.getElementById('global').innerHTML = data.msg;

});

function msgHandler(data) {
  console.log(data);
  socket.emit('message', data);
}
