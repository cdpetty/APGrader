var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

//Define labs schema and model
var teachersSchema = Schema({
  teachers: [String]
});
var teachers = mongoose.model('teachers', teachersSchema);

module.exports = teachers;
