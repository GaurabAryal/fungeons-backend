
var config = require('./config');

var express = require('express');
var app = require('express')();
var server = require('http').Server(app, function (req, res) {
  var url = req.url;
  if (url == '/') {
    url += 'index.html';
  }

  // IMPORTANT: Your application HAS to respond to GET /health with status 200
  //            for OpenShift health monitoring

  if (url == '/health') {
    res.writeHead(200);
    res.end();
  } else if (url.indexOf('/info/') == 0) {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'no-cache, no-store');
    res.end(JSON.stringify(sysInfo[url.slice(6)]()));
  } else {
    fs.readFile('./static' + url, function (err, data) {
      if (err) {
        res.writeHead(404);
        res.end();
      } else {
        var ext = path.extname(url).slice(1);
        res.setHeader('Content-Type', contentTypes[ext]);
        if (ext === 'html') {
          res.setHeader('Cache-Control', 'no-cache, no-store');
        }
        res.end(data);
      }
    });
  }
});
var bodyParser = require('body-parser');
var io = require('socket.io')(server);
var mongoose = require("mongoose");
var jwt           = require('jsonwebtoken');
console.log("Trying to start server with config:", config.serverip + ":" + config.serverport);


server.listen(config.serverport, config.serverip, function() {
  console.log(config.mongodb);
  console.log("Server running @ http://" + config.serverip + ":" + config.serverport);
});
mongoose.connect(config.mongodb);
app.use(bodyParser());

var users = require("./controllers/users")(app, io);

var apiRoutes = express.Router();

apiRoutes.use(function(req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  console.log(token);
  // decode token
  if (token) {

    // verifies secret and checks if it expired
    jwt.verify(token, config.secret, function(err, decoded) {
      if (err) {
        return res.status(403).json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({
        success: false,
        message: 'No token provided.'
    });

  }
});

var gamerooms = require("./controllers/gamerooms")(apiRoutes, io);


// apply the routes to our application with the prefix /api
app.use('/api', apiRoutes);
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
