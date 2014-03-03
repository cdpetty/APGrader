var labs = require('../models/labs'),
  util = require('../modules/utilities'),
  path = require('path');

module.exports = function(req, res) {
  if (req.body.lab_name && req.files.output){
    var dirpath = path.join(__dirname, '..');
    var dirname = req.body.lab_name;
  }
  else res.render('create_lab');
};