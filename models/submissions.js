var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  ObjectId = Schema.Types.ObjectId,
  Mixed = Schema.Types.Mixed;

//Define submissions schema and model
var submissionsSchema = Schema({
  stdout: String,
  stderr: String,
  lab_id: ObjectId,
  date: String,
  MOS: Mixed,
  labname: String,
  filename: String,
  user: ObjectId,
  attempt: Number,
  correct: Boolean,
  first: String,
  last: String
});
var submissions = mongoose.model('submissions', submissionsSchema);

module.exports = submissions;