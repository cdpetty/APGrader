/* Evaluate and run programs */
//Modules


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
