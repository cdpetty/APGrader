var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

//Define labs schema and model
var labsSchema = Schema({
  name: String,
  runner_name: String,
  date: String,
  correct: false
});
var labs = mongoose.model('labs', labsSchema);

module.exports = labs;