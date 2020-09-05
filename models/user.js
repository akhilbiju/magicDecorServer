var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var Schema = mongoose.Schema;

//  name scheme
var nameSchema = new Schema({
  first:String,
  last:String
},{ _id : false });

// create a schema for user
var userSchema = new Schema({
  name:nameSchema,
  method: String,
  role: String,
  local: {
      email: String,
      password: String
  },
  azure: {
      mid: String
  },
  collections: Object
});

userSchema.methods.isValidPassword = async function(pass) {
 try{
    return await bcrypt.compare(pass,this.local.password);
 }catch(error){
   throw new Error(error);
 }

};

// beforr every save, print this
userSchema.pre('save', async function (next) {
 try{
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(this.local.password,salt);
  this.local.password=hashedPassword;
  next();
 }catch(error){
   next(error);
 }
console.log("pre save called");
next();
});

// we need to create a model using it
var User = mongoose.model('User', userSchema);

// make this available to our users in our Node applications
module.exports = User;