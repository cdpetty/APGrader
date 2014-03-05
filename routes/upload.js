var grader = require('../modules/grader'),
  util = require('../modules/utilities'),
  path = require('path'),
  db = require('../models');

module.exports = function(req,res){
  //console.log("file:", req.files.file, "labname:", req.body.lab_name);
  if (req.files.file && req.body.lab_name != ""){
    console.log("START");
    var folder_path = path.join(__dirname, '../storage/' + req.session.dirname);
    
    util.save(req.files.file, folder_path, req.files.file.name, function(err, saved){
      if (err) console.log("Error saving file: ", err);
      else{
        console.log("1");
        grader.execute(req.files.file.name, req.session.dirname,  function(err, stdout, stderr){
          if (err) console.log("Error running file:", err);
          else{
            console.log("2");
            db.labs.findOne({name:req.body.lab_name}, function(err, foundLab){
              if (err) res.send(err);
              else{
                console.log("3");
                //GET MOSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS
                db.submissions.findOne({name: req.body.lab_name, user: req.session._id}, function(err, foundSubmission){
                  if (err) res.send(err);
                  else if (foundSubmission){
                    console.log("4");
                    db.submissions.update({name: req.body.lab_name, user: req.session._id}, {attempt: foundSubmission.attempt + 1}, function(err, updated){
                      if (err) res.send(err);
                      else res.send("Submission updated: <br>" + "STDOUT:" + stdout + "<br>STDERR:" + stderr);
                    });
                  }
                  else{
                    console.log("5");
                    new_lab_submission = new db.submissions();
                    new_lab_submission.name = req.body.lab_name;
                    new_lab_submission.stdout = stdout;
                    new_lab_submission.stderr = stderr;
                    new_lab_submission.filename = req.files.file.name;
                    new_lab_submission.user = req.session.user_id;
                    new_lab_submission.date = new Date();
                    new_lab_submission.lab_id = foundLab._id;
                    new_lab_submission.MOS = "";
                    new_lab_submission.attempt = 1;
                    new_lab_submission.save(function(err,saved){
                      if (err) res.send(err);
                      else res.send("Submission saved: <br> STDOUT:" + stdout + "<br>STDERR:" + stderr);
                    });
                  }
                });
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
