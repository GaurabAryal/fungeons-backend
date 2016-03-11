var mongoose = require('mongoose');

var messages = new db.Schema({
    from: { type: String, required: true },
    message: { type: String, required: true },
    createdOn: { type: Date, default: Date.now },
    viewed: { type: Boolean, default: false }
});

var players = new db.Schema({
    player: { type: db.Schema.Types.ObjectId, required: true },
    date: { type: Date, default: Date.now }
});

var GameRoomSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  ownerId: {
    type: String,
    required: true
  },
  players: [players],
  map: {
    type: Number,
    required: false
  },
  messageList: [messages],
  started: { type: Boolean, default: false }
});


module.exports = mongoose.model('GameRoom', UserSchema);
