var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// create a schema for layout
var layoutSchema = new Schema({
  name: String,
  category: String,
  thumbnail: String,
  sides: {
      front: String,
      back: String,
      top: String,
      bottom: String,
      left: String,
      right: String
  }
});

// we need to create a model using it
var Layout = mongoose.model('Layout', layoutSchema);

// make this available to our users in our Node applications
module.exports = Layout;