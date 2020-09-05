const express = require('express')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient;
const path = require('path')
const http = require('http')
const app = express()
var mongoose = require('mongoose')
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/awesome', { useMongoClient: true });


//Parsers
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}));


//Allow CROS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});


//API file for interacting with MongoDB
const api = require('./server/routes/api')

//API location
app.use('/', api);


//set port
const port = process.env.PORT || '3000';
app.set('port', port);
app.listen(port, () => console.log(`Running on localhost: ${port}`));