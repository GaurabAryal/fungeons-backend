var mongoose = require('mongoose');
//https://github.com/tutsplus/passport-mongo/blob/master/app.js
//https://medium.com/@aleicher/should-i-use-heroku-or-aws-3bfcd4706a36#.34ly93yj3
module.exports = mongoose.model('User',{
    username: String,
    password: String,
    email: String
});
