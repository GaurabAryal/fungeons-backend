
var config       = require('./config');
var fs           = require('fs');
var path         = require('path');
var express      = require('express');
var env          = process.env;
var redis        = require('socket.io-redis');
var app          = require('express')();
var server       = require('http').Server(app);
var bodyParser   = require('body-parser');
var io           = require('socket.io')(server);
var mongoose     = require("mongoose");
var jwt          = require('jsonwebtoken');

console.log("Trying to start server with config:", config.serverip + ":" + config.serverport);
server.listen(config.serverport, config.serverip, function() {
  console.log("Server running @ http://" + config.serverip + ":" + config.serverport);
});

mongoose.connect(config.mongodb);
app.use(bodyParser());
//ONLY use redis when deployed.

var users = require("./controllers/users")(app, io);

var apiRoutes = express.Router();
/**
*APIRoutes requires a token so anything fallen under here requires
*a JWT token
**/
apiRoutes.use(function(req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
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
