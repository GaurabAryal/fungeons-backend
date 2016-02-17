
var config = require('./config');

var express = require('express');
var app = require('express')();
var server = require('http').Server(app);

var io = require('socket.io')(server);

console.log("Trying to start server with config:", config.serverip + ":" + config.serverport);


server.listen(config.serverport, config.serverip, function() {
  console.log(config.mongodb);
  console.log("Server running @ http://" + config.serverip + ":" + config.serverport);
});

app.get('/', function (req, res) {
  res.json("Hii!!");
});
console.
io.on('connection', function (socket) {
  socket.emit('hello', { hello: 'Hi' });

  socket.on('hi', function (data) {
    console.log("received hi from client: ", data);
    socket.emit('sup', { sup: 'What\'s Up?' });
  });
});
