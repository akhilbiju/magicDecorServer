var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// create a schema for repo
var repoSchema = new Schema({
  name: String,
  favorite: Boolean,
  layout: String,
  path: String,
  objects: Object
});

// we need to create a model using it
var Repo = mongoose.model('Repo', repoSchema);

// make this available to our users in our Node applications
module.exports = Repo;