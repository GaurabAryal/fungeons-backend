var User          = require('../models/user');
var User          = require('../models/gameroom');
var AuthService   = require('../services/auth');

module.exports = function(apiRoutes, io){
 apiRoutes.post('/gamerooms', function(req, res){
    res.send(req.decoded);
 });
};
