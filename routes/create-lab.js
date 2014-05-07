var labs = require('../models/labs'),
  util = require('../modules/utilities'),
  path = require('path');

module.exports = function(req, res) {
  if (req.body.lab_name && req.files.output){
    var dirpath = path.join(__dirname, '/../labs');
    var labName = req.body.lab_name;
    
    //create database entryr
    var new_lab = new labs();
    new_lab.name = labName;
    new_lab.date = new Date();
    if(req.files.runner) new_lab.runner_name = req.files.runner.name;
    
    new_lab.save(function(err, saved){
      if (err) res.send(err);
      //Create actual files and folders
      util.createDir(dirpath, labName, function(err){
        if (err) res.send(err);
        else{
          if (req.files.runner){
            var new_dirpath = path.join(dirpath, labName);
            util.save(req.files.output, new_dirpath, labName + '.out', function(err){
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
    });
  }
  else res.render('create_lab', {name: req.session.name, admin: req.session.admin});
};