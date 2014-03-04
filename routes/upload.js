var grader = require('../modules/grader'),
  util = require('../modules/utilities'),
  path = require('path'),
  users = require('../models/users');

module.exports = function(req,res){
  if (req.files.file){
    var folder_path = path.join(__dirname, '../storage/' + req.session.dirname);
    util.save(req.files.file, folder_path, req.files.file.name, function(err, saved){
      if (err) console.log("Error saving file: ", err);
      else{
        console.log('Your file has been saved!');
        grader.execute(req.files.file.name, req.session.dirname,  function(err, stdout, stderr){
          if (err) console.log("Error running file:", err);
          res.send("STDOUT:" + stdout + "<br>STDERR" + stderr);
        });
      }
    });
  }
  else res.render('upload');
};
