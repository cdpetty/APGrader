/* Evaluate and run programs */
module.exports.save = function(file, callback){
  var cfilename = file.name
  var rfilename = cfilename.substring(0, cfilename.indexOf("."));
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
  exec('javac /tmp/' + filename, function(err, stdout, stderr){
    if(err) callback(err);
    else{
      exec('java -cp /tmp ' + filename, function(err, stdout, stderr){
        if (err) callback(err);
        else callback(err, stdout, stderr);
      });
    }
  });
}
