var fs = require('fs');

module.exports.save = function(file, dirname, callback){
  fs.readFile(file.path, function(err, data){
    if (err) callback(err)
    else { 
      var new__dirname = __dirname.substring(0, __dirname.lastIndexOf('/'));
      var folder_path = new__dirname + '/storage/' + dirname + '/';
      fs.writeFile(folder_path + file.name, data, function(err){
        if (err) callback(err);
        else callback(err, file);
      });
    }
  });
}

module.exports.createDir = function(dirname, callback){
  var new__dirname = __dirname.substring(0, __dirname.lastIndexOf('/'));
  var folder_path = new__dirname + '/storage/' + dirname;
  console.log('Folder path:', folder_path);
  fs.mkdir(folder_path, function(err){
    if (err) callback(err);
    else callback();
  });
};
