var express = require('express');
var bodyparser = require('body-parser');
var http = require('http');
var mongodb = require('mongodb');
var dbConfig = require('./db.js');
var mongoose = require('mongoose');
var passport = require('passport');
var app = express();
mongoose.connect(dbConfig.url);
