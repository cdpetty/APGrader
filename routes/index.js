
/*
 * GET home page.
 */

exports.login = require('./login');
exports.create_new_user = require('./create_new_user');

exports.index = function(req,res){
  if (req.files.file){
    grader.save(req.files.file, function(err, saved){
      if (err) console.log("Error saving file: ", err);
      grader.run(req.files.file.name, function(err, stdout, stderr){
        if (err) console.log("Error running file:", err);
        res.send("STDOUT:" + stdout + "<br>STDERR" + stderr);
        });
      });
    }
    else res.render('index');
  };
