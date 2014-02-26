var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  Mixed = Schema.Types.Mixed;

//Define submissions by user schema and model
var submissionsByUserSchema = Schema({
  submissions: Mixed
});
var submissionsByUser = mongoose.model('submissionsByUser', submissionsByUserSchema);

module.exports = submissionsByUser;