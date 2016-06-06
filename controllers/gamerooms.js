var User      = require('../models/user');
var GameRoom  = require('../models/gameroom');

module.exports = function(apiRoutes, io){

/**
* Posts a gameroom
**/
 apiRoutes.post('/gamerooms', function(req, res){
     var gameroom = new GameRoom({
         name: req.body.name,
         ownerId: req.decoded._doc._id,
         players: req.decoded._doc,
         map: parseInt(req.body.map),
         isJoinable: req.body.isJoinable
     });

     gameroom.save(function(err, data){
        if (err){
            return res.send(err);
        }
        // When there is a new gameroom, emit it.
        io.on('connection', function (socket) {
          socket.emit('New Room', { gameroom: data});
        });
        return res.status(200).json({data: data});
     });
 });

 /**
 * Fetches all gamerooms. Need to build so that it only fetches gamerooms
 * with players less than 4
 **/
  apiRoutes.get('/gamerooms', function(req, res){
      GameRoom.find(function(err , data){
          if (err){
            return res.send(err);
          }
          return res.status(200).json(data);
      });
  });

  /**
  * Get a specific gameroom
  **/
  apiRoutes.get('/gamerooms/:id', function(req, res){
      //This means that a player has joined the gameroom. Which
      // warrants a subscription
      io.on('connection', function (socket) {
         socket.join(req.params.id);
      });
      GameRoom.find( { _id: req.params.id } , function(err , data){
          if (err){
            return res.send(err);
          }
          return res.status(200).json(data);
      });
  });

  /**
  * This part deals with messages in gamerooms.
  **/
  io.on('connection', function (socket) {
    socket.on('Message', function (id, data) {
      socket.broadcast.to(id).emit('Message', { player: data.playerName, message: data.message});
    });
  });
};
