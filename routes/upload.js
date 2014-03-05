var grader = require('../modules/grader'),
  util = require('../modules/utilities'),
  path = require('path'),
  db = require('../models');

module.exports = function(req,res){
  if (req.files.file && req.body.lab_name){
    var folder_path = path.join(__dirname, '../storage/' + req.session.dirname);
    
    util.save(req.files.file, folder_path, req.files.file.name, function(err, saved){
      if (err) console.log("Error saving file: ", err);
      else{
        grader.execute(req.files.file.name, req.session.dirname,  function(err, stdout, stderr){
          if (err) console.log("Error running file:", err);
          else{
            labs.findOne({name:req.body.lab_name}, function(err, found){
              if (err) res.send(err);
              else{
                //GET MOSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS
                
                res.send("STDOUT:" + stdout + "<br>STDERR" + stderr);
              }
            });
          }
        });
      }
    });
  }
  else{
    db.labs.find({}, function(err, found){
      res.render('upload', {labs: found});
    });
  }
};
