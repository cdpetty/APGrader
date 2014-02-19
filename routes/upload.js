var grader = require('../modules/grader'),
    util = require('../modules/utilities');

module.exports = function(req,res){
  if (req.files.file){
    util.save(req.files.file, req.session.dirname, function(err, saved){
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