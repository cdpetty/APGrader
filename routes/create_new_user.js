var databaseUrl = "AP_DB",
    collections = ["users"],
    db = require("mongojs").connect(databaseUrl, collections),
    util = require('../modules/utilities');

module.exports = function(req,res){
  if(req.body.new_first && req.body.new_last && req.body.new_username && req.body.new_password){
    var new_first= req.body.new_first;
    var new_last = req.body.new_last;
    var new_username = req.body.new_username;
    var new_password = req.body.new_password;
    var dirname = new_first.toLowerCase() + '_' + new_last.toLowerCase();
    db.users.save({'dirname': dirname, 'first':new_first, 'last':new_last, 'username':new_username, 'password': new_password}, function(err, saved){
      if (err) res.send('Error saving user occured');
      else {
        util.createDir(dirname, function(err){
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
