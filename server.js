
var config = require('./config');

var express = require('express');
var app = require('express')();
var server = require('http').Server(app);
var bodyParser = require('body-parser');
var io = require('socket.io')(server);
var mongoose = require("mongoose");
console.log("Trying to start server with config:", config.serverip + ":" + config.serverport);


server.listen(config.serverport, config.serverip, function() {
  console.log(config.mongodb);
  console.log("Server running @ http://" + config.serverip + ":" + config.serverport);
});
mongoose.connect(config.mongodb);
app.use(bodyParser());

var users = require("./controllers/users")(app, io);

module.exports = app;
// app.get('/', function (req, res) {
//   res.json("Hii!!");
// });
// io.on('connection', function (socket) {
//   socket.emit('hello', { hello: 'Hi' });
//
//   socket.on('hi', function (data) {
//     console.log("received hi from client: ", data);
//     socket.emit('sup', { sup: 'What\'s Up?' });
//   });
// });
