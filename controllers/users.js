var User          = require('../models/user');
var AuthService   = require('../services/auth');
var passport      = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var jwt           = require('jsonwebtoken');
var config        = require('../config');
var util          = require('util');

module.exports = function(app, io){
  // Use the passport package in our application
  app.use(passport.initialize());
  passport.use(new BasicStrategy(
    function(username, password, callback) {
      User.findOne({ username: username }, function (err, user) {
        if (err) { return callback(err); }

        // No user found with that username
        if (!user) { return callback(null, false); }

        // Make sure the password is correct
        user.verifyPassword(password, function(err, isMatch) {
          if (err) { return callback(err); }

          // Password did not match
          if (!isMatch) { return callback(null, false); }
          //Success
          var token = jwt.sign(user, config.secret, {
            expiresInMinutes: 360 // expires in 6 hours
          });
          console.log(token);
          return callback(null, token);
        });
      });
    }
  ));
  app.post('/register', function(req, res){
    console.log(req.body);
    var username = req.body.username, password = req.body.password;
    var user = new User({
      username: username,
      password: password
    });
    user.save(function(err) {
      if (err){
        return res.send(err);
      }
      res.status(200).json({ message: 'Successfully registered user, ' + username });
    });
  });
  app.get('/private', passport.authenticate('basic', { session: false }), function(req, res) {
    res.json(req.user);
  });
};
