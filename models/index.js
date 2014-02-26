var models = ['labs', 'submissions', 'submissionsByUser', 'users']

models.forEach( function (model) {
  var modelImport = require(path.join(__dirname, model));
  module.exports[model] = modelImport;
});