/* Evaluate and run programs */
//Modules
var exec = require('child_process').exec,
  path = require('path');

module.exports.execute = function(filename, dirname, callback){
  var folder_path = path.join(__dirname, '../storage/' + dirname)
  var type = getLanguage(filename);
  if (type === 'python') executePython(folder_path, filename, callback);
  else if (type === 'java') executeJava(folder_path, filename, callback);
  else if (type === 'cpp') executeCPlusPlus(folder_path, filename, callback);
};  

function diff (err, stdout, stderr, folder_path, callback){
  fs.writeFile(folder_path, data, function(err){
    if (err) callback(err);
    else callback(err, file);
  });
}

function getLanguage(filename){
  filename_split = filename.split('.');
  if (filename_split.length === 1 || filename_split[1] === 'py') return 'python';
  else if (filename_split[1] === 'java') return 'java';
  else if (filename_split[1] === 'cpp') return 'cpp';
}

function executeJava(folder_path, filename, callback){
  var compile_command = 'javac ' + folder_path + '/' + filename;
  exec(compile_command, function(err, stdout, stderr){
    if(err) callback(err);
    else{
      var rfilename = filename.substring(0, filename.indexOf("."));
      var run_command = 'java -cp ' + path.join(folder_path, rfilename) + ' > ';
      exec(run_command, function(err, stdout, stderr){
        if (err) callback(err);
        else diff(err, stdout, stderr, folder_path, callback);
      });
    }
  });
};

function executePython(folder_path, filename, callback){
  var run_command = 'python ' + folder_path + '/' + filename;
  exec(run_command, function(err, stdout, stderr){
    if (err) callback(err);
    else diff(err, stdout, stderr, folder_path, callback);
}

function executeCPlusPlus(folder_path, filename, callback){
  var compile_command = 'g++ ' + folder_path + '/' + filename + ' -o ' + folder_path + '/a.out';
  exec(compile_command, function(err, stdout, stderr){
    if(err) callback(err);
    else{
      var run_command = folder_path + '/./a.out';
      exec(run_command, function(err, stdout, stderr){
        if (err) callback(err);
        else diff(err, stdout, stderr, folder_path, callback);
      });
    }
  });
}
