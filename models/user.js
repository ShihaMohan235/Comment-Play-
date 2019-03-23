
/* ===================
   Import Node Modules
=================== */
const mongoose = require('mongoose'); // Node Tool for MongoDB
mongoose.Promise = global.Promise; // Configure Mongoose Promises
const Schema = mongoose.Schema; // Import Schema from Mongoose
//const bcrypt = require('bcrypt-nodejs'); // A native JS bcrypt library for NodeJS

// User Model Definition
const userSchema = new Schema({
  email: { type: String, required: true, unique: true, lowercase: true },
  user: { type: String, required: true, unique: true, lowercase: true},
  userId: {type: Number, required: true},
  token: {type:String, required:true}
});

// Export Module/Schema
module.exports = mongoose.model('User', userSchema);