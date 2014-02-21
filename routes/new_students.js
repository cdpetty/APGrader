var fs = require('fs'),
    util = require('../modules/utilities'),
    databaseUrl = "AP_DB",
    collections = ["users"],
    db = require("mongojs").connect(databaseUrl, collections);

const num_user_params = 5;

module.exports = function(req, res) {
  var new__dirname = __dirname.substring(0, __dirname.lastIndexOf('/'));
  var folder_path = new__dirname + '/user_files'; 
  if ( req.files.new_users ){
    util.save(req.files.new_users, folder_path, function(err, saved){
      if (err) console.log('Error saving file:', err);
      else{
        fs.readFile(folder_path + '/' + req.files.new_users.name, { encoding: 'utf8' }, function(err, data){
          var users = data.split('\n');
          console.log(users);
          for (var user_index = 0; user_index < users.length; user_index++){
            var user = users[user_index].split(' ');
            var user_obj = {};
            user_obj.first = users[0];
            user_obj.last = user[1];
            user_obj.grade_level = user[2];
            user_obj.teacher = user[3];
            user_obj.dirname = user[0] + '_' + user[1];
            user_obj.password = '';
            user_obj.username = '';
            db.users.save(user_obj, function(err, saved){
              if (err) res.send(err);
              else res.send('Successfully loaded names!');
            });
          }
        });
      }
    });
  }
  else res.render('new_students')
}
