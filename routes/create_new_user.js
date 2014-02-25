var databaseUrl = "AP_DB",
    collections = ["users"],
    db = require("mongojs").connect(databaseUrl, collections),
    util = require('../modules/utilities');

module.exports = function (req, res) {
  if(req.body.new_first && req.body.new_last && req.body.new_username && req.body.new_password){
    var new_grade = req.body.new_grade;
    var new_period = req.body.new_period;
    var new_teacher = req.body.new_teacher;
    var new_first= req.body.new_first;
    var new_last = req.body.new_last;
    var new_username = req.body.new_username.toLowerCase();
    var new_password = req.body.new_password;
    var dirname = new_first.toLowerCase() + '_' + new_last.toLowerCase();
    //create new user object for insertion in database
    var new_user = {'dirname': dirname, 'first':new_first, 'last':new_last, 'username':new_username, 'password': new_password, 'grade_level':new_grade, 'period':new_period, 'teacher': new_teacher};
    //save new user
    db.users.save(new_user, function(err, saved){
      if (err) res.send('Error saving user occured');
      else {
        //create home directory for new user
        var new__dirname = __dirname.substring(0, __dirname.lastIndexOf('/'));
        var folder_path = new__dirname + '/storage'; 
        util.createDir(folder_path, dirname, function(err){
          if (err) res.send('Error creating directory: ' + err);
          else res.send('New user: ' + new_username + ' created with password: ' + new_password);
        });
      }
    });
  }
  else {
    res.render('create_new_user');
  }
};
