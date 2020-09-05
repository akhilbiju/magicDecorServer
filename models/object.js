var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// create a schema for object
var objectSchema = new Schema({
  name: String,
  layout: String,
  path: String,
  layouts: Object
});

// we need to create a model using it
var object = mongoose.model('Object', objectSchema);

// make this available to our users in our Node applications
module.exports = object;