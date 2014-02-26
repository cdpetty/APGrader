var mongoose = require('mongoose');

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
  teacher: Number,
  labSubmissions: ObjectId
});
var users = mongoose.model('users', userSchema);

var submissionsSchema = Schema({
  submissions: [ObjectId]
});

var submissions = mongoose.model('submissions', submissionSchema);

var labsSchema = Schema({
  
});