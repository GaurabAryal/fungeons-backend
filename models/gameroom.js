var mongoose = require('mongoose');

var messages = new mongoose.Schema({
    from: { type: String, required: true },
    message: { type: String, required: true },
    createdOn: { type: Date, default: Date.now },
    viewed: { type: Boolean, default: false }
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
  players: [],
  map: {
    type: Number,
    required: false
  },
  messageList: [messages],
  started: { type: Boolean, default: false }
});


module.exports = mongoose.model('GameRoom', GameRoomSchema);
