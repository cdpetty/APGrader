var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

//Define labs schema and model
var classesSchema = Schema({
  name: [String]
});
var classes = mongoose.model('classes', classesSchema);

module.exports = classes;
