var labs = require('../models/labs'),
  util = require('../modules/utilities'),
  path = require('path');

module.exports = function(req, res) {
  if (req.body.lab_name && req.files.output){
    var dirpath = path.join(__dirname, '/../labs');
    var dirname = req.body.lab_name;
    util.createDir(dirpath, dirname, function(err){
      if (err) res.send(err);
      else{
        if (req.files.runner){
          var new_dirpath = path.join(dirpath, dirname);
          util.save(req.files.output, new_dirpath, dirname + '.out', function(err){
            if (err) res.send("Error saving output file: " + err);
            util.save(req.files.runner, new_dirpath, req.files.runner.name, function(err){
              if (err) res.send("Error saving runner file: " + err);
              else {
                res.send("Successfully uploaded lab files");
              }
            });
          });
        }
      }
    });
  }
  else res.render('create_lab');
};