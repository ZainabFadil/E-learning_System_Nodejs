const mongoose = require("mongoose");

// Define a mongoose schema for your user
const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    name: String
});
  
  // Create a mongoose model

const users = mongoose.model('User', userSchema);
module.exports = users;
