var fs = require('fs');

/*modules.save takes 2 params with an required callback
 * @file is the file object
 * @dirname is the folder destination for the file
 * The callback is executed on completion with params err, @file
 * if no error, err is will be null
 */
module.exports.save = function(file, dirname, callback){
  fs.readFile(file.path, function(err, data){
    if (err) callback(err)
    else { 
      fs.writeFile(dirname + '/' + file.name, data, function(err){
        if (err) callback(err);
        else callback(err, file);
      });
    }
  });
}

/* modules.createDir takes 2 params with a required callback
 * @dirpath is the directory path the new directory will be located in
 * @dirname is the intended new directory name
 * The callback is executed on completion with params err
 * if no error, err will be null
 */
module.exports.createDir = function(dirpath, dirname, callback){
  var folder_path = dirpath + '/' + dirname;
  console.log('Folder path:', folder_path);
  if (folder_path.indexOf('//') === -1) callback('The intended has too many "/": ' + folder_path);
  else{
    fs.mkdir(folder_path, function(err){
      if (err) callback(err);
      else callback();
    });
  }
};
