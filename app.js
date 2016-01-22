var express = require('express');
var bodyparser = require('body-parser');
var http = require('http');
var mongodb = require('mongodb');
var app = express();

//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;

// Connection URL. This is where your mongodb server is running.

// Use connect method to connect to the Server
MongoClient.connect(url, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    //HURRAY!! We are connected. :)
    console.log('Connection established to', url);

    // do some work here with the database.

    //Close connection
    db.close();
  }
});
