var fs = require('fs'),
  databaseUrl = "AP_DB",
  collections = ["users"],
  db = require("mongojs").connect(databaseUrl, collections);


module.exports.save = function(file, user, callback){
  
  fs.readFile(file.path, function(err, data){
    if (err) callback(err)
    else console.log("Successful reading of file from user");
    fs.writeFile('/tmp/' + file.name, data, function(err){
      if (err) callback(err);
      else callback(err, file);
    });
  });
}

module.exports.createDir = function(name, callback){
  fs.
};
