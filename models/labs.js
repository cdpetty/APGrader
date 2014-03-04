var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

//Define labs schema and model
var labsSchema = Schema({
  dirname: String,
  name: String,
  runner_name: String
});
var labs = mongoose.model('labs', labsSchema);

module.exports = labs;