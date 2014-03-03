var fs = require('fs'),
  util = require('../modules/utilities'),
  users = require('../models/users'),
  path = require('path');

const num_user_params = 5;

module.exports = function (req, res) {
  if ( req.files.new_users ){
    //save file
    var folder_path = path.join(__dirname, '../batch_user_files')
    util.save(req.files.new_users, folder_path, function(err, saved){
      if (err) console.log('Error saving file:', err);
      else{
        //read file
        fs.readFile(path.join(folder_path, req.files.new_users.name), { encoding: 'utf8' }, function(err, data){
          var new_users = data.split('\n');
          //parse file
          new_users.forEach(function(one){
            if (one){
              var user = one.split(' ');
              var user_obj = new users();
              user_obj.first = user[0];
              user_obj.last = user[1];
              user_obj.grade_level = user[2];
              user_obj.teacher = user[3];
              user_obj.dirname = user[0] + '_' + user[1];
              user_obj.save(function(err, saved){
                if (err) res.send(err);
                else res.send('Successfully loaded names!');
              });
            }
          });
        });
      }
    });
  }
  else res.render('new_students');
};
