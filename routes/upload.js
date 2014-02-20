var grader = require('../modules/grader'),
    util = require('../modules/utilities');

module.exports = function(req,res){
  if (req.files.file){
    var new__dirname = __dirname.substring(0, __dirname.lastIndexOf('/'));
    var folder_path = new__dirname + '/storage/' + req.session.dirname; 
    util.save(req.files.file, folder_path, function(err, saved){
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
