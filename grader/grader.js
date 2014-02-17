/* Evaluate and run programs */
//Modules
var fs = require('fs'),
    exec = require('child_process').exec;

module.exports.save = function(file, callback){
    fs.readFile(file.path, function(err, data){
    if (err) callback(err)
    else console.log("Successful reading of file from user");
    fs.writeFile('/tmp/' + file.name, data, function(err){
      if (err) callback(err);
      else callback(err, file);
    });
  });
}

module.exports.run = function(filename, callback){
  var rfilename = filename.substring(0, filename.indexOf("."));
  console.log("rfilename", rfilename, "normal filename:", filename);
  exec('javac /tmp/' + filename, function(err, stdout, stderr){
    if(err) callback(err);
    else{
      exec('java -cp /tmp ' + rfilename, function(err, stdout, stderr){
        if (err) callback(err);
        else callback(err, stdout, stderr);
      });
    }
  });
}
