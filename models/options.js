var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

//Define labs schema and model
var optionsSchema = Schema({
  teachers: [String],
  numClassPeriods: Number,
  classes: [String]
});
var options = mongoose.model('options', optionsSchema);

module.exports = options;