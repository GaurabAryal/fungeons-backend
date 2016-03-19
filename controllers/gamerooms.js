var User          = require('../models/user');
var GameRoom          = require('../models/gameroom');

module.exports = function(apiRoutes, io){
 apiRoutes.post('/gamerooms', function(req, res){
     console.log(req.decoded._doc._id)
     var gameroom = new GameRoom({
         name: req.body.name,
         ownerId: req.decoded._doc._id,
         players: req.decoded._doc

     });
     gameroom.save(function(err, data){
        if (err){
            return res.send(err);
        }
        return res.status(200).json({data: data});
     });
 });

    apiRoutes.get('/gamerooms', function(req, res){
        GameRoom.find(function(err , data){
            if (err){
              return res.send(err);
            }
            return res.status(200).json(data);
        })
    });
};
