var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = new Schema({
  username: String,
  password: String,
  first: String,
  last: String,
  dirname: String,
  grade_level: Number,
  period: Number,
  teacher: Number
});
var users = mongoose.model('users', userSchema);