var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  ObjectId = Schema.Types.ObjectId,
  Mixed = Schema.Types.Mixed;

//Define submissions schema and model
var submissionsSchema = Schema({
  stdout: String,
  stderr: String,
  lab_id: ObjectId,
  date: Date,
  MOS: Mixed,
  labname: String,
  filename: String,
  user: ObjectId,
  attempt: Number
});
var submissions = mongoose.model('submissions', submissionsSchema);

module.exports = submissions;