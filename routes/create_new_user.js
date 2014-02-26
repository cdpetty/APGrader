var util = require('../modules/utilities'),
    users = require('../models/users'),
    path = require('path')

module.exports = function (req,res) {
  if(req.body.new_first && req.body.new_last && req.body.new_username && req.body.new_password){
    var new_user = new users();
    new_user.grade = req.body.new_grade;
    new_user.period = req.body.new_period;
    new_user.teacher = req.body.new_teacher;
    new_user.first= req.body.new_first.toLowerCase();
    new_user.last = req.body.new_last.toLowerCase();
    new_user.username = req.body.new_username.toLowerCase();
    new_user.password = req.body.new_password;
    new_user.dirname = new_user.first + '_' + new_user.last;
    new_user.save(function (err, saved){
      if (err) res.send('Error saving user occured:' + err);
      else {
        //create home directory for new user
        var folder_path = path.join(__dirname, '../storage'); 
        util.createDir(folder_path, saved.dirname, function(err){
          if (err) res.send('Error creating directory: ' + err);
          else res.send('New user: ' + saved.username + ' created with password: ' + saved.password);
        });
      }
    });
  }
  else {
    res.render('create_new_user');
  }
};
