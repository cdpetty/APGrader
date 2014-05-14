var util = require('../modules/utilities'),
    users = require('../models/users'),
    db_util = require('../modules/db_utilities'),
    path = require('path');

//Check for "requirements" in the post data
var checkBody = function(request){
  var requirements = ['grade', 'period', 'teacher', 'first', 'last', 'username', 'password', 'class', 'signupCode'];
  var data_sent = true;
  requirements.forEach(function(requirement){
    if (!request.param(requirement) || request.param(requirement) === '' ){ 
      //console.log(requirement, ':', request.param(requirement));
      data_sent = false;
    }
  });
  return data_sent;
};

module.exports = function (req, res) {
  //Check if new user should be created
  if(checkBody(req)){
    users.find( {username: req.body.username.toLowerCase() }, function(err, found){
      //console.log('found: ' + found);
      if (found.length > 0){
        res.send('USENAME ALREADY EXISTS');
      }
      else{
        //create new user
        var new_user = new users();
        new_user.grade = req.body.grade;
        new_user.period = req.body.period;
        new_user.teacher = req.body.teacher;
        new_user.first= req.body.first.toLowerCase();
        new_user.last = req.body.last.toLowerCase();
        new_user.username = req.body.username.toLowerCase();
        new_user.password = req.body.password;
        new_user.dirname = new_user.first + '_' + new_user.last;
        new_user.class = req.body.class;
        new_user.signupCode = req.body.signupCode;
        new_user.admin = false;
        //save new user
        new_user.save(function (err, saved){
          if (err) res.send('Error saving user occured:' + err);
          else {
            //create home directory for new user
            var folder_path = path.join(__dirname, '../storage'); 
            util.createDir(folder_path, saved.dirname, function(err){
              if (err) res.send('Error creating directory: ' + err);
                req.session.user_id = saved._id;
                req.session.username = saved.username;
                req.session.dirname = saved.dirname;
                req.session.admin = saved.admin;
                //req.session.name = capitalizeName(saved.first) + " " + capitalizeName(saved.last);
                res.redirect('/');
                //res.send('New user: ' + saved.username + ' created with password: ' + saved.password);
            });
          }
        });
      }
    });
  }
  else {
    res.render('create-new-user', {name: req.session.name, admin: req.session.admin});
  }
};
