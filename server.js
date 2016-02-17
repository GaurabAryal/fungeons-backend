
var config = require('./config');

var express = require('express');
var app = require('express')();
var server = require('http').Server(app);

var io = require('socket.io')(server);

console.log("Trying to start server with config:", config.serverip + ":" + config.serverport);

server.listen(config.serverport, config.serverip, function() {
  console.log("Server running @ http://" + config.serverip + ":" + config.serverport);
});

app.use(express.static(__dirname + '/'));
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/api/config', function(req, res) {
  res.send('var config = ' + JSON.stringify(config));
});

io.on('connection', function (socket) {
  socket.emit('hello', { greeting: 'Hi socket ' + socket.id + ' this is Server speaking! Let\'s play ping-pong. You pass!' });

  socket.on('ping', function (data) {
    console.log("received ping from client: ", data);
    socket.emit('pong', { id: data.id });
  });
});
