var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

//Define labs schema and model
var periodsSchema = Schema({
  number: Number,
  array: [Number]
});
var periods = mongoose.model('periods', periodsSchema);

module.exports = periods;