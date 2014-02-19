/* Evaluate and run programs */
//Modules
var exec = require('child_process').exec;

module.exports.execute = function(filename, dirname, callback){
  var new__dirname = __dirname.substring(0, __dirname.lastIndexOf('/'));
  var folder_path = new__dirname + '/storage/' + dirname;
  var compile_command = 'javac ' + folder_path + '/' + filename;
  exec(compile_command, function(err, stdout, stderr){
    if(err) callback(err);
    else{
      var rfilename = filename.substring(0, filename.indexOf("."));
      var run_command = 'java -cp ' + folder_path + ' ' + rfilename;
      console.log('made it to here', rfilename);
      exec(run_command, function(err, stdout, stderr){
        if (err) callback(err);
        else callback(err, stdout, stderr);
      });
    }
  });
}
