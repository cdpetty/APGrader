var models = ['labs', 'submissions', 'users', 'classes', 'periods', 'teachers'],
  path = require('path');

models.forEach( function (model) {
  var modelImport = require(path.join(__dirname, model));
  module.exports[model] = modelImport;
});
