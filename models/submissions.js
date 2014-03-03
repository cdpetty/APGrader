var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  ObjectId = Schema.Types.ObjectId,
  Mixed = Schema.Types.Mixed;

//Define submissions schema and model
var submissionsSchema = Schema({
  output: String,
  lab_id: ObjectId,
  date: Date,
  MOS: Mixed
});
var submissions = mongoose.model('submissions', submissionSchema);

module.exports = submissions;