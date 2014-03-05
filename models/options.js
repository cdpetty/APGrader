var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

//Define labs schema and model
var optionsSchema = Schema({
  teachers: [String],
  numClassPeriods: Number,
  classes: [String]
});
var options = mongoose.model('labs', optionsSchema);

module.exports = options;