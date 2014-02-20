var fs = require('fs'),
  util = require('../modules/utilities');

module.exports = function(req, res) {
  var new__dirname = __dirname.substring(0, __dirname.lastIndexOf('/'));
  var folder_path = new__dirname + '/user_files'; 
  if ( req.files.new_users ){
    util.save(req.files.new_users, folder_path, function(err, saved){
      if (err) console.log('Error saving file:', err);
      else{
        res.send('File saved');
      }
    });
  }
  else res.render('new_students')
}
