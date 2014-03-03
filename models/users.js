var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  ObjectId = Schema.Types.ObjectId,
  Mixed = Schema.Types.Mixed;

//Define User Schema and model
var userSchema = new Schema({
  username: String,
  password: String,
  first: String,
  last: String,
  dirname: String,
  grade_level: Number,
  class: String,
  period: Number,
  teacher: String,
  submissions: Mixed
});
var users = mongoose.model('users', userSchema);

module.exports = users;